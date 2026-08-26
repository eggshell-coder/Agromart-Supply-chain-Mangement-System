import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The repository's OrdersPage historically created an empty purchase_order first,
// then required a second + Item action. That left empty purchase_order rows in
// Supabase and the UI hid them because it rendered only order_item rows.
// Keep the existing large Dashboard component intact while replacing only the
// OrdersPage at build time with the corrected one-step workflow.
function orderWorkflowPlugin() {
  return {
    name: 'agromart-order-workflow',
    transform(code, id) {
      if (!id.endsWith('/src/components/Dashboard.jsx')) return null

      const start = code.indexOf('function OrdersPage() {')
      const marker = '\n// ═══════════════════════════════════════════════════════════════\n// SHIPMENTS PAGE'
      const end = start >= 0 ? code.indexOf(marker, start) : -1
      if (start < 0 || end < 0) return null

      const replacement = String.raw`function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [farmers, setFarmers] = useState([])
  const [shipKpi, setShipKpi] = useState({ total:0, inTransit:0, delivered:0, delayed:0 })
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selOrder, setSelOrder] = useState(null)
  const [form, setForm] = useState({})
  const [search, setSearch] = useState('')
  const [sfilt, setSfilt] = useState('')
  const [viewOrder, setViewOrder] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [o,p,f,sh] = await Promise.all([
        api('/api/orders'), api('/api/products'), api('/api/farmers'), api('/api/shipments')
      ])
      setOrders(Array.isArray(o) ? o : [])
      setProducts(Array.isArray(p) ? p : [])
      setFarmers(Array.isArray(f) ? f : [])
      setShipKpi({
        total: Array.isArray(o) ? o.length : 0,
        inTransit: Array.isArray(sh) ? sh.filter(s => s.status === 'IN_TRANSIT').length : 0,
        delivered: Array.isArray(sh) ? sh.filter(s => ['DELIVERED','PARTIALLY_DELIVERED'].includes(s.status)).length : 0,
        delayed: Array.isArray(sh) ? sh.filter(s => s.status === 'DELAYED').length : 0,
      })
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const openNewOrder = () => {
    setForm({ product_id:'', farmer_id:'', quantity:'', agreed_price_per_unit:'', notes:'' })
    setModal('newOrder')
  }

  const createOrder = async () => {
    if (!form.product_id || !form.farmer_id || !form.quantity || !form.agreed_price_per_unit) {
      toast.error('Product, farmer, quantity and agreed price are required')
      return
    }
    try {
      // Create the parent and immediately create its first item. The list page
      // will therefore receive an order_item and render the new order.
      const order = await api('/api/orders', {
        method:'POST',
        body:{
          notes: form.notes || '',
          order_status:'PLACED',
          ordered_at:new Date().toISOString()
        }
      })
      await api('/api/orders/' + order.order_id + '/items', {
        method:'POST',
        body:{
          product_id:form.product_id,
          farmer_id:form.farmer_id,
          quantity:Number(form.quantity),
          agreed_price_per_unit:Number(form.agreed_price_per_unit)
        }
      })
      toast.success('Order created successfully')
      setModal(null)
      setForm({})
      await load()
    } catch (e) {
      toast.error('Order creation failed: ' + e.message)
      await load()
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api('/api/orders/' + id + '/status', { method:'PATCH', body:{ order_status:status } })
      toast.success('Order status updated')
      await load()
    } catch (e) { toast.error(e.message) }
  }

  const addItem = async () => {
    if (!selOrder || !form.product_id || !form.farmer_id || !form.quantity || !form.agreed_price_per_unit) {
      toast.error('Product, farmer, quantity and agreed price are required')
      return
    }
    try {
      await api('/api/orders/' + selOrder + '/items', {
        method:'POST',
        body:{
          product_id:form.product_id,
          farmer_id:form.farmer_id,
          quantity:Number(form.quantity),
          agreed_price_per_unit:Number(form.agreed_price_per_unit)
        }
      })
      toast.success('Order item added')
      setModal(null)
      setForm({})
      await load()
    } catch (e) { toast.error(e.message) }
  }

  const delItem = async (oid, iid) => {
    if (!confirm('Remove this order item?')) return
    try {
      await api('/api/orders/' + oid + '/items/' + iid, { method:'DELETE' })
      toast.success('Order item removed')
      await load()
    } catch (e) { toast.error(e.message) }
  }

  const rows = orders.flatMap((o, oi) => {
    const items = Array.isArray(o.order_item) ? o.order_item : []
    if (!items.length) return [{ order:o, item:null, rowNum:oi + 1, incomplete:true }]
    return items.map(it => ({ order:o, item:it, rowNum:oi + 1, incomplete:false }))
  })

  const filtered = rows.filter(row => {
    const q = search.toLowerCase().trim()
    const item = row.item || {}
    const matchQ = !q ||
      String(row.order?.order_id || '').toLowerCase().includes(q) ||
      String(item.product?.name || '').toLowerCase().includes(q) ||
      String(item.farmer?.name || '').toLowerCase().includes(q)
    const matchS = !sfilt || row.order?.order_status === sfilt
    return matchQ && matchS
  })

  const openAddItem = (orderId) => {
    setSelOrder(orderId)
    setForm({ product_id:'', farmer_id:'', quantity:'', agreed_price_per_unit:'' })
    setModal('addItem')
  }

  const KPI_CARDS = [
    { label:'Total Orders', value:shipKpi.total, icon:'🛒', color:'#16a34a', bg:'#f0fdf4' },
    { label:'In Transit', value:shipKpi.inTransit, icon:'🚚', color:'#f97316', bg:'#fff7ed' },
    { label:'Delivered', value:shipKpi.delivered, icon:'✅', color:'#16a34a', bg:'#f0fdf4' },
    { label:'Delayed', value:shipKpi.delayed, icon:'⚠️', color:'#ef4444', bg:'#fef2f2' },
  ]

  return (
    <div>
      <PageHeader title="Orders" sub="Create, track and manage purchase orders">
        <select value={sfilt} onChange={e=>setSfilt(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
        </select>
        <AddBtn onClick={openNewOrder} label="+ Create Order" />
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {KPI_CARDS.map((k,i)=>(
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{background:k.bg}}>{k.icon}</div>
            <div><p className="text-xs text-gray-500 font-medium">{k.label}</p><p className="text-2xl font-bold" style={{color:k.color}}>{k.value}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search order ID, product or farmer…" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
      </div>

      {loading ? <Loader/> : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm"><Empty icon="🛒" msg="No orders found" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((row,i) => {
            const o = row.order
            const it = row.item
            const prog = ORDER_PROGRESS(o.order_status)
            const pColor = PROG_COLOR(prog)
            return (
              <div key={(o.order_id || i) + '-' + (it?.item_id || 'empty')} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-12 gap-3 items-center px-5 py-4">
                  <div className="col-span-3">
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-bold text-sm text-gray-900">#A{String(row.rowNum).padStart(4,'0')}</p>
                    <p className="text-xs text-gray-600 mt-1">{it?.farmer?.name || 'Farmer not selected'}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-gray-500">Product</p>
                    <p className="font-semibold text-sm">{it?.product?.name || 'No item added yet'}</p>
                    <p className="text-xs text-gray-600">{it ? (it.quantity + ' ' + (it.product?.unit || 'kg')) : 'Incomplete order'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <select value={o.order_status || 'PLACED'} onChange={e=>updateStatus(o.order_id,e.target.value)} className="text-xs px-2 py-1 rounded-lg border-0 bg-gray-100 font-semibold focus:outline-none">
                      {ORDER_STATUSES.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Progress</p>
                    <div className="flex items-center gap-2"><div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full" style={{width:prog + '%',background:pColor}}/></div><span className="text-xs font-semibold">{prog}%</span></div>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="font-bold text-green-600">{bdt(it?.total_price ?? o.agreed_total ?? 0)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-2 bg-gray-50/70 border-t border-gray-100">
                  <div className="text-xs text-gray-600">{fmtDate(o.ordered_at)} {o.notes ? ' · ' + o.notes : ''}</div>
                  <div className="flex gap-2">
                    <button onClick={()=>setViewOrder(viewOrder===i?null:i)} className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 rounded-lg">{viewOrder===i?'Hide':'View'}</button>
                    <button onClick={()=>openAddItem(o.order_id)} className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg">+ Item</button>
                    {it && <button onClick={()=>delItem(o.order_id,it.item_id)} className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg">Remove</button>}
                  </div>
                </div>
                {viewOrder===i && <div className="px-5 py-4 border-t border-gray-100 grid grid-cols-3 gap-3 text-xs text-gray-600">
                  <div><span>Database Order ID</span><br/><span className="font-mono text-gray-800">{o.order_id}</span></div>
                  <div><span>Farmer</span><br/><strong>{it?.farmer?.name || '—'}</strong></div>
                  <div><span>Product</span><br/><strong>{it?.product?.name || '—'}</strong></div>
                  <div><span>Unit price</span><br/><strong>{it ? bdt(it.agreed_price_per_unit) : '—'}</strong></div>
                  <div><span>Item total</span><br/><strong>{it ? bdt(it.total_price) : '—'}</strong></div>
                  <div><span>Notes</span><br/>{o.notes || '—'}</div>
                </div>}
              </div>
            )
          })}
        </div>
      )}

      {modal==='newOrder' && <Modal title="Create Order" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Product" type="select" value={form.product_id} required onChange={v=>{ const p=products.find(x=>x.product_id===v); setForm(f=>({...f,product_id:v,agreed_price_per_unit:p?.current_price || ''})) }} options={products.map(p=>({value:p.product_id,label:p.name + ' — ' + bdt(p.current_price) + '/' + (p.unit || 'KG')}))}/>
          <Field label="Farmer" type="select" value={form.farmer_id} required onChange={v=>setForm(f=>({...f,farmer_id:v}))} options={farmers.map(f=>({value:f.farmer_id,label:f.name + ' — ' + (f.district?.name || '')}))}/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Quantity" type="number" value={form.quantity} required min="0.01" step="0.01" onChange={v=>setForm(f=>({...f,quantity:v}))}/>
            <Field label="Agreed Price / Unit (৳)" type="number" value={form.agreed_price_per_unit} required min="0" step="0.01" onChange={v=>setForm(f=>({...f,agreed_price_per_unit:v}))}/>
          </div>
          <Field label="Notes" type="textarea" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2} placeholder="Optional order notes"/>
          <div className="flex justify-end gap-2 pt-2"><button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button><button onClick={createOrder} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white font-semibold">Create Order</button></div>
        </div>
      </Modal>}

      {modal==='addItem' && <Modal title="Add Item to Order" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Product" type="select" value={form.product_id} required onChange={v=>{ const p=products.find(x=>x.product_id===v); setForm(f=>({...f,product_id:v,agreed_price_per_unit:p?.current_price || ''})) }} options={products.map(p=>({value:p.product_id,label:p.name + ' — ' + bdt(p.current_price)}))}/>
          <Field label="Farmer" type="select" value={form.farmer_id} required onChange={v=>setForm(f=>({...f,farmer_id:v}))} options={farmers.map(f=>({value:f.farmer_id,label:f.name + ' — ' + (f.district?.name || '')}))}/>
          <Field label="Quantity" type="number" value={form.quantity} required min="0.01" step="0.01" onChange={v=>setForm(f=>({...f,quantity:v}))}/>
          <Field label="Agreed Price / Unit (৳)" type="number" value={form.agreed_price_per_unit} required min="0" step="0.01" onChange={v=>setForm(f=>({...f,agreed_price_per_unit:v}))}/>
          <div className="flex justify-end gap-2 pt-2"><button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button><button onClick={addItem} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white font-semibold">Add Item</button></div>
        </div>
      </Modal>}
    </div>
  )
}`

      return {
        code: code.slice(0, start) + replacement + code.slice(end),
        map: null,
      }
    },
  }
}

export default defineConfig({
  plugins: [orderWorkflowPlugin(), react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    entries: ['src/main.jsx'],
  },
})
