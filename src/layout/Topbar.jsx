import { Menu, X, Bell } from 'lucide-react'
import { useState } from 'react'
import { NAV_SECTIONS } from './Sidebar'

const TITLES = Object.fromEntries(NAV_SECTIONS.flatMap(s => s.items).map(i => [i.key, i.label]))
TITLES.notifications = 'Notifications'

export default function Topbar({ page, onNavigate, unreadCount }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="h-16 shrink-0 bg-white border-b border-[#ece9df] flex items-center gap-3 px-4 md:px-7 sticky top-0 z-30">
        <button type="button" className="md:hidden text-forest-900" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-forest-950 truncate">{TITLES[page] || 'AgroMart'}</h1>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('notifications')}
            className="relative md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-surface-sunken text-forest-900"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />}
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-forest-950 text-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-lg">AgroMart</span>
              <button type="button" onClick={() => setDrawerOpen(false)} className="text-white/70"><X size={20} /></button>
            </div>
            <div className="space-y-5">
              {NAV_SECTIONS.map(section => (
                <div key={section.label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/35 mb-1.5 px-1">{section.label}</p>
                  <div className="space-y-0.5">
                    {section.items.map(item => {
                      const Icon = item.icon
                      const active = page === item.key
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => { onNavigate(item.key); setDrawerOpen(false) }}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${
                            active ? 'bg-amber-400 text-forest-950 font-bold' : 'text-white/75 hover:bg-white/10'
                          }`}
                        >
                          <Icon size={16} strokeWidth={2.25} />
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
