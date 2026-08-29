import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import {
  Users, Package, ShoppingCart, Truck, Warehouse, CarFront, Leaf,
  Thermometer, CloudSun, Receipt, Route as RouteIcon, ArrowLeftRight,
  Bell, LogOut, Menu, X, LayoutDashboard,
} from 'lucide-react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_566VpDhmAdFAWvayT7fIw_XvWswQXW'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })

async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const r = await fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const ct = r.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(data.error || r.statusText || 'Request failed')
  return data
}

// ─── Placeholder page ─────────────────────────────────────────────────────────
function Placeholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-12 h-12 rounded-2xl bg-green-800/10 flex items-center justify-center">
        <span className="text-2xl">🚧</span>
      </div>
      <p className="text-green-900 font-semibold">{name}</p>
      <p className="text-sm text-gray-400">Coming soon</p>
    </div>
  )
}

// ─── Dashboard overview ───────────────────────────────────────────────────────
function DashboardHome() {
  const [stats, setStats] = useState({ orders: 0, farmers: 0, products: 0, shipments: 0 })
  useEffect(() => {
    Promise.allSettled([
      api('/api/orders'), api('/api/farmers'), api('/api/products'), api('/api/shipments'),
    ]).then(([o, f, p, s]) => {
      setStats({
        orders: Array.isArray(o.value) ? o.value.length : 0,
        farmers: Array.isArray(f.value) ? f.value.length : 0,
        products: Array.isArray(p.value) ? p.value.length : 0,
        shipments: Array.isArray(s.value) ? s.value.length : 0,
      })
    })
  }, [])
  const cards = [
    { label: 'Total Orders', value: stats.orders, icon: '📋', color: 'bg-green-50 border-green-200' },
    { label: 'Farmers', value: stats.farmers, icon: '👨‍🌾', color: 'bg-amber-50 border-amber-200' },
    { label: 'Products', value: stats.products, icon: '📦', color: 'bg-blue-50 border-blue-200' },
    { label: 'Shipments', value: stats.shipments, icon: '🚚', color: 'bg-purple-50 border-purple-200' },
  ]
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-green-950">Overview</h2>
        <p className="text-sm text-gray-500 mt-0.5">Your supply chain at a glance</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className={`rounded-2xl border p-5 ${c.color}`}>
            <p className="text-2xl mb-2">{c.icon}</p>
            <p className="text-2xl font-bold text-green-950">{c.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Orders page ──────────────────────────────────────────────────────────────
function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/api/orders')
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading orders…</div>
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-green-950">Orders</h2>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-green-700 text-white text-sm font-bold hover:bg-green-800 transition-colors"
        >
          Create Order
        </button>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-16 text-sm text-gray-400">No orders yet. Create your first order.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Order ID', 'Status', 'Date', 'Notes'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(o => (
                <tr key={o.purchase_order_id || o.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{String(o.purchase_order_id || o.id || '—').slice(0, 8)}…</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      o.order_status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                      o.order_status === 'PLACED' ? 'bg-blue-100 text-blue-800' :
                      o.order_status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-700'
                    }`}>{o.order_status || 'UNKNOWN'}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{o.ordered_at ? new Date(o.ordered_at).toLocaleDateString() : '—'}</td>
                  <td className="px-4 py-3 text-gray-500 truncate max-w-xs">{o.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Farmers page ─────────────────────────────────────────────────────────────
function FarmersPage() {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/api/farmers')
      .then(data => setFarmers(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading farmers…</div>
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-green-950">Farmers</h2>
      {farmers.length === 0 ? (
        <div className="text-center py-16 text-sm text-gray-400">No farmers registered yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Phone', 'Email', 'Region'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {farmers.map(f => (
                <tr key={f.farmer_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">{f.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{f.phone || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{f.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{f.region || f.address || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Products page ────────────────────────────────────────────────────────────
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api('/api/products')
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading products…</div>
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-green-950">Products</h2>
      {products.length === 0 ? (
        <div className="text-center py-16 text-sm text-gray-400">No products yet.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Unit', 'Price', 'Category'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.product_id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">{p.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{p.unit || 'KG'}</td>
                  <td className="px-4 py-3 text-gray-600">৳{Number(p.current_price || 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-600">{p.category || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Nav config ───────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { label: 'Overview', items: [{ key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'Trade', items: [
    { key: 'orders', label: 'Orders', icon: ShoppingCart },
    { key: 'shipments', label: 'Shipments', icon: Truck },
    { key: 'product-requests', label: 'Transfer Requests', icon: ArrowLeftRight },
  ]},
  { label: 'Directory', items: [
    { key: 'farmers', label: 'Farmers', icon: Users },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'warehouses', label: 'Warehouses', icon: Warehouse },
    { key: 'vehicles', label: 'Vehicles', icon: CarFront },
  ]},
  { label: 'Insights', items: [
    { key: 'spoilage', label: 'Spoilage', icon: Leaf },
    { key: 'monitoring', label: 'Cold Chain', icon: Thermometer },
    { key: 'weather', label: 'Weather', icon: CloudSun },
    { key: 'priceaudit', label: 'Price Audit', icon: Receipt },
    { key: 'provenance', label: 'Provenance', icon: RouteIcon },
  ]},
]

function renderPage(page) {
  if (page === 'dashboard') return <DashboardHome />
  if (page === 'orders') return <OrdersPage />
  if (page === 'farmers') return <FarmersPage />
  if (page === 'products') return <ProductsPage />
  const allItems = NAV_SECTIONS.flatMap(s => s.items)
  const item = allItems.find(i => i.key === page)
  return <Placeholder name={item?.label || page} />
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ page, onNavigate, onLogout, user }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-green-950 text-white h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-green-950 text-sm">AM</div>
        <span className="font-bold text-lg tracking-tight">AgroMart</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/35 mb-1.5">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon
                const active = page === item.key
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-amber-400 text-green-950 font-bold' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Icon size={16} strokeWidth={2.25} />
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold shrink-0">
            {(user?.email || '?').slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate">{user?.email || 'Unknown user'}</p>
          </div>
          <button type="button" onClick={onLogout} className="text-white/50 hover:text-white shrink-0" title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

// ─── Topbar (mobile) ──────────────────────────────────────────────────────────
function Topbar({ page, onNavigate, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const allItems = NAV_SECTIONS.flatMap(s => s.items)
  const title = allItems.find(i => i.key === page)?.label || 'AgroMart'

  return (
    <>
      <header className="h-16 shrink-0 bg-white border-b border-gray-200 flex items-center gap-3 px-4 sticky top-0 z-30">
        <button type="button" className="md:hidden text-green-950" onClick={() => setDrawerOpen(true)}>
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-green-950 truncate">{title}</h1>
        <div className="ml-auto">
          <button type="button" onClick={onLogout} className="md:hidden text-gray-500 hover:text-gray-900">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-green-950 text-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">AgroMart</span>
              <button type="button" onClick={() => setDrawerOpen(false)} className="text-white/70"><X size={20} /></button>
            </div>
            {NAV_SECTIONS.map(section => (
              <div key={section.label} className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/35 mb-1.5 px-1">{section.label}</p>
                {section.items.map(item => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => { onNavigate(item.key); setDrawerOpen(false) }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium mb-0.5 ${page === item.key ? 'bg-amber-400 text-green-950 font-bold' : 'text-white/75 hover:bg-white/10'}`}
                    >
                      <Icon size={16} strokeWidth={2.25} />
                      {item.label}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// ─── Main Dashboard shell ─────────────────────────────────────────────────────
export default function Dashboard({ onLogout, role }) {
  const [page, setPage] = useState('dashboard')
  const userRaw = sessionStorage.getItem('agromart_user')
  let user = null
  try { user = userRaw ? JSON.parse(userRaw) : null } catch { user = null }

  return (
    <div className="flex h-screen bg-[#f5f2eb] overflow-hidden">
      <Sidebar page={page} onNavigate={setPage} onLogout={onLogout} user={user} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar page={page} onNavigate={setPage} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          {renderPage(page)}
        </main>
      </div>
    </div>
  )
}
