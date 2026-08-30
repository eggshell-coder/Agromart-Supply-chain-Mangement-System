export default function WarehouseDetails() {
  return (
    <div>
      {/* SideNavBar */}
      <aside className="bg-sidebar-bg dark:bg-sidebar-bg text-active-highlight font-body-md text-body-md w-sidebar-width h-screen fixed left-0 top-0 z-50 flex flex-col h-full py-lg hidden md:flex">
        <div className="px-xl mb-8">
          <h1 className="text-headline-md font-headline-md text-on-primary font-bold">AgroMart</h1>
          <p className="text-on-primary/80 font-body-sm text-body-sm mt-1">Supply Chain Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-sm">
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">dashboard</span>Overview</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">shopping_cart</span>Orders</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">local_shipping</span>Shipments</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">inventory_2</span>Inventory</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">swap_horiz</span>Transfers</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">agriculture</span>Farmers</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">category</span>Products</a></li>
            <li><a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#"><span className="material-symbols-outlined">warehouse</span>Warehouses</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">local_shipping</span>Vehicles</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">delete_forever</span>Spoilage</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">cloud</span>Weather</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">request_quote</span>Price Audit</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">verified</span>Provenance</a></li>
          </ul>
        </nav>
        <div className="mt-auto border-t border-on-primary/10 pt-4">
          <ul className="space-y-sm">
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">notifications</span>Notifications</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">group</span>Users</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">manage_accounts</span>Roles</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">history</span>Audit History</a></li>
            <li><a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#"><span className="material-symbols-outlined">settings</span>Settings</a></li>
          </ul>
        </div>
      </aside>
      {/* Main Content Wrapper */}
      <div className="md:ml-sidebar-width flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="bg-surface-container-lowest dark:bg-surface-container-lowest text-primary dark:text-inverse-primary font-label-md text-label-md docked full-width sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center h-16 px-xl">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-transparent rounded-full focus:ring-2 focus:ring-active-highlight focus:border-transparent font-body-sm text-body-sm text-on-surface" placeholder="Search..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full"><span className="material-symbols-outlined">notifications</span></button>
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full"><span className="material-symbols-outlined">history</span></button>
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full"><span className="material-symbols-outlined">apps</span></button>
            <div className="h-8 w-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center ml-4 cursor-pointer">
              <span className="font-label-md">AM</span>
            </div>
          </div>
        </header>
        {/* Main Canvas */}
        <main className="flex-1 p-xl overflow-y-auto">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm mb-2">
                <a className="hover:text-primary transition-colors" href="#">Warehouses</a>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-primary font-medium">WH-North-01</span>
              </div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Midwest Regional Hub</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">Des Moines, IA • Cold Storage Certified</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-outline-variant text-primary font-label-md rounded-lg hover:bg-surface-container-low transition-colors">Edit Details</button>
              <button className="px-4 py-2 bg-primary-container text-on-primary font-label-md rounded-lg hover:bg-primary-container/90 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">add</span> Create Transfer
              </button>
            </div>
          </div>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-8">
            {/* Utilization */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Utilization</span>
                <div className="bg-primary-fixed text-on-primary-fixed-variant p-2 rounded-full">
                  <span className="material-symbols-outlined">pie_chart</span>
                </div>
              </div>
              <div>
                <div className="text-headline-lg font-headline-lg text-on-surface">82%</div>
                <div className="w-full bg-surface-container-high h-2 rounded-full mt-3">
                  <div className="bg-active-highlight h-2 rounded-full" style={{width: '82%'}} />
                </div>
                <div className="text-body-sm font-body-sm text-on-surface-variant mt-2 flex justify-between">
                  <span>Near Capacity</span>
                  <span>Target: &lt; 85%</span>
                </div>
              </div>
            </div>
            {/* Capacity */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Storage Capacity</span>
                <div className="bg-primary-fixed text-on-primary-fixed-variant p-2 rounded-full">
                  <span className="material-symbols-outlined">aspect_ratio</span>
                </div>
              </div>
              <div>
                <div className="text-headline-lg font-headline-lg text-on-surface">45,000<span className="text-headline-sm text-on-surface-variant ml-1">sq ft</span></div>
                <div className="text-body-md font-body-md text-on-surface-variant mt-2">
                  Available: 8,100 sq ft
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-1 bg-surface-container-high text-on-surface text-[10px] font-bold uppercase rounded">Ambient</span>
                  <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase rounded">Cold</span>
                </div>
              </div>
            </div>
            {/* Product Count */}
            <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Total Products</span>
                <div className="bg-primary-fixed text-on-primary-fixed-variant p-2 rounded-full">
                  <span className="material-symbols-outlined">category</span>
                </div>
              </div>
              <div>
                <div className="text-headline-lg font-headline-lg text-on-surface">1,204</div>
                <div className="text-body-sm font-body-sm text-primary mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +12% from last month
                </div>
                <div className="mt-3 text-body-sm font-body-sm text-on-surface-variant">
                  Top Category: Grains (40%)
                </div>
              </div>
            </div>
          </div>
          {/* Tabs Navigation */}
          <div className="border-b border-surface-variant mb-6">
            <nav aria-label="Tabs" className="flex gap-8">
              <a className="border-b-2 border-primary py-4 px-1 text-primary font-label-md" href="#">Inventory</a>
              <a className="border-b-2 border-transparent py-4 px-1 text-on-surface-variant hover:text-on-surface hover:border-surface-variant font-label-md transition-colors" href="#">Incoming Shipments</a>
              <a className="border-b-2 border-transparent py-4 px-1 text-on-surface-variant hover:text-on-surface hover:border-surface-variant font-label-md transition-colors" href="#">Outgoing Shipments</a>
              <a className="border-b-2 border-transparent py-4 px-1 text-on-surface-variant hover:text-on-surface hover:border-surface-variant font-label-md transition-colors" href="#">Spoilage</a>
            </nav>
          </div>
          {/* Tab Content (Inventory) */}
          <div className="bg-surface-container-lowest border border-surface-variant rounded-xl overflow-hidden">
            <div className="p-4 border-b border-surface-variant flex justify-between items-center bg-surface-bright">
              <div className="relative w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input className="w-full pl-9 pr-4 py-1.5 bg-surface border border-outline-variant rounded-md focus:ring-1 focus:ring-primary focus:border-primary font-body-sm text-body-sm" placeholder="Search inventory..." type="text" />
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-table-header-bg border-b border-surface-variant text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                    <th className="p-4 font-bold">Product ID</th>
                    <th className="p-4 font-bold">Name</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Quantity</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-body-md font-body-md text-on-surface divide-y divide-surface-variant">
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-medium text-primary">PRD-8821</td>
                    <td className="p-4">Organic Soybeans</td>
                    <td className="p-4">Grains</td>
                    <td className="p-4">4,500 kg</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-on-primary-fixed-variant">Optimal</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-medium text-primary">PRD-9034</td>
                    <td className="p-4">Winter Wheat</td>
                    <td className="p-4">Grains</td>
                    <td className="p-4">12,000 kg</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-on-primary-fixed-variant">Optimal</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-medium text-primary">PRD-4412</td>
                    <td className="p-4">Navel Oranges</td>
                    <td className="p-4">Produce</td>
                    <td className="p-4">850 boxes</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary-fixed text-on-secondary-fixed-variant">Nearing Expiry</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-medium text-primary">PRD-1099</td>
                    <td className="p-4">Cold-Pressed Olive Oil</td>
                    <td className="p-4">Processed</td>
                    <td className="p-4">320 liters</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-primary-fixed text-on-primary-fixed-variant">Optimal</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low transition-colors group">
                    <td className="p-4 font-medium text-primary">PRD-2201</td>
                    <td className="p-4">Roma Tomatoes</td>
                    <td className="p-4">Produce</td>
                    <td className="p-4">150 boxes</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-error-container text-on-error-container">Action Required</span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-on-surface-variant hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">more_vert</span></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-surface-variant bg-surface-bright flex justify-between items-center text-body-sm font-body-sm text-on-surface-variant">
              <span>Showing 1 to 5 of 1,204 entries</span>
              <div className="flex gap-2">
                <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50">Prev</button>
                <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-container-low">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
