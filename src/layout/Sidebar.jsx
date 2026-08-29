import {
  LayoutDashboard, ShoppingCart, Truck, Users, Package, Warehouse,
  CarFront, Leaf, Thermometer, CloudSun, Receipt, Route as RouteIcon,
  ArrowLeftRight, Bell, LogOut,
} from 'lucide-react'

export const NAV_SECTIONS = [
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

export default function Sidebar({ page, onNavigate, unreadCount, onLogout, user }) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-forest-950 text-white h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-forest-950 text-sm">AM</div>
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active ? 'bg-amber-400 text-forest-950 font-bold' : 'text-white/75 hover:bg-white/10 hover:text-white'
                    }`}
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

      <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
        <button
          type="button"
          onClick={() => onNavigate('notifications')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
            page === 'notifications' ? 'bg-amber-400 text-forest-950 font-bold' : 'text-white/75 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Bell size={16} strokeWidth={2.25} />
          <span className="flex-1 text-left">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold bg-red-500 text-white rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-xs font-bold shrink-0">
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
