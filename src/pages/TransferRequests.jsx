export default function TransferRequests() {
  return (
    <div>
      {/* SideNavBar */}
      <aside className="w-sidebar-width h-screen fixed left-0 top-0 bg-sidebar-bg dark:bg-sidebar-bg flex flex-col py-lg z-50">
        <div className="px-xl mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-on-primary rounded-full flex items-center justify-center text-sidebar-bg">
            <span className="material-symbols-outlined" data-weight="fill">agriculture</span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md text-on-primary font-bold leading-tight">AgroMart</h1>
            <p className="text-label-sm font-label-sm text-on-primary/80 uppercase">Supply Chain Management</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">dashboard</span> Overview
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">shopping_cart</span> Orders
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">local_shipping</span> Shipments
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">inventory_2</span> Inventory
          </a>
          <a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#">
            <span className="material-symbols-outlined">swap_horiz</span> Transfers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">agriculture</span> Farmers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">category</span> Products
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">warehouse</span> Warehouses
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">local_shipping</span> Vehicles
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">delete_forever</span> Spoilage
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">cloud</span> Weather
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">request_quote</span> Price Audit
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">verified</span> Provenance
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">notifications</span> Notifications
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">group</span> Users
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">manage_accounts</span> Roles
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">history</span> Audit History
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 ml-sidebar-width flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="flex justify-between items-center h-16 px-xl bg-surface-container-lowest dark:bg-surface-container-lowest sticky top-0 z-40 border-b border-outline-variant">
          <div className="flex items-center gap-4 text-on-surface-variant w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-transparent rounded-full font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Search transfer requests..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden ml-2 border border-outline-variant">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-xl flex-1 flex flex-col gap-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-background">Transfer Requests</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">Manage warehouse-to-warehouse inventory movements.</p>
            </div>
            <button className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-2.5 rounded-full hover:bg-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Transfer
            </button>
          </div>
          {/* Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-4">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary-container" /> Pending Approval
              </div>
              <div className="text-headline-lg font-headline-lg text-on-background mt-4">12</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-fixed-dim" /> Approved
              </div>
              <div className="text-headline-lg font-headline-lg text-on-background mt-4">34</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container" /> In Transit
              </div>
              <div className="text-headline-lg font-headline-lg text-on-background mt-4">8</div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
              <div className="text-label-sm font-label-sm text-on-surface-variant uppercase flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-outline-variant" /> Completed (7d)
              </div>
              <div className="text-headline-lg font-headline-lg text-on-background mt-4">156</div>
            </div>
          </div>
          {/* Data Table Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex-1">
            <div className="p-md border-b border-outline-variant flex justify-between items-center bg-table-header-bg">
              <div className="flex gap-4">
                <button className="text-label-md font-label-md text-primary border-b-2 border-primary pb-1">All Requests</button>
                <button className="text-label-md font-label-md text-on-surface-variant hover:text-primary pb-1">Pending Actions</button>
                <button className="text-label-md font-label-md text-on-surface-variant hover:text-primary pb-1">In Transit</button>
              </div>
              <button className="text-label-md font-label-md text-on-surface-variant flex items-center gap-1 border border-outline-variant px-3 py-1.5 rounded hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-table-header-bg text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="p-4 pl-6 font-semibold">Request ID</th>
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold text-right">Quantity</th>
                    <th className="p-4 font-semibold">From Warehouse</th>
                    <th className="p-4 font-semibold">To Warehouse</th>
                    <th className="p-4 font-semibold text-center">Status</th>
                    <th className="p-4 pr-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-body-md font-body-md text-on-background divide-y divide-surface-variant">
                  {/* Row 1: Pending */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 pl-6 font-label-md text-primary">TRQ-8902</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">grain</span>
                        </div>
                        <div>
                          <p className="font-label-md">Winter Wheat</p>
                          <p className="text-body-sm text-on-surface-variant">Grade A</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-md">2,500 mt</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Midwest Hub (WH-01)
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Eastern Port (WH-14)
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container/20 text-on-secondary-container">
                        Pending
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full border border-outline-variant text-error hover:bg-error-container hover:border-error-container flex items-center justify-center transition-colors" title="Reject">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary hover:bg-primary flex items-center justify-center transition-colors" title="Approve">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 2: Approved */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 pl-6 font-label-md text-primary">TRQ-8901</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">eco</span>
                        </div>
                        <div>
                          <p className="font-label-md">Soybeans</p>
                          <p className="text-body-sm text-on-surface-variant">Non-GMO</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-md">800 mt</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Northern Silo (WH-05)
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Midwest Hub (WH-01)
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-fixed text-on-primary-fixed">
                        Approved
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 rounded border border-outline-variant text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
                          Schedule
                        </button>
                        <button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-low flex items-center justify-center transition-colors">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 3: In Transit */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 pl-6 font-label-md text-primary">TRQ-8895</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">local_florist</span>
                        </div>
                        <div>
                          <p className="font-label-md">Organic Corn</p>
                          <p className="text-body-sm text-on-surface-variant">Bulk</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-md">1,200 mt</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Southern Depot (WH-08)
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Eastern Port (WH-14)
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary-container text-on-primary">
                        In Transit
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 rounded border border-outline-variant text-label-sm font-label-sm text-on-surface-variant hover:bg-surface-container-low transition-colors">
                          Track
                        </button>
                      </div>
                    </td>
                  </tr>
                  {/* Row 4: Pending */}
                  <tr className="hover:bg-surface-container-low/50 transition-colors group">
                    <td className="p-4 pl-6 font-label-md text-primary">TRQ-8894</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-on-surface-variant text-[16px]">water_drop</span>
                        </div>
                        <div>
                          <p className="font-label-md">Liquid Fertilizer</p>
                          <p className="text-body-sm text-on-surface-variant">Nitrogen Mix</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right font-label-md">5,000 L</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Chemical Store (WH-03)
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">warehouse</span>
                        Midwest Hub (WH-01)
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container/20 text-on-secondary-container">
                        Pending
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-full border border-outline-variant text-error hover:bg-error-container hover:border-error-container flex items-center justify-center transition-colors" title="Reject">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-primary-container text-on-primary hover:bg-primary flex items-center justify-center transition-colors" title="Approve">
                          <span className="material-symbols-outlined text-[18px]">check</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-outline-variant flex items-center justify-between text-body-sm text-on-surface-variant">
              <div>Showing 1 to 4 of 248 requests</div>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary-container text-on-primary font-label-sm">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low font-label-sm text-on-surface">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low font-label-sm text-on-surface">3</button>
                <span className="w-8 h-8 flex items-center justify-center">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container-low">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
