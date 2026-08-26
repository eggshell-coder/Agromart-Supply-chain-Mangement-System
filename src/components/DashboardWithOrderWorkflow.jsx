import { useEffect, useMemo, useState } from 'react'
import Dashboard from './Dashboard'

const EMPTY_ITEM = { product_id: '', quantity: '', agreed_price_per_unit: '' }

function money(value) {
  return `৳${Number(value || 0).toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

async function api(path, opts = {}) {
  const r = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const ct = r.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(data.error || r.statusText || 'Request failed')
  return data
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default function DashboardWithOrderWorkflow(props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingRefs, setLoadingRefs] = useState(false)
  const [error, setError] = useState('')
  const [farmers, setFarmers] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    farmer_id: '',
    ordered_at: new Date().toISOString().slice(0, 16),
    notes: '',
    items: [{ ...EMPTY_ITEM }],
  })

  useEffect(() => {
    const onClickCapture = event => {
      const button = event.target?.closest?.('button')
      if (!button || button.dataset.orderWorkflow === 'true') return
      const text = (button.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase()
      if (text === '+ create order' || text === 'create order') {
        event.preventDefault()
        event.stopPropagation()
        setOpen(true)
        setError('')
      }
    }
    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [])

  useEffect(() => {
    if (!open) return
    let active = true
    setLoadingRefs(true)
    Promise.all([api('/api/farmers'), api('/api/products')])
      .then(([farmerRows, productRows]) => {
        if (!active) return
        setFarmers(Array.isArray(farmerRows) ? farmerRows.filter(f => f.is_active !== false) : [])
        setProducts(Array.isArray(productRows) ? productRows.filter(p => p.is_active !== false) : [])
      })
      .catch(e => active && setError(e.message))
      .finally(() => active && setLoadingRefs(false))
    return () => { active = false }
  }, [open])

  const farmer = farmers.find(f => f.farmer_id === form.farmer_id)
  const totals = useMemo(() => form.items.map(item => Number(item.quantity || 0) * Number(item.agreed_price_per_unit || 0)), [form.items])
  const subtotal = totals.reduce((sum, value) => sum + value, 0)

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))
  const updateItem = (index, key, value) => setForm(prev => {
    const items = prev.items.map((item, i) => i === index ? { ...item, [key]: value } : item)
    if (key === 'product_id') {
      const product = products.find(p => p.product_id === value)
      items[index].agreed_price_per_unit = product?.current_price ?? ''
    }
    return { ...prev, items }
  })
  const addItem = () => setForm(prev => ({ ...prev, items: [...prev.items, { ...EMPTY_ITEM }] }))
  const removeItem = index => setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }))

  const reset = () => setForm({ farmer_id: '', ordered_at: new Date().toISOString().slice(0, 16), notes: '', items: [{ ...EMPTY_ITEM }] })

  const submit = async () => {
    setError('')
    if (!form.farmer_id) return setError('Farmer is required.')
    if (!form.items.length) return setError('Add at least one product.')
    const invalid = form.items.some(item => !item.product_id || Number(item.quantity) <= 0 || Number(item.agreed_price_per_unit) <= 0)
    if (invalid) return setError('Every product needs a quantity and agreed unit price greater than zero.')
    try {
      setLoading(true)
      await api('/api/orders', {
        method: 'POST',
        body: {
          farmer_id: form.farmer_id,
          ordered_at: new Date(form.ordered_at).toISOString(),
          notes: form.notes.trim() || null,
          order_status: 'PLACED',
          items: form.items.map(item => ({
            product_id: item.product_id,
            quantity: Number(item.quantity),
            agreed_price_per_unit: Number(item.agreed_price_per_unit),
          })),
        },
      })
      setOpen(false)
      reset()
      window.location.reload()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dashboard {...props} />
      {open && (
        <Modal onClose={() => !loading && setOpen(false)}>
          <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div>
              <h2 className="font-bold text-lg text-gray-900">New Order</h2>
              <p className="text-xs text-gray-500 mt-0.5">Create the farmer purchase order and all line items together.</p>
            </div>
            <button data-order-workflow="true" onClick={() => setOpen(false)} disabled={loading} className="text-gray-500 hover:text-gray-800 text-2xl leading-none font-bold">×</button>
          </div>

          <div className="p-5 space-y-5">
            {error && <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Farmer<span className="text-red-500 ml-0.5">*</span></label>
                <select value={form.farmer_id} onChange={e => update('farmer_id', e.target.value)} disabled={loadingRefs || loading} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100">
                  <option value="">— Select farmer —</option>
                  {farmers.map(f => <option key={f.farmer_id} value={f.farmer_id}>{f.name}{f.district?.name ? ` — ${f.district.name}` : ''}</option>)}
                </select>
                {farmer && <p className="text-xs text-gray-500 mt-1">{farmer.phone || 'No phone'}{farmer.location ? ` · ${farmer.location}` : ''}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Order Date</label>
                <input type="datetime-local" value={form.ordered_at} onChange={e => update('ordered_at', e.target.value)} disabled={loading} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Products<span className="text-red-500 ml-0.5">*</span></h3>
                  <p className="text-xs text-gray-500">Add one or more products with the agreed price.</p>
                </div>
                <button data-order-workflow="true" onClick={addItem} disabled={loadingRefs || loading} className="px-3 py-2 rounded-xl text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100">+ Add Product</button>
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="hidden md:grid grid-cols-[minmax(0,1.7fr)_0.8fr_1fr_1fr_44px] gap-2 px-3 py-2 bg-gray-50 text-[10px] font-bold uppercase text-gray-500">
                  <span>Product</span><span>Quantity</span><span>Unit Price</span><span>Total</span><span />
                </div>
                <div className="divide-y divide-gray-100">
                  {form.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[minmax(0,1.7fr)_0.8fr_1fr_1fr_44px] gap-2 p-3 items-end">
                      <div>
                        <label className="md:hidden block text-xs font-semibold text-gray-600 mb-1">Product</label>
                        <select value={item.product_id} onChange={e => updateItem(index, 'product_id', e.target.value)} disabled={loadingRefs || loading} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500">
                          <option value="">— Select product —</option>
                          {products.map(p => <option key={p.product_id} value={p.product_id}>{p.name}{p.category ? ` (${p.category})` : ''}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="md:hidden block text-xs font-semibold text-gray-600 mb-1">Quantity</label>
                        <input type="number" min="0.01" step="0.01" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} disabled={loading} placeholder="0" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500" />
                      </div>
                      <div>
                        <label className="md:hidden block text-xs font-semibold text-gray-600 mb-1">Agreed Unit Price (৳)</label>
                        <input type="number" min="0.01" step="0.01" value={item.agreed_price_per_unit} onChange={e => updateItem(index, 'agreed_price_per_unit', e.target.value)} disabled={loading} placeholder="0.00" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500" />
                      </div>
                      <div className="text-sm font-bold text-gray-900 py-2.5">{money(totals[index])}</div>
                      <button data-order-workflow="true" onClick={() => removeItem(index)} disabled={form.items.length === 1 || loading} className="h-10 w-10 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Remove product">🗑</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ml-auto max-w-xs rounded-xl bg-gray-50 p-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="flex justify-between font-bold text-gray-900"><span>Total</span><span>{money(subtotal)}</span></div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Notes <span className="font-normal text-gray-400">(optional)</span></label>
              <textarea value={form.notes} onChange={e => update('notes', e.target.value)} disabled={loading} rows={3} placeholder="Optional notes for this order" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100" />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button data-order-workflow="true" onClick={() => setOpen(false)} disabled={loading} className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 font-semibold text-gray-700">Cancel</button>
              <button data-order-workflow="true" onClick={submit} disabled={loading || loadingRefs} className="px-5 py-2.5 text-sm rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-60">
                {loading ? 'Creating…' : 'Create Order'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
