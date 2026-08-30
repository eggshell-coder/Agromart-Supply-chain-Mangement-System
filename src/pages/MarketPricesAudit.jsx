export default function MarketPricesAudit() {
  return (
    <div>
      {/* Side Navigation Shell */}
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-sidebar-bg flex flex-col py-lg gap-sm z-50 overflow-y-auto">
        <div className="px-xl mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">eco</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-secondary">Agromart</h1>
            <p className="font-body-sm text-body-sm text-on-secondary/70">Supply Chain Management</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-2">
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span><span>Overview</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">shopping_cart</span><span>Orders</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">local_shipping</span><span>Shipments</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">inventory_2</span><span>Inventory</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">swap_horiz</span><span>Transfers</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">agriculture</span><span>Farmers</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">category</span><span>Products</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">warehouse</span><span>Warehouses</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">local_shipping</span><span>Vehicles</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">delete_sweep</span><span>Spoilage</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">cloud</span><span>Weather</span>
          </a>
          <a className="flex items-center gap-3 bg-active-highlight text-on-secondary-fixed rounded-full mx-2 px-4 py-2 font-bold transition-all duration-200 active:scale-95" href="#">
            <span className="material-symbols-outlined filled">monetization_on</span><span>Price Audit</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">verified</span><span>Provenance</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">notifications</span><span>Notifications</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">group</span><span>Users</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">manage_accounts</span><span>Roles</span>
          </a>
          <a className="flex items-center gap-3 text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 rounded-lg" href="#">
            <span className="material-symbols-outlined">history</span><span>Audit History</span>
          </a>
        </div>
      </nav>
      {/* Main Content Wrapper */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen bg-surface">
        <header className="bg-surface dark:bg-surface-dim border-b border-outline-variant h-16 flex justify-between items-center px-xl w-full z-40 sticky top-0 shrink-0">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full font-body-sm text-body-sm focus:outline-none focus:border-primary transition-colors" placeholder="Search markets, products..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined">help</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors cursor-pointer active:opacity-80">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Market Prices &amp; Price Audit</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Monitor real-time commodity pricing and review historical audit logs.</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-outline bg-surface text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container/90 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Manual Price Update
              </button>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-gutter">
            <div className="col-span-12 xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[700px]">
              <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-white shrink-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Current Market Prices</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-surface-container-low rounded-full font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-container" /> Live Updates
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-table-header-bg sticky top-0 z-10 border-b border-outline-variant">
                    <tr>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Product</th>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Market</th>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Current Price (USD/kg)</th>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Previous Price</th>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Trend</th>
                      <th className="py-4 px-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 bg-white">
                    <tr className="hover:bg-surface-bright transition-colors group h-[52px]">
                      <td className="py-3 px-md font-body-md text-on-surface font-medium">Arabica Coffee Beans</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant">Nairobi Exchange</td>
                      <td className="py-3 px-md font-body-md text-on-surface text-right font-semibold">$4.85</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant text-right">$4.72</td>
                      <td className="py-3 px-md">
                        <div className="flex items-center gap-1 text-[#166534] bg-[#dcfce7] px-2 py-1 rounded-full w-fit">
                          <span className="material-symbols-outlined text-[16px]">trending_up</span>
                          <span className="font-label-sm text-label-sm">+2.7%</span>
                        </div>
                      </td>
                      <td className="py-3 px-md font-body-sm text-on-surface-variant">10 mins ago</td>
                    </tr>
                    <tr className="hover:bg-surface-bright transition-colors group h-[52px]">
                      <td className="py-3 px-md font-body-md text-on-surface font-medium">Cocoa - Grade A</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant">Accra Terminal</td>
                      <td className="py-3 px-md font-body-md text-on-surface text-right font-semibold">$3.10</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant text-right">$3.15</td>
                      <td className="py-3 px-md">
                        <div className="flex items-center gap-1 text-[#991b1b] bg-[#fee2e2] px-2 py-1 rounded-full w-fit">
                          <span className="material-symbols-outlined text-[16px]">trending_down</span>
                          <span className="font-label-sm text-label-sm">-1.5%</span>
                        </div>
                      </td>
                      <td className="py-3 px-md font-body-sm text-on-surface-variant">1 hour ago</td>
                    </tr>
                    <tr className="hover:bg-surface-bright transition-colors group h-[52px]">
                      <td className="py-3 px-md font-body-md text-on-surface font-medium">Soybeans (Bulk)</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant">Chicago Board</td>
                      <td className="py-3 px-md font-body-md text-on-surface text-right font-semibold">$0.58</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant text-right">$0.58</td>
                      <td className="py-3 px-md">
                        <div className="flex items-center gap-1 text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-full w-fit">
                          <span className="material-symbols-outlined text-[16px]">horizontal_rule</span>
                          <span className="font-label-sm text-label-sm">0.0%</span>
                        </div>
                      </td>
                      <td className="py-3 px-md font-body-sm text-on-surface-variant">3 hours ago</td>
                    </tr>
                    <tr className="hover:bg-surface-bright transition-colors group h-[52px]">
                      <td className="py-3 px-md font-body-md text-on-surface font-medium">Robusta Coffee</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant">London ICE</td>
                      <td className="py-3 px-md font-body-md text-on-surface text-right font-semibold">$2.45</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant text-right">$2.20</td>
                      <td className="py-3 px-md">
                        <div className="flex items-center gap-1 text-[#166534] bg-[#dcfce7] px-2 py-1 rounded-full w-fit">
                          <span className="material-symbols-outlined text-[16px]">trending_up</span>
                          <span className="font-label-sm text-label-sm">+11.3%</span>
                        </div>
                      </td>
                      <td className="py-3 px-md font-body-sm text-on-surface-variant">Yesterday</td>
                    </tr>
                    <tr className="hover:bg-surface-bright transition-colors group h-[52px]">
                      <td className="py-3 px-md font-body-md text-on-surface font-medium">Wheat - Hard Red</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant">Kansas City</td>
                      <td className="py-3 px-md font-body-md text-on-surface text-right font-semibold">$0.28</td>
                      <td className="py-3 px-md font-body-md text-on-surface-variant text-right">$0.29</td>
                      <td className="py-3 px-md">
                        <div className="flex items-center gap-1 text-[#991b1b] bg-[#fee2e2] px-2 py-1 rounded-full w-fit">
                          <span className="material-symbols-outlined text-[16px]">trending_down</span>
                          <span className="font-label-sm text-label-sm">-3.4%</span>
                        </div>
                      </td>
                      <td className="py-3 px-md font-body-sm text-on-surface-variant">2 days ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-md border-t border-outline-variant bg-surface-bright flex justify-between items-center shrink-0">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Showing 5 of 124 commodities</span>
                <div className="flex gap-1">
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low disabled:opacity-50"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
                  <button className="p-1 border border-outline-variant rounded hover:bg-surface-container-low"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
                </div>
              </div>
            </div>
            {/* Right Side Stack */}
            <div className="col-span-12 xl:col-span-4 flex flex-col gap-gutter h-[700px]">
              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-md text-label-md text-on-surface-variant">Avg Volatility</span>
                    <span className="material-symbols-outlined text-secondary-container">show_chart</span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface mb-1">4.2%</h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Across tracked markets</span>
                  </div>
                </div>
                <div className="bg-primary-container text-on-primary rounded-xl p-md flex flex-col justify-between shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent" />
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className="font-label-md text-label-md text-on-primary/80">Pending Audits</span>
                    <span className="material-symbols-outlined text-active-highlight">fact_check</span>
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-headline-md text-headline-md text-on-primary mb-1">12</h4>
                    <span className="font-body-sm text-body-sm text-on-primary/80">Require authorization</span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col flex-1 overflow-hidden">
                <div className="p-lg border-b border-outline-variant bg-white shrink-0 flex justify-between items-center">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Price Audits</h3>
                  <button className="text-primary font-label-md text-label-md hover:underline">View All</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-bright">
                  <div className="flex gap-4 p-3 bg-white border border-outline-variant/50 rounded-lg hover:border-outline-variant transition-colors">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">edit_note</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-body-md text-body-md font-medium text-on-surface">Manual Override</p>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">14:32</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Arabica Beans - Nairobi Exchange updated from $4.72 to $4.85.</p>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-outline-variant">
                          <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Authorized by S. Jenkins</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-white border border-outline-variant/50 rounded-lg hover:border-outline-variant transition-colors">
                    <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-on-surface-variant">sync</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-body-md text-body-md font-medium text-on-surface">API Sync - Chicago Board</p>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">11:00</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Automated daily price fetch completed. 15 items updated.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 bg-white border border-outline-variant/50 rounded-lg hover:border-outline-variant transition-colors">
                    <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-error">warning</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-body-md text-body-md font-medium text-on-surface">Anomaly Detected</p>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">Robusta Coffee spiked &gt;10%. Pending manual verification.</p>
                      <button className="font-label-sm text-label-sm text-active-highlight bg-active-highlight/10 px-2 py-1 rounded">Review Needed</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
