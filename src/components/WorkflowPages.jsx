import { useState, useEffect, useCallback } from 'react'

// API helper
async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const r = await fetch(path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(opts.headers || {})
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  })
  const ct = r.headers.get('content-type') || ''
  const d = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(d.error || r.statusText || 'Request failed')
  return d
}

// Helper formatting functions
function bdt(n) {
  const v = Math.abs(Number(n || 0))
  if (v >= 100000) return `৳${(v/100000).toFixed(2)}L`
  if (v >= 1000) return `৳${(v/1000).toFixed(1)}K`
  return `৳${Math.round(v).toLocaleString()}`
}
function fmtDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-BD', { day: '2-digit', month: 'short', year: 'numeric' })
}
function fmtDT(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-BD', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
function toLocalDT(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
}

// Shared Modal component
function LocalModal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[150] p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50 sticky top-0 backdrop-blur-md z-10">
          <h2 className="font-extrabold text-lg text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">×</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// Shared Field input component
function LocalField({ label, type = 'text', value, onChange, options, required, placeholder, min, step, rows }) {
  const cls = "w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
  return (
    <div>
      {label && <label className="block text-xs font-bold text-gray-600 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
      {type === 'select' ? (
        <select className={cls} value={value || ''} onChange={e => onChange(e.target.value)} required={required}>
          <option value="">— Select —</option>
          {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea className={cls} value={value || ''} onChange={e => onChange(e.target.value)} rows={rows || 3} placeholder={placeholder} />
      ) : (
        <input className={cls} type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} required={required} placeholder={placeholder} min={min} step={step} />
      )}
    </div>
  )
}

// Shared Badge status component
const STATUS_COLORS = {
  PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  APPROVED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  PREPARING: 'bg-orange-100 text-orange-800 border-orange-200',
  DISPATCHED: 'bg-blue-100 text-blue-800 border-blue-200',
  IN_TRANSIT: 'bg-blue-100 text-blue-800 border-blue-200',
  DELAYED: 'bg-red-100 text-red-800 border-red-200',
  DELIVERED: 'bg-green-100 text-green-800 border-green-200',
  PARTIALLY_DELIVERED: 'bg-orange-100 text-orange-700 border-orange-200',
  DAMAGED: 'bg-red-100 text-red-800 border-red-200',
  SPOILED: 'bg-red-100 text-red-800 border-red-200',
  CANCELLED: 'bg-gray-100 text-gray-700 border-gray-200',
  REJECTED: 'bg-red-100 text-red-800 border-red-200',
  PLACED: 'bg-blue-100 text-blue-800 border-blue-200',
  CONFIRMED: 'bg-green-100 text-green-800 border-green-200'
}

function LocalBadge({ s }) {
  const cls = STATUS_COLORS[s] || 'bg-gray-100 text-gray-700 border-gray-200'
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${cls}`}>{String(s || '').replace(/_/g, ' ')}</span>
}

function LocalLoader() {
  return <div className="flex items-center justify-center h-48"><div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" /></div>
}

function LocalEmpty({ icon = '📭', msg }) {
  return <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2"><span className="text-4xl">{icon}</span><p className="text-sm font-medium text-gray-500">{msg}</p></div>
}

export function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState(null)
  
  const [form, setForm] = useState({
    farmer_id: '',
    notes: '',
    items: [{ product_id: '', quantity: '', agreed_price_per_unit: '' }]
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [o, p, f] = await Promise.all([api('/api/orders'), api('/api/products'), api('/api/farmers')])
      setOrders(Array.isArray(o) ? o : [])
      setProducts(Array.isArray(p) ? p.filter(x => x.is_active) : [])
      setFarmers(Array.isArray(f) ? f.filter(x => x.is_active) : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const addRow = () => setForm(f => ({ ...f, items: [...f.items, { product_id: '', quantity: '', agreed_price_per_unit: '' }] }))
  const removeRow = i => setForm(f => ({ ...f, items: f.items.filter((_, x) => x !== i) }))
  
  const changeItem = (i, k, v) => setForm(f => {
    const items = [...f.items]
    items[i] = { ...items[i], [k]: v }
    if (k === 'product_id') {
      const p = products.find(x => x.product_id === v)
      items[i].agreed_price_per_unit = p?.current_price || ''
    }
    return { ...f, items }
  })

  const create = async () => {
    if (!form.farmer_id || form.items.some(x => !x.product_id || Number(x.quantity) <= 0 || Number(x.agreed_price_per_unit) < 0)) {
      alert('Daya kore complete detail din (Farmer + all products with quantity and price)')
      return
    }
    try {
      // Single endpoint nested creation
      const nestedBody = {
        notes: form.notes || '',
        order_status: 'PLACED',
        ordered_at: new Date().toISOString(),
        items: form.items.map(it => ({
          product_id: it.product_id,
          farmer_id: form.farmer_id,
          quantity: Number(it.quantity),
          agreed_price_per_unit: Number(it.agreed_price_per_unit)
        }))
      }
      await api('/api/orders', { method: 'POST', body: nestedBody })
      alert('Order Placed Successfully!')
      setModal(false)
      setForm({ farmer_id: '', notes: '', items: [{ product_id: '', quantity: '', agreed_price_per_unit: '' }] })
      load()
    } catch (e) {
      alert(`Error creating order: ${e.message}`)
    }
  }

  const rows = orders.filter(o => !filter || o.order_status === filter).filter(o => {
    const q = search.toLowerCase()
    return !q || String(o.order_id).toLowerCase().includes(q) || (o.order_item || []).some(i => String(i.product?.name || '').toLowerCase().includes(q) || String(i.farmer?.name || '').toLowerCase().includes(q))
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950">Purchase Orders</h1>
          <p className="text-sm text-gray-500 font-medium">Create and track farmer purchase orders</p>
        </div>
        <button onClick={() => setModal(true)} className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md shadow-green-100 flex items-center justify-center gap-2 self-start">
          + Create Purchase Order
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by Order ID, farmer or product..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All Statuses</option>
          {['PLACED', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'PARTIALLY_DELIVERED', 'DELAYED', 'CANCELLED'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? <LocalLoader /> : rows.length === 0 ? <div className="bg-white border rounded-2xl p-8"><LocalEmpty icon="🛒" msg="No orders found." /></div> : (
        <div className="space-y-3">
          {rows.map((o, idx) => {
            const items = o.order_item || []
            const total = items.reduce((a, i) => a + Number(i.total_price || 0), 0)
            const farmerName = items[0]?.farmer?.name || '—'
            const isExpanded = expanded === o.order_id

            // Check if shipment is prepared
            const hasShipment = items.some(i => i.shipment_id !== null)
            const shipmentStatus = items[0]?.shipment?.status || 'NOT PREPARED'

            return (
              <div key={o.order_id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
                <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Order ID</p>
                    <p className="font-mono text-sm font-black text-gray-900">#PO-{o.order_id.slice(0, 8).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{fmtDate(o.ordered_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold font-medium">Farmer / Supplier</p>
                    <p className="font-bold text-gray-800 text-sm truncate">{farmerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Products</p>
                    <p className="font-semibold text-gray-800 text-xs truncate">
                      {items.map(i => `${i.product?.name} (${i.quantity} ${i.product?.unit || 'kg'})`).join(', ')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5 items-start">
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] text-gray-500 font-bold">Order:</span>
                      <LocalBadge s={o.order_status} />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-[10px] text-gray-500 font-bold">Shipment:</span>
                      <LocalBadge s={shipmentStatus} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    <div className="md:text-right">
                      <p className="text-xs text-gray-500 font-bold">Agreed Total</p>
                      <p className="font-extrabold text-green-600 text-base">{bdt(total || o.agreed_total)}</p>
                    </div>
                    <button onClick={() => setExpanded(isExpanded ? null : o.order_id)} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 border text-gray-600 transition">
                      {isExpanded ? '▲' : '▼'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-gray-50/50 border-t px-6 py-4 space-y-3 text-xs">
                    <h4 className="font-bold text-gray-900 border-b pb-2">Order Line Items</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-gray-500 border-b text-[10px] uppercase font-bold">
                            <th className="py-2">Product</th>
                            <th className="py-2">Quantity</th>
                            <th className="py-2">Agreed Unit Price</th>
                            <th className="py-2 text-right">Line Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {items.map(i => (
                            <tr key={i.item_id} className="text-gray-800 font-medium">
                              <td className="py-2">{i.product?.name}</td>
                              <td className="py-2">{i.quantity} {i.product?.unit || 'kg'}</td>
                              <td className="py-2">{bdt(i.agreed_price_per_unit)}</td>
                              <td className="py-2 text-right text-green-700 font-bold">{bdt(i.total_price || (i.quantity * i.agreed_price_per_unit))}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {o.notes && <div className="mt-2 text-gray-600"><span className="font-bold">Notes:</span> {o.notes}</div>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {modal && (
        <LocalModal title="Create Purchase Order" onClose={() => setModal(false)} wide>
          <div className="space-y-4">
            <LocalField label="Farmer / Supplier" type="select" required value={form.farmer_id} onChange={v => setForm(f => ({ ...f, farmer_id: v }))} options={farmers.map(f => ({ value: f.farmer_id, label: `${f.name} — ${f.district?.name || 'District'}` }))} />
            
            <div className="space-y-2 border rounded-2xl p-4 bg-gray-50/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-900">Products List</span>
                <button onClick={addRow} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition">+ Add Product</button>
              </div>
              {form.items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-3 items-end border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                  <div className="col-span-5">
                    <LocalField label={i === 0 ? "Product" : ""} type="select" required value={it.product_id} onChange={v => changeItem(i, 'product_id', v)} options={products.map(p => ({ value: p.product_id, label: `${p.name} — ${p.unit}` }))} />
                  </div>
                  <div className="col-span-3">
                    <LocalField label={i === 0 ? "Quantity" : ""} type="number" required value={it.quantity} onChange={v => changeItem(i, 'quantity', v)} min="1" placeholder="Qty" />
                  </div>
                  <div className="col-span-3">
                    <LocalField label={i === 0 ? "Agreed Price" : ""} type="number" required value={it.agreed_price_per_unit} onChange={v => changeItem(i, 'agreed_price_per_unit', v)} min="0" placeholder="Price" />
                  </div>
                  <div className="col-span-1 flex justify-center pb-2">
                    {form.items.length > 1 && <button onClick={() => removeRow(i)} className="text-red-500 hover:text-red-700 text-lg font-black leading-none">×</button>}
                  </div>
                </div>
              ))}
            </div>

            <LocalField label="Order Notes (Optional)" type="textarea" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder="Enter any specific notes..." rows={2} />

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 font-bold transition">Cancel</button>
              <button onClick={create} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm shadow-md transition">Place Order</button>
            </div>
          </div>
        </LocalModal>
      )}
    </div>
  )
}

export function ShipmentsPage() {
  const [orders, setOrders] = useState([])
  const [ships, setShips] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Preparation modal
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({})

  // Verification modal
  const [verifyModal, setVerifyModal] = useState(false)
  const [verifyForm, setVerifyForm] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [o, s, v, w, p] = await Promise.all([
        api('/api/orders'),
        api('/api/shipments'),
        api('/api/vehicles'),
        api('/api/warehouses'),
        api('/api/products')
      ])
      setOrders(Array.isArray(o) ? o : [])
      setShips(Array.isArray(s) ? s : [])
      setVehicles(Array.isArray(v) ? v : [])
      setWarehouses(Array.isArray(w) ? w : [])
      setProducts(Array.isArray(p) ? p : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const t = setInterval(load, 30000)
    return () => clearInterval(t)
  }, [load])

  // Orders awaiting shipment (status = PLACED and no shipments created)
  const pendingOrders = orders.filter(o => o.order_status === 'PLACED' && !ships.some(s => s.order_id === o.order_id))

  const prepare = o => {
    const items = o.order_item || []
    if (!items.length) {
      alert('Order e kono product nei!')
      return
    }
    setForm({
      order_id: o.order_id,
      vehicle_id: '',
      warehouse_id: '',
      delivery_type: 'WAREHOUSE',
      start_time: toLocalDT(new Date().toISOString()),
      estimated_arrival: toLocalDT(new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()), // 2 hours from now
      driver_name: '',
      driver_phone: '',
      notes: '',
      items: items
    })
    setModal(true)
  }

  const saveShipment = async () => {
    if (!form.vehicle_id || !form.estimated_arrival || (form.delivery_type === 'WAREHOUSE' && !form.warehouse_id)) {
      alert('Daya kore Vehicle, Destination ebong ETA details complete korun!')
      return
    }
    try {
      // Create a shipment row for each item in the order
      for (const it of form.items) {
        const notesStr = [
          `delivery_type=${form.delivery_type}`,
          `driver=${form.driver_name || '—'}`,
          `driver_phone=${form.driver_phone || '—'}`,
          form.notes || ''
        ].filter(Boolean).join(' | ')

        await api('/api/shipments', {
          method: 'POST',
          body: {
            order_id: form.order_id,
            product_id: it.product_id,
            farmer_id: it.farmer_id,
            quantity: Number(it.quantity),
            vehicle_id: form.vehicle_id,
            warehouse_id: form.delivery_type === 'WAREHOUSE' ? form.warehouse_id : null,
            start_time: new Date(form.start_time).toISOString(),
            estimated_arrival: new Date(form.estimated_arrival).toISOString(),
            transport_cost: 0,
            notes: notesStr,
            status: 'PENDING'
          }
        })
      }
      alert('Shipment Prepared successfully!')
      setModal(false)
      load()
    } catch (e) {
      alert(`Error preparing shipment: ${e.message}`)
    }
  }

  // Update status directly (for dispatch, delays, etc.)
  const updateStatusDirect = async (s, nextStatus) => {
    // If delivering, open the manual verification modal instead!
    if (["DELIVERED", "PARTIALLY_DELIVERED", "DAMAGED"].includes(nextStatus)) {
      setVerifyForm({
        shipment_id: s.shipment_id,
        status: nextStatus,
        delivered_quantity: s.quantity,
        damaged_quantity: 0,
        notes: '',
        info: `${s.product?.name || 'Product'} from ${s.farmer?.name || 'Farmer'}`
      })
      setVerifyModal(true)
      return
    }

    try {
      await api(`/api/shipments/${s.shipment_id}/status`, {
        method: 'PATCH',
        body: {
          status: nextStatus,
          notes: nextStatus === 'DELAYED' ? 'Delayed due to transit issues.' : undefined
        }
      })
      alert(`Shipment status updated to: ${nextStatus}`)
      load()
    } catch (e) {
      alert(`Error updating shipment: ${e.message}`)
    }
  }

  // Save Verification details
  const saveVerification = async () => {
    if (Number(verifyForm.delivered_quantity) < 0 || Number(verifyForm.damaged_quantity) < 0) {
      alert('Quantity numbers must be positive!')
      return
    }
    try {
      await api(`/api/shipments/${verifyForm.shipment_id}/status`, {
        method: 'PATCH',
        body: {
          status: verifyForm.status,
          delivered_quantity: Number(verifyForm.delivered_quantity),
          damaged_quantity: Number(verifyForm.damaged_quantity),
          actual_arrival: new Date().toISOString(),
          notes: verifyForm.notes
        }
      })
      alert('Delivery Verified successfully!')
      setVerifyModal(false)
      load()
    } catch (e) {
      alert(`Error verifying delivery: ${e.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-5">
        <h1 className="text-2xl font-black text-gray-950">Shipment Execution</h1>
        <p className="text-sm text-gray-500 font-semibold">Track transport logistics, vehicle movements, and verify physical delivery</p>
      </div>

      {/* Orders awaiting logistics */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5">
        <h3 className="text-sm font-bold text-gray-950 mb-3 uppercase tracking-wider">Orders Awaiting Shipment</h3>
        {pendingOrders.length === 0 ? (
          <p className="text-xs text-gray-500 font-medium">Logistics setup complete. No new purchase orders awaiting preparation.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingOrders.map(o => (
              <div key={o.order_id} className="flex items-center justify-between border border-gray-100 rounded-xl p-4 bg-gray-50/50 hover:border-green-200 transition">
                <div>
                  <p className="text-xs font-black font-mono">#PO-{o.order_id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-[10px] text-gray-500">{(o.order_item || []).length} product line(s) · {fmtDate(o.ordered_at)}</p>
                  <p className="text-xs text-gray-700 font-bold mt-1">Farmer: {o.order_item?.[0]?.farmer?.name || '—'}</p>
                </div>
                <button onClick={() => prepare(o)} className="px-3.5 py-2 text-xs rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition">
                  Prepare Shipment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipments List */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-950 uppercase tracking-wider">Operational Shipments</span>
          <button onClick={load} className="text-xs font-bold text-green-600 hover:underline">✦ Sync Status</button>
        </div>
        {ships.length === 0 ? <LocalEmpty icon="🚚" msg="No shipments created yet." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-left">
                <tr className="text-gray-500 font-bold text-xs">
                  {['Order ID', 'Product', 'Vehicle', 'Destination', 'ETA', 'Status', 'Logistics Action'].map(h => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {ships.map(s => {
                  const driverName = s.notes?.match(/driver=([^|]*)/)?.[1]?.trim() || '—'
                  const deliveryTypeMatch = s.notes?.match(/delivery_type=([^|]*)/)
                  const deliveryType = deliveryTypeMatch ? deliveryTypeMatch[1].trim() : 'WAREHOUSE'
                  const isOverdue = s.estimated_arrival && new Date(s.estimated_arrival) < new Date() && !['DELIVERED', 'CANCELLED'].includes(s.status)

                  return (
                    <tr key={s.shipment_id} className={`hover:bg-gray-50/50 ${isOverdue ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-4 py-4 font-mono font-bold text-xs">#PO-{s.order_id?.slice(0, 8).toUpperCase() || '—'}</td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-gray-800">{s.product?.name}</span>
                        <div className="text-xs text-gray-500">{s.quantity} {s.product?.unit || 'kg'}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-bold text-gray-800">{s.vehicle?.plate_no || 'No vehicle'}</span>
                        <div className="text-xs text-gray-500">Driver: {driverName}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-semibold text-gray-800">
                          {deliveryType === 'WAREHOUSE' ? s.warehouse?.name : 'Direct Delivery'}
                        </span>
                        <div className="text-xs text-gray-500">{s.dest_district?.name || 'Bangladesh'}</div>
                      </td>
                      <td className="px-4 py-4 text-xs font-semibold text-gray-600">
                        {fmtDT(s.estimated_arrival)}
                        {isOverdue && <div className="text-[10px] text-red-600 font-bold mt-0.5">🔔 ETA PASSED — Verify</div>}
                      </td>
                      <td className="px-4 py-4">
                        <LocalBadge s={s.status} />
                      </td>
                      <td className="px-4 py-4">
                        <select value={s.status} onChange={e => updateStatusDirect(s, e.target.value)} className="text-xs border rounded-lg px-2 py-1.5 bg-white font-bold text-gray-700 focus:outline-none">
                          <option value="PENDING">PLACED</option>
                          <option value="IN_TRANSIT">DISPATCH / IN TRANSIT</option>
                          <option value="DELAYED">DELAYED</option>
                          <option value="PARTIALLY_DELIVERED">VERIFY PARTIAL</option>
                          <option value="DELIVERED">VERIFY DELIVERED</option>
                          <option value="SPOILED">VERIFY DAMAGED / SPOILED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prepare Shipment Modal */}
      {modal && (
        <LocalModal title={`Prepare Shipment — Order #PO-${form.order_id?.slice(0, 8).toUpperCase()}`} onClose={() => setModal(false)} wide>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LocalField label="Vehicle / Truck" type="select" required value={form.vehicle_id} onChange={v => setForm(f => ({ ...f, vehicle_id: v }))} options={vehicles.filter(x => x.is_operational && !x._busy).map(x => ({ value: x.vehicle_id, label: `${x.plate_no} — Cap: ${x.capacity_kg}kg` }))} />
              
              <LocalField label="Delivery Type" type="select" required value={form.delivery_type} onChange={v => setForm(f => ({ ...f, delivery_type: v }))} options={[{ value: 'WAREHOUSE', label: 'Warehouse Storage' }, { value: 'DIRECT', label: 'Direct Delivery' }]} />
              
              {form.delivery_type === 'WAREHOUSE' && (
                <LocalField label="Destination Warehouse" type="select" required value={form.warehouse_id} onChange={v => setForm(f => ({ ...f, warehouse_id: v }))} options={warehouses.filter(x => x.is_active).map(x => ({ value: x.warehouse_id, label: x.name }))} />
              )}

              <LocalField label="Driver Name" value={form.driver_name} onChange={v => setForm(f => ({ ...f, driver_name: v }))} placeholder="Driver name" />
              <LocalField label="Driver Phone" value={form.driver_phone} onChange={v => setForm(f => ({ ...f, driver_phone: v }))} placeholder="Driver phone number" />
              
              <LocalField label="Dispatch Time" type="datetime-local" value={form.start_time} onChange={v => setForm(f => ({ ...f, start_time: v }))} />
              <LocalField label="Estimated Delivery (ETA)" type="datetime-local" required value={form.estimated_arrival} onChange={v => setForm(f => ({ ...f, estimated_arrival: v }))} />
            </div>

            <LocalField label="Logistics Notes" type="textarea" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder="Enter any notes about delivery..." rows={2} />

            <div className="border rounded-2xl p-4 bg-gray-50/50">
              <span className="text-xs font-bold text-gray-900 block mb-2">Order Products Summary</span>
              <div className="space-y-1">
                {form.items?.map(i => (
                  <div key={i.item_id} className="flex justify-between text-xs font-semibold text-gray-700">
                    <span>{products.find(p => p.product_id === i.product_id)?.name || 'Product'}</span>
                    <span>{i.quantity} {products.find(p => p.product_id === i.product_id)?.unit || 'kg'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm rounded-xl border font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={saveShipment} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm shadow-md transition">Place Shipment</button>
            </div>
          </div>
        </LocalModal>
      )}

      {/* Manual Delivery Verification Modal */}
      {verifyModal && (
        <LocalModal title="Confirm & Verify Delivery" onClose={() => setVerifyModal(false)}>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-xs">
              <p className="font-bold text-green-800">Operational Verification Required</p>
              <p className="text-green-700 font-medium mt-1">Please verify the quantity and condition of goods upon arrival physically.</p>
              <p className="font-mono mt-2 text-[10px] text-green-900 font-bold bg-white/70 px-2 py-1 rounded inline-block">{verifyForm.info}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <LocalField label="Received Quantity (kg)" type="number" required value={verifyForm.delivered_quantity} onChange={v => setVerifyForm(f => ({ ...f, delivered_quantity: v }))} min="0" />
              <LocalField label="Damaged Quantity (kg)" type="number" required value={verifyForm.damaged_quantity} onChange={v => setVerifyForm(f => ({ ...f, damaged_quantity: v }))} min="0" />
            </div>

            <LocalField label="Delivery Notes / Discrepancy Reason" type="textarea" value={verifyForm.notes} onChange={v => setVerifyForm(f => ({ ...f, notes: v }))} placeholder="Provide reasons for delays, missing items or damage records..." rows={3} />

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button onClick={() => setVerifyModal(false)} className="px-4 py-2 text-sm border rounded-xl font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={saveVerification} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm shadow-md transition">Confirm Delivery</button>
            </div>
          </div>
        </LocalModal>
      )}
    </div>
  )
}

// ── PRODUCT REQUESTS PAGE ──
export function ProductRequestsPage() {
  const [requests, setRequests] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({
    source_warehouse_id: '',
    dest_warehouse_id: '',
    product_id: '',
    quantity: '',
    notes: ''
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [r, w, p] = await Promise.all([
        api('/api/product-requests'),
        api('/api/warehouses'),
        api('/api/products')
      ])
      setRequests(Array.isArray(r) ? r : [])
      setWarehouses(Array.isArray(w) ? w.filter(x => x.is_active) : [])
      setProducts(Array.isArray(p) ? p.filter(x => x.is_active) : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const createRequest = async () => {
    if (!form.source_warehouse_id || !form.dest_warehouse_id || !form.product_id || Number(form.quantity) <= 0) {
      alert('Daya kore shob fields puron korun!')
      return
    }
    if (form.source_warehouse_id === form.dest_warehouse_id) {
      alert('Source ebong Destination warehouse ek hote parbe na!')
      return
    }
    try {
      await api('/api/product-requests', { method: 'POST', body: form })
      alert('Product Request created successfully!')
      setModal(false)
      setForm({ source_warehouse_id: '', dest_warehouse_id: '', product_id: '', quantity: '', notes: '' })
      load()
    } catch (e) {
      alert(`Error creating request: ${e.message}`)
    }
  }

  const updateStatus = async (reqId, nextStatus) => {
    try {
      await api(`/api/product-requests/${reqId}/status`, { method: 'PATCH', body: { status: nextStatus } })
      alert(`Request status updated to: ${nextStatus}`)
      load()
    } catch (e) {
      alert(`Error updating request: ${e.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950">Internal Warehouse Transfers</h1>
          <p className="text-sm text-gray-500 font-semibold">Request and transfer stock between warehouses</p>
        </div>
        <button onClick={() => setModal(true)} className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm shadow-md transition self-start">
          + Request Stock Transfer
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
        {loading ? <LocalLoader /> : requests.length === 0 ? <LocalEmpty icon="🔄" msg="No stock requests logged." /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-left">
                <tr className="text-gray-500 font-bold text-xs">
                  {['Request ID', 'Product', 'Source Warehouse', 'Dest Warehouse', 'Quantity', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.map(r => (
                  <tr key={r.request_id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 font-mono font-bold text-xs">#TR-{r.request_id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-4 py-4 font-bold text-gray-800">{r.product?.name}</td>
                    <td className="px-4 py-4 text-gray-600 font-semibold">{r.source_warehouse?.name}</td>
                    <td className="px-4 py-4 text-gray-600 font-semibold">{r.dest_warehouse?.name}</td>
                    <td className="px-4 py-4 font-bold text-gray-800">{r.quantity} {r.product?.unit || 'kg'}</td>
                    <td className="px-4 py-4"><LocalBadge s={r.status} /></td>
                    <td className="px-4 py-4 flex gap-1.5 flex-wrap">
                      {r.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(r.request_id, 'APPROVED')} className="px-2 py-1 text-xs font-bold rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition">Approve</button>
                          <button onClick={() => updateStatus(r.request_id, 'REJECTED')} className="px-2 py-1 text-xs font-bold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition">Reject</button>
                        </>
                      )}
                      {r.status === 'APPROVED' && (
                        <button onClick={() => updateStatus(r.request_id, 'PREPARING')} className="px-2 py-1 text-xs font-bold rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition">Prepare</button>
                      )}
                      {r.status === 'PREPARING' && (
                        <button onClick={() => updateStatus(r.request_id, 'IN_TRANSIT')} className="px-2 py-1 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition">Dispatch</button>
                      )}
                      {r.status === 'IN_TRANSIT' && (
                        <button onClick={() => updateStatus(r.request_id, 'DELIVERED')} className="px-2 py-1 text-xs font-bold rounded-lg bg-green-600 text-white font-bold transition">Mark Delivered</button>
                      )}
                      {['DELIVERED', 'REJECTED'].includes(r.status) && <span className="text-xs text-gray-400 font-medium">Archived</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <LocalModal title="Request Stock Transfer" onClose={() => setModal(false)}>
          <div className="space-y-4">
            <LocalField label="Product" type="select" required value={form.product_id} onChange={v => setForm(f => ({ ...f, product_id: v }))} options={products.map(p => ({ value: p.product_id, label: `${p.name} (${p.category})` }))} />
            <LocalField label="Source Warehouse (Deduct Stock)" type="select" required value={form.source_warehouse_id} onChange={v => setForm(f => ({ ...f, source_warehouse_id: v }))} options={warehouses.map(w => ({ value: w.warehouse_id, label: w.name }))} />
            <LocalField label="Destination Warehouse (Receive Stock)" type="select" required value={form.dest_warehouse_id} onChange={v => setForm(f => ({ ...f, dest_warehouse_id: v }))} options={warehouses.map(w => ({ value: w.warehouse_id, label: w.name }))} />
            <LocalField label="Quantity" type="number" required value={form.quantity} onChange={v => setForm(f => ({ ...f, quantity: v }))} min="1" placeholder="Enter transfer weight..." />
            <LocalField label="Internal Transfer Notes" type="textarea" value={form.notes} onChange={v => setForm(f => ({ ...f, notes: v }))} placeholder="Reasons for internal transfer..." rows={2} />

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button onClick={() => setModal(false)} className="px-4 py-2 text-sm border rounded-xl font-bold hover:bg-gray-50 transition">Cancel</button>
              <button onClick={createRequest} className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm shadow-md transition">Request Transfer</button>
            </div>
          </div>
        </LocalModal>
      )}
    </div>
  )
}

// ── NOTIFICATIONS CENTER PAGE ──
export function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api('/api/notifications')
      setNotifications(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const markRead = async id => {
    try {
      await api(`/api/notifications/${id}/read`, { method: 'POST' })
      load()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-950">Notifications Center</h1>
          <p className="text-sm text-gray-500 font-semibold font-medium">Real-time alerts, ETA delays, and transit notifications</p>
        </div>
        <button onClick={load} className="text-xs font-bold px-3 py-2 border rounded-xl bg-white hover:bg-gray-50 transition">
          🔄 Refresh
        </button>
      </div>

      {loading ? <LocalLoader /> : notifications.length === 0 ? <div className="bg-white border rounded-2xl p-8"><LocalEmpty icon="🔔" msg="No alerts in system." /></div> : (
        <div className="bg-white border rounded-2xl divide-y">
          {notifications.map(n => (
            <div key={n.notification_id} className={`p-5 flex items-start gap-4 transition ${n.is_read ? 'opacity-60 bg-gray-50/20' : 'bg-green-50/10'}`}>
              <div className="text-xl flex-shrink-0 pt-0.5">
                {n.type === 'ETA_REACHED' ? '⏰' : n.type === 'DELAYED' ? '⚠️' : n.type === 'DAMAGED' ? '🔴' : '🟢'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">{n.type?.replace(/_/g, ' ')}</span>
                  <LocalBadge s={n.type} />
                  <span className="text-[10px] text-gray-400 font-semibold">{fmtDT(n.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium mt-1">{n.message}</p>
              </div>
              {!n.is_read && (
                <button onClick={() => markRead(n.notification_id)} className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition">
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── PRODUCT STOCK HISTORY VIEW ──
export function ProductHistoryView({ productId }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const loadHistory = async () => {
      if (!productId) return
      setLoading(true)
      try {
        const data = await api(`/api/products/${productId}/history`)
        if (active) setHistory(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error(e)
      } finally {
        if (active) setLoading(false)
      }
    }
    loadHistory()
    return () => { active = false }
  }, [productId])

  if (loading) return <LocalLoader />
  if (history.length === 0) return <LocalEmpty icon="📋" msg="No stock history logged for this product." />

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-gray-900 border-b pb-2 uppercase tracking-wide">Stock Audit History</h3>
      <div className="divide-y max-h-60 overflow-y-auto pr-2">
        {history.map(h => {
          const qty = Number(h.quantity)
          return (
            <div key={h.movement_id} className="py-2.5 flex items-center justify-between text-xs font-semibold">
              <div>
                <span className={`px-2 py-0.5 rounded font-bold text-[9px] mr-2 ${qty > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {h.movement_type}
                </span>
                <span className="text-gray-700 font-medium">{h.warehouse?.name || 'Global Stock'}</span>
              </div>
              <div className="text-right">
                <span className={`font-bold ${qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {qty > 0 ? `+${qty}` : qty} kg
                </span>
                <div className="text-[10px] text-gray-400 font-medium">{fmtDate(h.created_at)}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
