export default function Topbar() {
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-40 flex justify-between items-center h-16 px-xl w-full">
      <div className="flex items-center gap-md md:hidden">
        <span className="material-symbols-outlined text-primary text-[24px]">eco</span>
        <span className="text-headline-sm font-semibold text-on-surface">Agromart SCM</span>
      </div>

      <div className="hidden md:flex items-center flex-grow max-w-md">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full pl-xl pr-sm py-sm bg-surface-container-lowest border-outline-variant border rounded text-body-md focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-on-surface-variant"
            placeholder="Search orders, shipments..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-md ml-auto">
        <button className="text-on-surface-variant hover:bg-surface-container-lowest transition-all rounded-full p-sm">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-lowest transition-all rounded-full p-sm">
          <span className="material-symbols-outlined">history</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-lowest transition-all rounded-full p-sm hidden sm:block">
          <span className="material-symbols-outlined">apps</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center ml-sm overflow-hidden border border-outline-variant">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          />
        </div>
      </div>
    </header>
  )
}
