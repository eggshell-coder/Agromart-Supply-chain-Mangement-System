export default function UsersRolesPermissions() {
  return (
    <div>
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-sidebar-bg flex flex-col h-full py-lg gap-sm z-20 hidden md:flex">
        <div className="px-lg mb-xl">
          <h1 className="font-headline-md text-headline-md font-bold text-on-secondary">Agromart</h1>
          <p className="font-label-sm text-label-sm text-on-secondary/80">Supply Chain Management</p>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-sm">
          <a className="text-on-secondary/80 hover:text-on-secondary mx-2 px-4 py-2 transition-colors flex items-center gap-md font-body-md text-body-md hover:bg-primary-container/50 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Overview</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary mx-2 px-4 py-2 transition-colors flex items-center gap-md font-body-md text-body-md hover:bg-primary-container/50 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            <span>Orders</span>
          </a>
          <a className="bg-active-highlight text-on-secondary-fixed rounded-full mx-2 px-4 py-2 font-bold flex items-center gap-md font-body-md text-body-md transition-all duration-200 active:scale-95" href="#">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span>Users</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary mx-2 px-4 py-2 transition-colors flex items-center gap-md font-body-md text-body-md hover:bg-primary-container/50 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
            <span>Roles</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary mx-2 px-4 py-2 transition-colors flex items-center gap-md font-body-md text-body-md hover:bg-primary-container/50 rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            <span>Audit History</span>
          </a>
        </div>
      </nav>
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen md:ml-[260px] overflow-hidden">
        {/* TopNavBar */}
        <header className="bg-surface dark:bg-surface-dim border-b border-outline-variant flex justify-between items-center px-xl w-full h-16 shrink-0 z-10">
          <div className="flex items-center gap-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-primary">Agromart SCM</h2>
          </div>
          <div className="flex items-center gap-lg">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">search</span>
              <input className="pl-10 pr-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-body-md font-body-md w-64" placeholder="Search..." type="text" />
            </div>
            <div className="flex items-center gap-sm text-on-surface-variant">
              <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
              </button>
              <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined" data-icon="help">help</span>
              </button>
              <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined" data-icon="settings">settings</span>
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden ml-sm border border-outline-variant cursor-pointer">
                <img className="w-full h-full object-cover" alt="User Profile" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
              </div>
            </div>
          </div>
        </header>
        {/* Main Canvas */}
        <main className="flex-1 overflow-y-auto p-xl bg-surface-cream">
          <div className="max-w-7xl mx-auto flex flex-col gap-lg">
            {/* Page Header */}
            <div className="flex justify-between items-end border-b border-outline-variant pb-md">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">User Management</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Manage system access, roles, and permissions across the supply chain network.</p>
              </div>
              <div className="flex gap-md">
                <button className="px-4 py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-primary hover:bg-surface-container-low transition-colors flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[18px]">download</span> Export
                </button>
                <button className="px-4 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-sm shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">add</span> Add User
                </button>
              </div>
            </div>
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
              {/* Users Table Card (Spans 2 columns) */}
              <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col overflow-hidden">
                <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                  <h3 className="font-headline-sm text-headline-sm text-primary">Active Users</h3>
                  <div className="flex gap-sm">
                    <span className="px-3 py-1 bg-surface-container-highest rounded-full font-label-sm text-label-sm text-on-surface-variant uppercase">All Roles</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-table-header-bg border-b border-outline-variant">
                      <tr>
                        <th className="p-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">User</th>
                        <th className="p-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Role</th>
                        <th className="p-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Status</th>
                        <th className="p-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider whitespace-nowrap">Last Login</th>
                        <th className="p-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="font-body-md text-body-md text-on-surface">
                      {/* User Row 1 */}
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                        <td className="p-md min-h-[52px]">
                          <div className="flex items-center gap-md">
                            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center font-bold font-label-md">JD</div>
                            <div>
                              <div className="font-label-md text-label-md text-primary">John Doe</div>
                              <div className="font-body-sm text-body-sm text-on-surface-variant">john.doe@agromart.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-md">System Admin</td>
                        <td className="p-md">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-label-sm text-label-sm">Active</span>
                        </td>
                        <td className="p-md text-on-surface-variant">2 mins ago</td>
                        <td className="p-md text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                        </td>
                      </tr>
                      {/* User Row 2 */}
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                        <td className="p-md min-h-[52px]">
                          <div className="flex items-center gap-md">
                            <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold font-label-md">AS</div>
                            <div>
                              <div className="font-label-md text-label-md text-primary">Alice Smith</div>
                              <div className="font-body-sm text-body-sm text-on-surface-variant">alice.smith@agromart.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-md">Warehouse Manager</td>
                        <td className="p-md">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#e6f4ea] text-[#137333] font-label-sm text-label-sm">Active</span>
                        </td>
                        <td className="p-md text-on-surface-variant">Yesterday</td>
                        <td className="p-md text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                        </td>
                      </tr>
                      {/* User Row 3 */}
                      <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                        <td className="p-md min-h-[52px]">
                          <div className="flex items-center gap-md">
                            <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold font-label-md">BJ</div>
                            <div>
                              <div className="font-label-md text-label-md text-primary">Bob Johnson</div>
                              <div className="font-body-sm text-body-sm text-on-surface-variant">bob.j@agromart.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-md">Field Auditor</td>
                        <td className="p-md">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm">Inactive</span>
                        </td>
                        <td className="p-md text-on-surface-variant">Oct 12, 2023</td>
                        <td className="p-md text-right">
                          <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">more_vert</span></button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-md border-t border-outline-variant bg-surface-container-lowest flex justify-between items-center font-body-sm text-body-sm text-on-surface-variant">
                  <span>Showing 1 to 3 of 45 users</span>
                  <div className="flex gap-xs">
                    <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-container-low">Prev</button>
                    <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-container-low">Next</button>
                  </div>
                </div>
              </div>
              {/* Roles Quick View / Stats */}
              <div className="flex flex-col gap-gutter">
                <div className="bg-primary-container text-on-primary rounded-xl p-lg relative overflow-hidden h-48 flex flex-col justify-end">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-active-highlight via-transparent to-transparent" />
                  <div className="relative z-10">
                    <h4 className="font-body-sm text-body-sm text-on-primary/80 uppercase tracking-wide mb-xs">Total Active Users</h4>
                    <div className="font-display-lg text-display-lg text-active-highlight">1,248</div>
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex-1">
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-md">Role Distribution</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                        <span>Warehouse Managers</span>
                        <span className="text-on-surface-variant">45%</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-primary-container h-2 rounded-full" style={{width: '45%'}} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                        <span>Field Auditors</span>
                        <span className="text-on-surface-variant">30%</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-surface-tint h-2 rounded-full" style={{width: '30%'}} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-sm text-label-sm mb-xs">
                        <span>System Admins</span>
                        <span className="text-on-surface-variant">5%</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-active-highlight h-2 rounded-full" style={{width: '5%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Roles & Permissions Matrix */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mt-md">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Permissions Matrix</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Define access control policies across system entities.</p>
                </div>
                <select className="border border-outline-variant rounded-lg px-3 py-2 bg-surface-container-lowest font-body-md text-body-md focus:ring-1 focus:ring-primary focus:outline-none">
                  <option>Warehouse Manager</option>
                  <option>Field Auditor</option>
                  <option>System Admin</option>
                </select>
              </div>
              <div className="overflow-x-auto p-lg">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-sm text-left font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant w-1/3">Entity</th>
                      <th className="p-sm text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant w-1/6">View</th>
                      <th className="p-sm text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant w-1/6">Create</th>
                      <th className="p-sm text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant w-1/6">Edit</th>
                      <th className="p-sm text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider border-b border-outline-variant w-1/6">Approve</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-md text-body-md text-on-surface">
                    <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-sm min-h-[52px] font-label-md text-primary">Orders</td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-outline-variant">cancel</span></td>
                    </tr>
                    <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-sm min-h-[52px] font-label-md text-primary">Farmers</td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-outline-variant">cancel</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-outline-variant">cancel</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-outline-variant">cancel</span></td>
                    </tr>
                    <tr className="border-b border-outline-variant/50 hover:bg-surface-container-low/30 transition-colors">
                      <td className="p-sm min-h-[52px] font-label-md text-primary">Inventory</td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                      <td className="p-sm text-center"><span className="material-symbols-outlined text-surface-tint">check_circle</span></td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-lg flex justify-end">
                  <button className="px-6 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
            <div className="h-xl" /> {/* Spacer */}
          </div>
        </main>
      </div>
    </div>
  );
}
