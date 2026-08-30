import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Overview', icon: 'dashboard' },
  { to: '/shipments', label: 'Shipments', icon: 'local_shipping' },
  { to: '/orders', label: 'Orders', icon: 'receipt_long' },
  { to: '/inventory', label: 'Inventory', icon: 'inventory_2' },
  { to: '/products', label: 'Products', icon: 'category' },
  { to: '/transfer-requests', label: 'Transfer Requests', icon: 'swap_horiz' },
  { to: '/provenance', label: 'Provenance', icon: 'verified' },
  { to: '/farmers', label: 'Farmers', icon: 'agriculture' },
  { to: '/vehicles', label: 'Fleet & Logistics', icon: 'commute' },
  { to: '/spoilage', label: 'Quality & Spoilage', icon: 'warning' },
  { to: '/weather', label: 'Weather Monitor', icon: 'partly_cloudy_day' },
  { to: '/market-prices', label: 'Market Prices', icon: 'trending_up' },
  { to: '/audit-history', label: 'Audit History', icon: 'history' },
  { to: '/users-roles', label: 'Users & Roles', icon: 'admin_panel_settings' },
]

const footerItems = [
  { to: '/notifications', label: 'Notifications', icon: 'notifications' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

function NavItem({ to, label, icon }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-md rounded-lg px-md py-sm font-label-md transition-transform duration-150 active:scale-[0.98] ${
            isActive
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
          }`
        }
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
        {label}
      </NavLink>
    </li>
  )
}

export default function Sidebar() {
  return (
    <nav className="bg-surface-container-low border-r border-outline-variant fixed left-0 top-0 h-full w-[280px] hidden md:flex flex-col p-md overflow-y-auto z-50">
      <div className="mb-lg flex items-center gap-sm">
        <span className="material-symbols-outlined text-primary text-[32px]">eco</span>
        <div>
          <h1 className="text-headline-md text-primary font-bold">Agromart</h1>
          <p className="text-label-sm text-on-surface-variant">Supply Chain SCM</p>
        </div>
      </div>

      <button className="bg-primary hover:bg-surface-tint text-on-primary rounded-lg py-sm px-md mb-md font-label-md transition-colors w-full flex items-center justify-center gap-sm">
        <span className="material-symbols-outlined">add</span> Create New Order
      </button>

      <ul className="flex flex-col gap-xs flex-grow overflow-y-auto pr-1">
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </ul>

      <div className="mt-auto border-t border-outline-variant pt-md shrink-0">
        <ul className="flex flex-col gap-xs">
          {footerItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </ul>
      </div>
    </nav>
  )
}
