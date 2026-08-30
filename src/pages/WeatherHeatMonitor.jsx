export default function WeatherHeatMonitor() {
  return (
    <div>
      {/* SideNavBar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-sidebar-width bg-sidebar-bg flex-col py-lg gap-sm z-20">
        <div className="px-xl mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-active-highlight flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined" data-icon="agriculture" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-on-secondary">Agromart</h1>
              <p className="font-body-sm text-body-sm text-on-secondary/80">Supply Chain Management</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-1 px-2 scrollbar-hide">
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-body-md text-body-md">Overview</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            <span className="font-body-md text-body-md">Orders</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            <span className="font-body-md text-body-md">Shipments</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span className="font-body-md text-body-md">Inventory</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
            <span className="font-body-md text-body-md">Transfers</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="agriculture">agriculture</span>
            <span className="font-body-md text-body-md">Farmers</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="category">category</span>
            <span className="font-body-md text-body-md">Products</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="warehouse">warehouse</span>
            <span className="font-body-md text-body-md">Warehouses</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            <span className="font-body-md text-body-md">Vehicles</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="delete_sweep">delete_sweep</span>
            <span className="font-body-md text-body-md">Spoilage</span>
          </a>
          <a className="flex items-center gap-3 bg-active-highlight text-on-secondary-fixed rounded-full mx-2 px-4 py-2 font-bold transition-all duration-200 active:scale-95" href="#">
            <span className="material-symbols-outlined" data-icon="cloud">cloud</span>
            <span className="font-body-md text-body-md">Weather</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="monetization_on">monetization_on</span>
            <span className="font-body-md text-body-md">Price Audit</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="verified">verified</span>
            <span className="font-body-md text-body-md">Provenance</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="font-body-md text-body-md">Notifications</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span className="font-body-md text-body-md">Users</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
            <span className="font-body-md text-body-md">Roles</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            <span className="font-body-md text-body-md">Audit History</span>
          </a>
        </div>
      </nav>
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col md:ml-[260px] relative w-full overflow-hidden">
        {/* TopNavBar */}
        <header className="hidden md:flex fixed top-0 right-0 w-[calc(100%-260px)] h-16 bg-surface dark:bg-surface-dim justify-between items-center px-xl z-10 border-b border-outline-variant">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary">Agromart SCM</h2>
            <div className="relative flex items-center ml-8">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant" data-icon="search">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all" placeholder="Search locations..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80 relative">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-2">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Canvas / Dashboard Content */}
        <main className="flex-1 overflow-y-auto pt-20 px-4 md:px-xl pb-xl bg-background">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex justify-between items-end mb-2">
              <div>
                <h2 className="font-display-lg text-display-lg text-primary">Weather &amp; Risk Monitor</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Real-time environmental tracking for active routes and facilities.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span>
                  Filter Regions
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors">
                  <span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                  Export Report
                </button>
              </div>
            </div>
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Critical Alerts Panel (Spans 4 columns) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="bg-surface rounded-xl border border-error-container p-5 shadow-sm relative overflow-hidden pulse-alert">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-error-container rounded-bl-full -mr-8 -mt-8 opacity-50" />
                  <div className="flex items-start justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error" data-icon="warning" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                      <h3 className="font-headline-sm text-headline-sm text-error">Critical Alerts</h3>
                    </div>
                    <span className="bg-error text-on-error px-2 py-1 rounded-full font-label-sm text-label-sm">2 ACTIVE</span>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="bg-surface-bright border border-error/20 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Route: Central Valley to Port</p>
                          <p className="font-body-sm text-body-sm text-error mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]" data-icon="thermostat">thermostat</span>
                            Temperature exceeded 85°F
                          </p>
                        </div>
                        <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span></button>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-semibold">Truck ID: CV-842</span>
                        <span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-semibold">12 mins ago</span>
                      </div>
                    </div>
                    <div className="bg-surface-bright border border-error/20 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Facility: North Silo Alpha</p>
                          <p className="font-body-sm text-body-sm text-error mt-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]" data-icon="water_drop">water_drop</span>
                            Humidity spike &gt; 65%
                          </p>
                        </div>
                        <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span></button>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-semibold">Zone: Storage B</span>
                        <span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded text-xs font-semibold">45 mins ago</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 text-center text-sm font-semibold text-error hover:bg-error-container/30 rounded transition-colors">Acknowledge All</button>
                </div>
                {/* Mini Map Card */}
                <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden h-64 flex flex-col">
                  <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-table-header-bg">
                    <h3 className="font-label-md text-label-md text-on-surface">Regional Overview</h3>
                    <span className="material-symbols-outlined text-on-surface-variant" data-icon="map">map</span>
                  </div>
                  <div className="flex-1 bg-surface-container-highest relative">
                    <div className="w-full h-full bg-cover bg-center opacity-60" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80")'}} />
                    {/* Map Markers */}
                    <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                      <div className="w-4 h-4 bg-error rounded-full border-2 border-surface shadow-md animate-ping" />
                      <div className="w-4 h-4 bg-error rounded-full border-2 border-surface shadow-md absolute" />
                      <span className="text-[10px] font-bold bg-surface/80 px-1 rounded mt-5 backdrop-blur-sm shadow">North Silo</span>
                    </div>
                    <div className="absolute top-1/2 left-2/3 flex flex-col items-center">
                      <div className="w-4 h-4 bg-primary-container rounded-full border-2 border-surface shadow-md" />
                      <span className="text-[10px] font-bold bg-surface/80 px-1 rounded mt-1 backdrop-blur-sm shadow">Port Auth</span>
                    </div>
                    <div className="absolute bottom-1/3 left-1/4 flex flex-col items-center">
                      <div className="w-4 h-4 bg-active-highlight rounded-full border-2 border-surface shadow-md" />
                      <span className="text-[10px] font-bold bg-surface/80 px-1 rounded mt-1 backdrop-blur-sm shadow">Central Val.</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main Data Canvas (Spans 8 columns) */}
              <div className="md:col-span-8 flex flex-col gap-6">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-surface rounded-xl border border-outline-variant p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-label-md text-label-md text-on-surface-variant">Avg Temp (Transit)</span>
                      <span className="material-symbols-outlined text-primary-container" data-icon="thermostat">thermostat</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="font-display-lg text-display-lg text-on-surface">68°</span>
                      <span className="font-label-sm text-label-sm text-on-primary-container flex items-center mb-2 bg-primary-fixed px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]" data-icon="arrow_downward">arrow_downward</span> 2°
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface rounded-xl border border-outline-variant p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-label-md text-label-md text-on-surface-variant">Avg Humidity (Storage)</span>
                      <span className="material-symbols-outlined text-primary-container" data-icon="water_drop">water_drop</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="font-display-lg text-display-lg text-on-surface">42%</span>
                      <span className="font-label-sm text-label-sm text-error flex items-center mb-2 bg-error-container/50 px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[14px]" data-icon="arrow_upward">arrow_upward</span> 5%
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface rounded-xl border border-outline-variant p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-label-md text-label-md text-on-surface-variant">Spoilage Risk Index</span>
                      <span className="material-symbols-outlined text-active-highlight" data-icon="warning">warning</span>
                    </div>
                    <div className="flex items-end gap-3">
                      <span className="font-display-lg text-display-lg text-on-surface">Low</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mb-2">System wide</span>
                    </div>
                    <div className="w-full bg-surface-container-highest h-2 mt-3 rounded-full overflow-hidden">
                      <div className="bg-active-highlight h-full w-1/4 rounded-full" />
                    </div>
                  </div>
                </div>
                {/* Trend Chart */}
                <div className="bg-surface rounded-xl border border-outline-variant p-5 flex-1 min-h-[300px] flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Temperature Trends vs Thresholds</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Past 24 Hours • High Sensitivity Cargo</p>
                    </div>
                    <div className="flex bg-surface-container-low rounded-lg p-1 border border-outline-variant">
                      <button className="px-3 py-1 text-sm font-semibold bg-surface shadow-sm rounded text-on-surface">24H</button>
                      <button className="px-3 py-1 text-sm font-semibold text-on-surface-variant hover:text-on-surface">7D</button>
                      <button className="px-3 py-1 text-sm font-semibold text-on-surface-variant hover:text-on-surface">30D</button>
                    </div>
                  </div>
                  {/* Visual trend curve */}
                  <div className="flex-1 relative w-full flex items-end justify-between gap-2 pt-8 pb-4">
                    {[62, 65, 68, 70, 74, 82, 85, 78, 72, 69, 66, 68].map((temp, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="relative w-full flex justify-center items-end h-40">
                          <div
                            className={`w-full rounded-t transition-all duration-300 ${temp > 80 ? 'bg-error' : temp > 70 ? 'bg-active-highlight' : 'bg-primary-container'}`}
                            style={{ height: `${(temp / 100) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-on-surface-variant">{`${i * 2}:00`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Facility Status Table (Full Width Bottom) */}
              <div className="md:col-span-12 bg-surface rounded-xl border border-outline-variant overflow-hidden">
                <div className="px-5 py-4 border-b border-outline-variant flex justify-between items-center bg-table-header-bg">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Live Facility Status</h3>
                  <button className="text-primary font-label-md text-label-md hover:underline">View All Facilities</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-bright border-b border-outline-variant">
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Facility / Zone</th>
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Temp (°F)</th>
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Humidity</th>
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                        <th className="py-3 px-5 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md">
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 px-5 font-semibold text-on-surface">North Silo Alpha</td>
                        <td className="py-4 px-5 text-on-surface-variant">Grain Storage</td>
                        <td className="py-4 px-5 text-on-surface">72°</td>
                        <td className="py-4 px-5 text-error font-semibold flex items-center gap-1">68% <span className="material-symbols-outlined text-[16px]">arrow_upward</span></td>
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-xs font-bold inline-block">WARNING</span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 px-5 font-semibold text-on-surface">Central Cold Storage</td>
                        <td className="py-4 px-5 text-on-surface-variant">Produce (Perishable)</td>
                        <td className="py-4 px-5 text-on-surface">36°</td>
                        <td className="py-4 px-5 text-on-surface">85%</td>
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold inline-block">OPTIMAL</span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
                        </td>
                      </tr>
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 px-5 font-semibold text-on-surface">Port Authority Dock 4</td>
                        <td className="py-4 px-5 text-on-surface-variant">Transit Hub</td>
                        <td className="py-4 px-5 text-active-highlight font-semibold flex items-center gap-1">82° <span className="material-symbols-outlined text-[16px]">arrow_upward</span></td>
                        <td className="py-4 px-5 text-on-surface">45%</td>
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full text-xs font-bold inline-block">ELEVATED</span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-4 px-5 font-semibold text-on-surface">South Valley Hub</td>
                        <td className="py-4 px-5 text-on-surface-variant">General Storage</td>
                        <td className="py-4 px-5 text-on-surface">65°</td>
                        <td className="py-4 px-5 text-on-surface">30%</td>
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold inline-block">OPTIMAL</span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" data-icon="more_vert">more_vert</span></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Mobile Nav Override (Hidden on md+) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant flex justify-around py-3 z-50">
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="text-[10px] font-semibold">Overview</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined" data-icon="cloud" style={{ fontVariationSettings: "'FILL' 1" }}>cloud</span>
          <span className="text-[10px] font-bold">Weather</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
          <span className="text-[10px] font-semibold">Transit</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined" data-icon="menu">menu</span>
          <span className="text-[10px] font-semibold">More</span>
        </a>
      </div>
    </div>
  );
}
