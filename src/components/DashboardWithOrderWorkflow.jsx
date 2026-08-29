import { useEffect, useState } from 'react'
import Dashboard from './Dashboard'

async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const r = await fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined
  })
  const ct = r.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(data.error || r.statusText || 'Request failed')
  return data
}

const emptyItem = () => ({ product_id: '', quantity: '', agreed_price_per_unit: '' })

function OrderCreateModal({ onClose }) {
  const [farmers, setFarmers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ farmer_id: '', ordered_at: new Date().toISOString().slice(0, 16), notes: '', items: [emptyItem()] })

  useEffect(() => {
    let mounted = true
    Promise.all([api('/api/farmers'), api('/api/products')]).then(([f, p]) => {
      if (!mounted) return
      const availableFarmers = Array.isArray(f) ? f.filter(x => x.farmer_id) : []
      const availableProducts = Array.isArray(p) ? p.filter(x => x.product_id) : []
      setFarmers(availableFarmers); setProducts(availableProducts)
      if (availableFarmers.length) setForm(current => ({ ...current, farmer_id: String(availableFarmers[0].farmer_id) }))
    }).catch(e => mounted && setError(e.message)).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const setItem = (index, key, value) => {
    setError('')
    setForm(current => {
      const items = [...current.items]
      items[index] = { ...items[index], [key]: value }
      if (key === 'product_id') {
        const product = products.find(p => String(p.product_id) === String(value))
        items[index].agreed_price_per_unit = product?.current_price ?? ''
      }
      return { ...current, items }
    })
  }
  const addItem = () => { setError(''); setForm(f => ({ ...f, items: [...f.items, emptyItem()] })) }
  const removeItem = index => { setError(''); setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== index) })) }

  const submit = async () => {
    setError('')
    const farmerId = String(form.farmer_id || '').trim()
    if (!farmerId) return setError('Farmer is required.')
    if (!form.ordered_at) return setError('Order date is required.')
    if (!form.items.length) return setError('Add at least one product.')
    if (form.items.some(item => !item.product_id || Number(item.quantity) <= 0 || Number(item.agreed_price_per_unit) <= 0)) return setError('Each product needs a product, quantity greater than 0, and agreed price greater than 0.')
    setSaving(true)
    try {
      await api('/api/orders', { method: 'POST', body: { order_status: 'PLACED', ordered_at: new Date(form.ordered_at).toISOString(), notes: form.notes.trim() || '', items: form.items.map(item => ({ product_id: item.product_id, farmer_id: farmerId, quantity: Number(item.quantity), agreed_price_per_unit: Number(item.agreed_price_per_unit) })) } })
      onClose(true)
    } catch (e) { setError(e.message) } finally { setSaving(false) }
  }

  return <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[300] p-4" onMouseDown={e => { if (e.target === e.currentTarget) onClose(false) }}>
    <div data-order-create-modal="true" className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10"><h2 className="font-bold text-xl text-gray-900">New Order</h2><button type="button" onClick={() => onClose(false)} className="text-gray-500 text-2xl font-bold">×</button></div>
      <div className="p-6 space-y-5">
        {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-3">{error}</div>}
        {loading ? <div className="py-12 text-center text-sm text-gray-500">Loading farmers and products…</div> : <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Farmer <span className="text-red-500">*</span></label><select value={form.farmer_id} onChange={e => { setForm(f => ({ ...f, farmer_id: String(e.target.value) })); setError('') }} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"><option value="">— Select farmer —</option>{farmers.map(f => <option key={f.farmer_id} value={String(f.farmer_id)}>{f.name}{f.phone ? ` — ${f.phone}` : ''}</option>)}</select></div>
            <div><label className="block text-xs font-semibold text-gray-600 mb-1">Order Date <span className="text-red-500">*</span></label><input type="datetime-local" value={form.ordered_at} onChange={e => { setForm(f => ({ ...f, ordered_at: e.target.value })); setError('') }} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" /></div>
          </div>
          <div className="rounded-2xl border border-gray-200 overflow-hidden"><div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200"><p className="text-sm font-bold">Order Items <span className="text-red-500">*</span></p><button type="button" onClick={addItem} className="px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-bold">+ Add Product</button></div><div className="p-4 space-y-3">{form.items.map((item, index) => <div key={index} className="grid grid-cols-12 gap-3 items-end p-3 rounded-xl bg-gray-50/60 border border-gray-100"><div className="col-span-12 md:col-span-5"><label className="block text-xs font-semibold text-gray-600 mb-1">Product *</label><select value={item.product_id} onChange={e => setItem(index, 'product_id', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white"><option value="">— Select product —</option>{products.map(p => <option key={p.product_id} value={String(p.product_id)}>{p.name} — {p.unit || 'KG'}</option>)}</select></div><div className="col-span-5 md:col-span-2"><label className="block text-xs font-semibold text-gray-600 mb-1">Quantity *</label><input type="number" min="0.01" step="0.01" value={item.quantity} onChange={e => setItem(index, 'quantity', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white" /></div><div className="col-span-5 md:col-span-3"><label className="block text-xs font-semibold text-gray-600 mb-1">Price / Unit *</label><input type="number" min="0.01" step="0.01" value={item.agreed_price_per_unit} onChange={e => setItem(index, 'agreed_price_per_unit', e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white" /></div><div className="col-span-2 md:col-span-2 text-right"><span className="text-sm font-bold text-green-700">৳{Math.round(Number(item.quantity || 0) * Number(item.agreed_price_per_unit || 0)).toLocaleString()}</span>{form.items.length > 1 && <button type="button" onClick={() => removeItem(index)} className="ml-2 text-red-500 text-xl font-black">×</button>}</div></div>)}</div></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">Notes (optional)</label><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm" /></div>
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100"><button type="button" onClick={() => onClose(false)} className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 font-semibold">Cancel</button><button type="button" disabled={saving || loading} onClick={submit} className="px-5 py-2.5 text-sm rounded-xl bg-green-600 disabled:opacity-50 text-white font-bold">{saving ? 'Creating…' : 'Create Order'}</button></div>
        </>}
      </div>
    </div>
  </div>
}

export default function DashboardWithOrderWorkflow(props) {
  const [open, setOpen] = useState(false)
  const handleCapture = e => {
    if (e.target?.closest?.('[data-order-create-modal]')) return
    const button = e.target?.closest?.('button')
    if (!button) return
    if ((button.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase().includes('create order')) { e.preventDefault(); e.stopPropagation(); setOpen(true) }
  }
  return <div onClickCapture={handleCapture}><Dashboard {...props} />{open && <OrderCreateModal onClose={created => { setOpen(false); if (created) window.location.reload() }} />}</div>
}
