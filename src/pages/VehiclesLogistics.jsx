export default function VehiclesLogistics() {
  return (
    <div>
      {/* SideNavBar */}
      <aside className="w-sidebar-width h-screen fixed left-0 top-0 bg-sidebar-bg dark:bg-sidebar-bg flex flex-col h-full py-lg z-50">
        <div className="px-xl mb-lg">
          <h1 className="text-headline-md font-headline-md text-on-primary font-bold">AgroMart</h1>
          <p className="text-on-primary/80 font-body-sm text-body-sm">Supply Chain Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto space-y-sm">
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            Overview
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">shopping_cart</span>
            Orders
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">local_shipping</span>
            Shipments
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            Inventory
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">swap_horiz</span>
            Transfers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">agriculture</span>
            Farmers
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">category</span>
            Products
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">warehouse</span>
            Warehouses
          </a>
          <a className="bg-active-highlight text-primary font-label-md rounded-full px-4 py-2 mx-2 flex items-center gap-3 scale-95 transition-transform" href="#">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
            Vehicles
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">delete_forever</span>
            Spoilage
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">cloud</span>
            Weather
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">request_quote</span>
            Price Audit
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">verified</span>
            Provenance
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">notifications</span>
            Notifications
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">group</span>
            Users
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">manage_accounts</span>
            Roles
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">history</span>
            Audit History
          </a>
          <a className="text-on-primary/80 font-label-md px-4 py-2 mx-2 flex items-center gap-3 hover:bg-on-primary/10 transition-colors" href="#">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </a>
        </nav>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 ml-sidebar-width flex flex-col min-h-screen">
        {/* TopAppBar */}
        <header className="bg-surface-container-lowest dark:bg-surface-container-lowest docked full-width sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center h-16 px-xl">
          <div className="flex items-center gap-md w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 font-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all" placeholder="Search vehicles..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-md">
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-sm">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Canvas */}
        <div className="p-xl flex-1 bg-surface-cream">
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-background">Vehicles &amp; Logistics</h2>
              <p className="text-body-lg font-body-lg text-on-surface-variant mt-1">Manage fleet status, driver assignments, and vehicle capacity.</p>
            </div>
            <button className="bg-primary-container text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary transition-colors">
              <span className="material-symbols-outlined">add</span>
              Register Vehicle
            </button>
          </div>
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-gutter">
            {/* Fleet Status Summary Widget */}
            <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md">
              <h3 className="text-headline-sm font-headline-sm text-on-background">Fleet Overview</h3>
              <div className="grid grid-cols-2 gap-sm">
                <div className="bg-primary-fixed rounded-lg p-md">
                  <span className="material-symbols-outlined text-primary-container mb-2">local_shipping</span>
                  <div className="text-display-lg font-display-lg text-primary-container">24</div>
                  <div className="text-label-sm font-label-sm text-on-primary-container uppercase">Available</div>
                </div>
                <div className="bg-secondary-fixed rounded-lg p-md">
                  <span className="material-symbols-outlined text-on-secondary-container mb-2">route</span>
                  <div className="text-display-lg font-display-lg text-on-secondary-container">18</div>
                  <div className="text-label-sm font-label-sm text-on-secondary-container uppercase">In Transit</div>
                </div>
                <div className="bg-error-container rounded-lg p-md">
                  <span className="material-symbols-outlined text-on-error-container mb-2">build</span>
                  <div className="text-display-lg font-display-lg text-on-error-container">3</div>
                  <div className="text-label-sm font-label-sm text-on-error-container uppercase">Maintenance</div>
                </div>
                <div className="bg-surface-container-high rounded-lg p-md">
                  <span className="material-symbols-outlined text-on-surface-variant mb-2">person_off</span>
                  <div className="text-display-lg font-display-lg text-on-surface-variant">5</div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant uppercase">Unassigned</div>
                </div>
              </div>
            </div>
            {/* Active Tracking Map Widget */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden relative min-h-[300px]">
              <div className="absolute top-lg left-lg z-10 bg-surface-container-lowest/90 backdrop-blur px-md py-sm rounded-lg border border-outline-variant">
                <h3 className="text-label-md font-label-md text-on-background flex items-center gap-2">
                  <span className="material-symbols-outlined text-active-highlight">my_location</span>
                  Live Fleet Tracking
                </h3>
              </div>
              <img className="w-full h-full object-cover" alt="Fleet Map" src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80" />
            </div>
            {/* Vehicles Table */}
            <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center">
                <h3 className="text-headline-sm font-headline-sm text-on-background">Vehicle Directory</h3>
                <div className="flex gap-sm">
                  <button className="border border-outline-variant text-on-surface-variant font-label-md text-label-md px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-surface-container-low transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                    Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-table-header-bg border-b border-outline-variant">
                      <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Vehicle No.</th>
                      <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Type / Capacity</th>
                      <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Assigned Driver</th>
                      <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Current Status</th>
                      <th className="py-3 px-md text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-background">
                    {/* Row 1 */}
                    <tr className="border-b border-[#F1F1F1] hover:bg-surface-container-low transition-colors">
                      <td className="py-4 px-md">
                        <div className="font-label-md">TRK-8492</div>
                        <div className="text-body-sm text-on-surface-variant">Volvo FH16</div>
                      </td>
                      <td className="py-4 px-md">
                        <div>Refrigerated</div>
                        <div className="text-body-sm text-on-surface-variant">24 Tons</div>
                      </td>
                      <td className="py-4 px-md flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-label-sm font-label-sm text-on-surface-variant">JD</div>
                        <span>John Doe</span>
                      </td>
                      <td className="py-4 px-md">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-[#e8f5e9] text-[#2e7d32]">Available</span>
                      </td>
                      <td className="py-4 px-md text-right">
                        <button className="bg-primary-container text-on-primary font-label-sm text-label-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-primary transition-colors ml-auto">
                          <span className="material-symbols-outlined text-[16px]">assignment_add</span>
                          Assign Shipment
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="border-b border-[#F1F1F1] hover:bg-surface-container-low transition-colors">
                      <td className="py-4 px-md">
                        <div className="font-label-md">V-1024</div>
                        <div className="text-body-sm text-on-surface-variant">Ford Transit</div>
                      </td>
                      <td className="py-4 px-md">
                        <div>Standard Van</div>
                        <div className="text-body-sm text-on-surface-variant">2 Tons</div>
                      </td>
                      <td className="py-4 px-md flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-label-sm font-label-sm text-on-surface-variant">AS</div>
                        <span>Alice Smith</span>
                      </td>
                      <td className="py-4 px-md">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-[#fff3e0] text-[#ef6c00]">In Transit</span>
                      </td>
                      <td className="py-4 px-md text-right">
                        <button className="border border-outline-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-surface-container-low transition-colors ml-auto">
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          View Route
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="border-b border-[#F1F1F1] hover:bg-surface-container-low transition-colors">
                      <td className="py-4 px-md">
                        <div className="font-label-md">TRK-3391</div>
                        <div className="text-body-sm text-on-surface-variant">Scania R500</div>
                      </td>
                      <td className="py-4 px-md">
                        <div>Flatbed</div>
                        <div className="text-body-sm text-on-surface-variant">30 Tons</div>
                      </td>
                      <td className="py-4 px-md flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-label-sm font-label-sm text-on-surface-variant">Un</div>
                        <span className="text-on-surface-variant italic">Unassigned</span>
                      </td>
                      <td className="py-4 px-md">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-label-sm font-label-sm bg-[#ffebee] text-[#c62828]">Maintenance</span>
                      </td>
                      <td className="py-4 px-md text-right">
                        <button className="border border-outline-variant text-on-surface-variant font-label-sm text-label-sm px-3 py-1.5 rounded flex items-center gap-1 hover:bg-surface-container-low transition-colors ml-auto">
                          <span className="material-symbols-outlined text-[16px]">build</span>
                          Details
                        </button>
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
  );
}
