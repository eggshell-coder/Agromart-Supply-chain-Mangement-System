export default function FarmersDirectory() {
  return (
    <div>
      {/* SideNavBar */}
      <aside className="w-sidebar-width h-screen fixed left-0 top-0 bg-sidebar-bg flex flex-col h-full py-lg z-50">
        <div className="px-lg mb-xl flex items-center gap-md">
          <div className="w-10 h-10 rounded bg-active-highlight flex items-center justify-center text-primary font-headline-sm">A</div>
          <div>
            <h2 className="text-headline-md font-headline-md text-on-primary font-bold">AgroMart</h2>
            <p className="text-body-sm font-body-sm text-on-primary/70">Supply Chain Management</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-sm flex flex-col gap-sm">
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
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors rounded-full" href="#">
            <span className="material-symbols-outlined">swap_horiz</span> Transfers
          </a>
          {/* Active Nav Item */}
          <a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#">
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
      {/* Main Workspace */}
      <div className="flex-1 ml-sidebar-width flex flex-col h-screen">
        {/* TopAppBar */}
        <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center h-16 px-xl shrink-0 z-40 sticky top-0">
          <div className="flex-1 flex items-center max-w-md relative">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant">search</span>
            <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary-container outline-none transition-shadow" placeholder="Search farmers, regions..." type="text" />
          </div>
          <div className="flex items-center gap-md ml-auto text-primary font-label-md text-label-md">
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center ml-sm overflow-hidden border border-outline-variant cursor-pointer">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Page Canvas */}
        <main className="flex-1 overflow-y-auto p-xl">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-background tracking-tight">Farmers Directory</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage and track registered agricultural partners.</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md px-5 py-2.5 rounded flex items-center gap-2 transition-colors shadow-sm">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Farmer
            </button>
          </div>
          {/* Data Table Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
            {/* Table Controls / Filters Bar */}
            <div className="px-md py-sm border-b border-surface-variant flex items-center gap-sm bg-surface-bright">
              <button className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded text-body-sm font-label-md text-on-surface hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[16px]">filter_list</span> Filter
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 border border-outline-variant rounded text-body-sm font-label-md text-on-surface hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[16px]">sort</span> Sort
              </button>
              <div className="ml-auto text-body-sm text-on-surface-variant font-body-sm">
                Showing 1-6 of 248 entries
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-table-header-bg border-b border-surface-variant">
                  <tr>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[25%] tracking-wider">Name</th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[15%] tracking-wider">Phone</th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[20%] tracking-wider">Email</th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[15%] tracking-wider">Region</th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[12%] text-right tracking-wider">Total Orders</th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant uppercase px-md py-3 w-[13%] tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant">
                  {/* Row 1 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label-md font-bold shrink-0">ET</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">Elias Thorne</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">+1 555-0198</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">elias.thorne@farmnet.com</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">Midwest Valley</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface text-right">142</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-primary-fixed/40 text-on-primary-fixed-variant border border-primary-fixed">Active</span>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md font-bold shrink-0">MS</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">Maria Santos</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">+1 555-0234</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">m.santos.agri@outlook.com</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">Central Coast</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface text-right">87</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-primary-fixed/40 text-on-primary-fixed-variant border border-primary-fixed">Active</span>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-label-md font-bold shrink-0">DK</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">David Kim</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">+1 555-0811</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">dkim_organics@gmail.com</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">Pacific Northwest</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface text-right">310</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-secondary-container/40 text-on-secondary-container border border-secondary-container">Pending</span>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-label-md font-bold shrink-0">SJ</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium text-on-surface-variant/70">Sarah Jenkins</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant/70">+1 555-0942</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant/70">sarah.j@northeastfarms.co</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant/70">Northeast Highlands</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface/70 text-right">45</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-error-container/40 text-on-error-container border border-error-container/50">Inactive</span>
                    </td>
                  </tr>
                  {/* Row 5 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center font-label-md font-bold shrink-0">AB</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">Amina Bello</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">+1 555-1102</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">amina.bello@agroco.com</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">Southern Plains</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface text-right">219</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-primary-fixed/40 text-on-primary-fixed-variant border border-primary-fixed">Active</span>
                    </td>
                  </tr>
                  {/* Row 6 */}
                  <tr className="hover:bg-surface-bright transition-colors h-[52px] group">
                    <td className="px-md py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-label-md font-bold shrink-0">RC</div>
                        <span className="font-body-md text-body-md text-on-surface font-medium">Robert Chen</span>
                      </div>
                    </td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">+1 555-3387</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">rchen.harvest@chenfarms.net</td>
                    <td className="px-md py-2 font-body-sm text-body-sm text-on-surface-variant">Delta Region</td>
                    <td className="px-md py-2 font-body-md text-body-md text-on-surface text-right">18</td>
                    <td className="px-md py-2 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide bg-secondary-container/40 text-on-secondary-container border border-secondary-container">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="border-t border-surface-variant px-md py-sm bg-surface-container-lowest flex items-center justify-end gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant bg-primary-container text-on-primary font-label-sm">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface font-label-sm hover:bg-surface-container-low">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface font-label-sm hover:bg-surface-container-low">3</button>
              <span className="text-on-surface-variant mx-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface font-label-sm hover:bg-surface-container-low">42</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-on-surface hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
