export default function InventoryWarehousing() {
  return (
    <div>
      {/* SideNavBar */}
      <nav className="bg-sidebar-bg text-on-primary w-sidebar-width h-screen fixed left-0 top-0 flex flex-col py-lg z-50">
        <div className="px-xl mb-xl">
          <h1 className="text-headline-md font-headline-md text-on-primary font-bold tracking-tight">AgroMart</h1>
          <p className="text-on-primary/70 font-body-sm mt-xs">Supply Chain Management</p>
        </div>
        <div className="flex-1 overflow-y-auto px-sm flex flex-col gap-sm">
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            Overview
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            Orders
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            Shipments
          </a>
          {/* Active Tab: Inventory */}
          <a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2" data-weight="fill">inventory_2</span>
            Inventory
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
            Transfers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="agriculture">agriculture</span>
            Farmers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="category">category</span>
            Products
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="warehouse">warehouse</span>
            Warehouses
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            Vehicles
          </a>
          <div className="mt-md mb-xs px-xl">
            <p className="text-on-primary/50 font-label-sm uppercase tracking-wider">Analytics &amp; Tools</p>
          </div>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="delete_forever">delete_forever</span>
            Spoilage
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="cloud">cloud</span>
            Weather
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="request_quote">request_quote</span>
            Price Audit
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="verified">verified</span>
            Provenance
          </a>
          <div className="mt-md mb-xs px-xl">
            <p className="text-on-primary/50 font-label-sm uppercase tracking-wider">System</p>
          </div>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            Notifications
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            Users
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
            Roles
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            Audit History
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            Settings
          </a>
        </div>
      </nav>
      {/* Main Content Area */}
      <div className="ml-sidebar-width flex-1 flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="bg-surface-container-lowest text-primary font-label-md h-16 px-xl flex justify-between items-center border-b border-outline-variant sticky top-0 z-40">
          <div className="flex items-center gap-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Inventory Management</h2>
          </div>
          <div className="flex items-center gap-lg">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[20px]" data-icon="search">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-sm font-body-sm w-64 focus:ring-1 focus:ring-primary-container transition-all" placeholder="Search SKU, Batch..." type="text" />
            </div>
            <div className="flex items-center gap-sm">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="history">history</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                <span className="material-symbols-outlined" data-icon="apps">apps</span>
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden border border-outline-variant/30 ml-sm cursor-pointer">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Page Canvas */}
        <main className="flex-1 p-xl overflow-x-hidden">
          {/* Controls Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-lg gap-md">
            <div className="flex items-center gap-sm">
              <label className="font-label-md text-label-md text-on-surface-variant">Location:</label>
              <div className="relative">
                <select className="appearance-none bg-surface-container-lowest border border-outline-variant rounded-md pl-4 pr-10 py-2 font-body-md text-body-md text-on-surface focus:ring-primary focus:border-primary w-48">
                  <option>All Warehouses</option>
                  <option>Central Hub - North</option>
                  <option>Regional - East</option>
                  <option>Cold Storage Facility</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" data-icon="expand_more">expand_more</span>
              </div>
            </div>
            <div className="flex gap-md">
              <button className="px-4 py-2 border border-outline bg-transparent text-on-surface font-label-md text-label-md rounded-md hover:bg-surface-container-low transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]" data-icon="sync_alt">sync_alt</span>
                Transfer Stock
              </button>
              <button className="px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-md hover:bg-primary-container/90 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                Adjust Stock
              </button>
            </div>
          </div>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
            <div className="bg-surface-container-lowest p-lg rounded-lg border border-outline-variant/50">
              <div className="flex justify-between items-start mb-4">
                <p className="font-label-md text-label-md text-on-surface-variant">Total Inventory Value</p>
                <span className="material-symbols-outlined text-primary-container bg-primary-fixed/30 p-1.5 rounded-md" data-icon="account_balance_wallet">account_balance_wallet</span>
              </div>
              <h3 className="font-display-lg text-display-lg text-on-surface">$2.4M</h3>
              <p className="font-body-sm text-body-sm text-primary-container mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                +4.2% from last month
              </p>
            </div>
            <div className="bg-surface-container-lowest p-lg rounded-lg border border-outline-variant/50">
              <div className="flex justify-between items-start mb-4">
                <p className="font-label-md text-label-md text-on-surface-variant">Total Units (Active)</p>
                <span className="material-symbols-outlined text-primary-container bg-primary-fixed/30 p-1.5 rounded-md" data-icon="inventory">inventory</span>
              </div>
              <h3 className="font-display-lg text-display-lg text-on-surface">145k</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 flex items-center gap-1">Across 12 facilities</p>
            </div>
            <div className="bg-surface-container-lowest p-lg rounded-lg border border-outline-variant/50">
              <div className="flex justify-between items-start mb-4">
                <p className="font-label-md text-label-md text-on-surface-variant">Incoming Deliveries</p>
                <span className="material-symbols-outlined text-primary-container bg-primary-fixed/30 p-1.5 rounded-md" data-icon="local_shipping">local_shipping</span>
              </div>
              <h3 className="font-display-lg text-display-lg text-on-surface">24</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 flex items-center gap-1">Expected today</p>
            </div>
            <div className="bg-error-container/20 p-lg rounded-lg border border-error/20">
              <div className="flex justify-between items-start mb-4">
                <p className="font-label-md text-label-md text-on-surface-variant">Low Stock Alerts</p>
                <span className="material-symbols-outlined text-error bg-error-container p-1.5 rounded-md" data-icon="warning">warning</span>
              </div>
              <h3 className="font-display-lg text-display-lg text-error">8</h3>
              <p className="font-body-sm text-body-sm text-error mt-2 flex items-center gap-1">Action required immediately</p>
            </div>
          </div>
          {/* Main Data Table Area */}
          <div className="bg-surface-container-lowest border border-outline-variant/50 rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Current Stock Levels</h3>
              <div className="flex gap-2">
                <button className="p-2 border border-outline-variant rounded-md text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]" data-icon="filter_list">filter_list</span>
                </button>
                <button className="p-2 border border-outline-variant rounded-md text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  <span className="material-symbols-outlined text-[18px]" data-icon="download">download</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-table-header-bg border-b border-outline-variant/50">
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/4">Product / SKU</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/6">Warehouse</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Available</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Reserved</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Incoming</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider w-1/6 pl-lg">Status</th>
                    <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center w-12" />
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md text-on-surface">
                  {/* Row 1 */}
                  <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors h-[52px]">
                    <td className="py-3 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-primary" data-icon="grain">grain</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Organic Winter Wheat</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">SKU-WWT-092</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-md text-on-surface-variant">Central Hub - North</td>
                    <td className="py-3 px-md text-right font-medium">12,450 kg</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">2,100 kg</td>
                    <td className="py-3 px-md text-right text-primary-container">+5,000 kg</td>
                    <td className="py-3 px-md pl-lg">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed-dim/30 text-primary-container font-label-sm text-label-sm">Healthy</span>
                    </td>
                    <td className="py-3 px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors h-[52px]">
                    <td className="py-3 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="eco">eco</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Nitrogen Fertilizer (Urea)</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">SKU-FRT-114</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-md text-on-surface-variant">Regional - East</td>
                    <td className="py-3 px-md text-right font-medium">450 L</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">400 L</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">-</td>
                    <td className="py-3 px-md pl-lg">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary-fixed/50 text-secondary font-label-sm text-label-sm">Low Stock</span>
                    </td>
                    <td className="py-3 px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors h-[52px]">
                    <td className="py-3 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center text-error">
                          <span className="material-symbols-outlined" data-icon="nutrition">nutrition</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Roma Tomatoes - Grade A</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">SKU-TOM-001</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-md text-on-surface-variant">Cold Storage Facility</td>
                    <td className="py-3 px-md text-right font-medium">85 kg</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">120 kg</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">-</td>
                    <td className="py-3 px-md pl-lg">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">Critical</span>
                    </td>
                    <td className="py-3 px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="border-b border-outline-variant/20 hover:bg-surface-container-low/50 transition-colors h-[52px]">
                    <td className="py-3 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="local_drink">local_drink</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Industrial Pesticide Alpha</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">SKU-CHM-882</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-md text-on-surface-variant">Central Hub - North</td>
                    <td className="py-3 px-md text-right font-medium">3,200 L</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">500 L</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">-</td>
                    <td className="py-3 px-md pl-lg">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed-dim/30 text-primary-container font-label-sm text-label-sm">Healthy</span>
                    </td>
                    <td className="py-3 px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors h-[52px]">
                    <td className="py-3 px-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container-high border border-outline-variant/30 flex-shrink-0 flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined" data-icon="grass">grass</span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">Soybean Seeds (GM-X)</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">SKU-SED-304</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-md text-on-surface-variant">Regional - South</td>
                    <td className="py-3 px-md text-right font-medium">8,000 kg</td>
                    <td className="py-3 px-md text-right text-on-surface-variant">1,200 kg</td>
                    <td className="py-3 px-md text-right text-primary-container">+2,000 kg</td>
                    <td className="py-3 px-md pl-lg">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed-dim/30 text-primary-container font-label-sm text-label-sm">Healthy</span>
                    </td>
                    <td className="py-3 px-md text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest flex justify-between items-center text-on-surface-variant font-body-sm">
              <div>Showing 1-5 of 248 items</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1 bg-primary-container text-on-primary rounded">1</button>
                <button className="px-3 py-1 hover:bg-surface-container-low rounded transition-colors">2</button>
                <button className="px-3 py-1 hover:bg-surface-container-low rounded transition-colors">3</button>
                <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
