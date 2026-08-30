export default function SpoilageQuality() {
  return (
    <div>
      {/* SideNavBar */}
      <aside className="w-sidebar-width h-screen fixed left-0 top-0 bg-sidebar-bg flex flex-col h-full py-lg z-50">
        <div className="px-6 mb-8">
          <h1 className="text-headline-md font-headline-md text-on-primary font-bold">AgroMart</h1>
          <p className="text-body-sm font-body-sm text-on-primary/70">Supply Chain Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 space-y-2">
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Overview
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            Orders
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            Shipments
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            Inventory
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
            Transfers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="agriculture">agriculture</span>
            Farmers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="category">category</span>
            Products
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="warehouse">warehouse</span>
            Warehouses
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            Vehicles
          </a>
          {/* Active */}
          <a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#">
            <span className="material-symbols-outlined" data-icon="delete_forever" style={{fontVariationSettings: "'FILL' 1"}}>delete_forever</span>
            Spoilage
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="cloud">cloud</span>
            Weather
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="request_quote">request_quote</span>
            Price Audit
          </a>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 ml-sidebar-width flex flex-col h-screen overflow-hidden bg-background">
        {/* TopAppBar */}
        <header className="bg-surface-container-lowest docked full-width sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center h-16 px-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="pl-10 pr-4 py-2 rounded-lg border border-outline-variant bg-surface-container-low focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-on-surface w-64" placeholder="Search Spoilage Records..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <button className="hover:bg-surface-container-low transition-colors p-2 rounded-full">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="hover:bg-surface-container-low transition-colors p-2 rounded-full">
              <span className="material-symbols-outlined" data-icon="history">history</span>
            </button>
            <button className="hover:bg-surface-container-low transition-colors p-2 rounded-full">
              <span className="material-symbols-outlined" data-icon="apps">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm ml-2">
              JS
            </div>
          </div>
        </header>
        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-xl">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-background mb-1">Spoilage &amp; Quality</h2>
              <p className="text-body-md font-body-md text-on-surface-variant">Monitor waste, identify trends, and manage compromised inventory.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface font-label-md hover:bg-surface-container-low transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">download</span> Export Report
              </button>
              <button className="px-4 py-2 bg-primary-container text-on-primary rounded-lg font-label-md hover:bg-primary-container/90 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">add</span> Log Spoilage
              </button>
            </div>
          </div>
          {/* Dashboard Bento Grid */}
          <div className="grid grid-cols-12 gap-gutter mb-8">
            {/* KPI 1 */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Spoilage Value</h3>
                <span className="material-symbols-outlined text-error">trending_up</span>
              </div>
              <div>
                <div className="text-headline-lg font-headline-lg text-on-background mb-1">$24,590</div>
                <p className="text-body-sm font-body-sm text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 12% vs last month
                </p>
              </div>
            </div>
            {/* KPI 2 */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Spoilage Rate</h3>
                <span className="material-symbols-outlined text-active-highlight">warning</span>
              </div>
              <div>
                <div className="text-headline-lg font-headline-lg text-on-background mb-1">2.4%</div>
                <p className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
                  Across all active inventory
                </p>
              </div>
            </div>
            {/* Top Spoiled Products */}
            <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-surface-variant rounded-xl p-6">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Top At-Risk Products</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">local_florist</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-background text-sm">Organic Strawberries</p>
                      <p className="font-body-sm text-on-surface-variant text-xs">Temperature Excursion</p>
                    </div>
                  </div>
                  <span className="font-label-md text-error">450 kg</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">grass</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-background text-sm">Romaine Lettuce</p>
                      <p className="font-body-sm text-on-surface-variant text-xs">Wilting / Aging</p>
                    </div>
                  </div>
                  <span className="font-label-md text-secondary">320 kg</span>
                </li>
              </ul>
            </div>
          </div>
          {/* Table Section */}
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden">
            <div className="p-6 border-b border-surface-variant flex justify-between items-center bg-surface-bright">
              <h3 className="font-headline-sm text-headline-sm text-on-background">Recent Spoilage Records</h3>
              <div className="flex gap-2">
                <select className="border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm font-body-sm bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>All Warehouses</option>
                  <option>North Facility</option>
                  <option>South Facility</option>
                </select>
                <select className="border border-outline-variant rounded-lg px-3 py-1.5 text-body-sm font-body-sm bg-surface-container-lowest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>All Reasons</option>
                  <option>Temperature</option>
                  <option>Damaged</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-table-header-bg border-b border-surface-variant">
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Record ID</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Product</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Warehouse</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Quantity</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Reason</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">Date</th>
                    <th className="px-4 py-3 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-body-md font-body-md text-on-background divide-y divide-surface-variant">
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 py-4 min-h-[52px]">
                      <span className="font-label-md text-primary-container">#SP-2049</span>
                    </td>
                    <td className="px-4 py-4">Organic Strawberries</td>
                    <td className="px-4 py-4">North Facility - Cold Storage A</td>
                    <td className="px-4 py-4 font-label-md">450 kg</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-container text-on-error-container">
                        Temperature
                      </span>
                    </td>
                    <td className="px-4 py-4 text-on-surface-variant">Oct 24, 2023</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 py-4 min-h-[52px]">
                      <span className="font-label-md text-primary-container">#SP-2048</span>
                    </td>
                    <td className="px-4 py-4">Romaine Lettuce</td>
                    <td className="px-4 py-4">East Hub - Zone 2</td>
                    <td className="px-4 py-4 font-label-md">320 kg</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-variant text-on-surface-variant">
                        Expired
                      </span>
                    </td>
                    <td className="px-4 py-4 text-on-surface-variant">Oct 23, 2023</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 py-4 min-h-[52px]">
                      <span className="font-label-md text-primary-container">#SP-2047</span>
                    </td>
                    <td className="px-4 py-4">Avocado (Hass)</td>
                    <td className="px-4 py-4">South Facility - Dock 4</td>
                    <td className="px-4 py-4 font-label-md">115 kg</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed-dim text-on-secondary-fixed-variant">
                        Damaged
                      </span>
                    </td>
                    <td className="px-4 py-4 text-on-surface-variant">Oct 21, 2023</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 py-4 min-h-[52px]">
                      <span className="font-label-md text-primary-container">#SP-2046</span>
                    </td>
                    <td className="px-4 py-4">Gala Apples</td>
                    <td className="px-4 py-4">North Facility - Sorting Line</td>
                    <td className="px-4 py-4 font-label-md">85 kg</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-fixed-dim text-on-secondary-fixed-variant">
                        Damaged
                      </span>
                    </td>
                    <td className="px-4 py-4 text-on-surface-variant">Oct 20, 2023</td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
