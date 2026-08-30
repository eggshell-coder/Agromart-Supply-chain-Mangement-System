import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/client";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders();
        // Expect data as array of order objects
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  // Helper to render status badge based on order.status (example)
  const renderStatus = (status) => {
    const colors = {
      "IN TRANSIT": "bg-primary/10 text-primary",
      "PLACED": "bg-surface-variant text-on-surface-variant",
      "DELIVERED": "bg-primary/20 text-primary-container",
      "CANCELLED": "bg-error-container text-on-error-container",
    };
    const className = colors[status] || "bg-surface-container-low text-on-surface-variant";
    return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${className}`}>{status}</span>;
  };

  return (
    <div>
      {/* SideNavBar */}
      <aside className="fixed left-0 top-0 h-full w-[280px] flex flex-col p-md overflow-y-auto bg-surface-container-low dark:bg-surface-dim border-r border-outline-variant dark:border-outline z-50">
        <div className="flex items-center gap-sm mb-lg px-md">
          <span className="material-symbols-outlined text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed" style={{fontVariationSettings: '"FILL" 1'}}>agriculture</span>
          <div className="flex flex-col">
            <span className="text-headline-sm font-headline-sm text-primary dark:text-primary-fixed">Agromart</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">Supply Chain SCM</span>
          </div>
        </div>
        <button className="w-full bg-primary text-on-primary py-2 px-4 rounded-DEFAULT flex items-center justify-center gap-2 font-label-md text-label-md mb-lg hover:bg-surface-tint transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
          Create New Order
        </button>
        <nav className="flex-1 space-y-2">
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-[0.98] transition-transform duration-150" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-label-md font-label-md">Overview</span>
          </a>
          <a className="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-[0.98] transition-transform duration-150" href="#">
            <span className="material-symbols-outlined">conveyor_belt</span>
            <span className="text-label-md font-label-md">Operations</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-[0.98] transition-transform duration-150" href="#">
            <span className="material-symbols-outlined">database</span>
            <span className="text-label-md font-label-md">Master Data</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-[0.98] transition-transform duration-150" href="#">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="text-label-md font-label-md">Monitoring</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors active:scale-[0.98] transition-transform duration-150" href="#">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="text-label-md font-label-md">Administration</span>
          </a>
        </nav>
        <div className="mt-auto pt-lg border-t border-outline-variant/30 space-y-2">
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm transition-colors" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-label-md font-label-md">Settings</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant hover:bg-surface-container-highest rounded-lg px-md py-sm transition-colors" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="text-label-md font-label-md">Support</span>
          </a>
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 ml-[280px] w-[calc(100%-280px)] min-h-screen flex flex-col relative">
        {/* TopAppBar */}
        <header className="docked full-width top-0 sticky z-40 bg-surface dark:bg-background border-b border-outline-variant dark:border-outline flex justify-between items-center h-16 px-xl w-full">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input className="w-full pl-10 pr-4 py-1.5 bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Search orders, farmers, SKUs..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-md">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-lowest dark:hover:bg-surface-variant rounded-full transition-all cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-lowest dark:hover:bg-surface-variant rounded-full transition-all cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-lowest dark:hover:bg-surface-variant rounded-full transition-all cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-surface-variant border border-outline-variant ml-2 overflow-hidden flex-shrink-0">
              <img alt="User Profile" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Page Content */}
        <div className="p-margin-desktop flex-1">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-lg">
            <div>
              <h1 className="text-headline-lg font-headline-lg text-on-background m-0">Orders</h1>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">Manage and track inbound and outbound agricultural shipments.</p>
            </div>
            <div className="flex gap-md">
              <button className="bg-surface-container-lowest border border-outline-variant text-on-background py-2 px-4 rounded-DEFAULT flex items-center gap-2 text-label-md font-label-md hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
                Filter
              </button>
              <button className="bg-surface-container-lowest border border-outline-variant text-on-background py-2 px-4 rounded-DEFAULT flex items-center gap-2 text-label-md font-label-md hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-sm">download</span>
                Export
              </button>
              <button className="bg-primary text-on-primary py-2 px-4 rounded-DEFAULT flex items-center gap-2 text-label-md font-label-md hover:bg-surface-tint transition-colors">
                <span className="material-symbols-outlined text-sm">add</span>
                Create Order
              </button>
            </div>
          </div>
          {/* Data Card */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm flex flex-col">
            {/* Tabs */}
            <div className="border-b border-outline-variant px-md flex gap-lg overflow-x-auto">
              <button className="py-3 text-label-md font-label-md text-primary font-bold border-b-2 border-primary whitespace-nowrap">All Orders</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">Placed</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">Confirmed</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">In Transit</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">Delivered</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">Partially Delivered</button>
              <button className="py-3 text-label-md font-label-md text-on-surface-variant hover:text-on-surface whitespace-nowrap">Cancelled</button>
            </div>
            {/* Filters Bar */}
            <div className="p-md bg-surface border-b border-outline-variant flex gap-md items-end">
              <div className="flex-1">
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wide">Farmer / Supplier</label>
                <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-md font-body-md py-1.5 px-3 focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>All Suppliers</option>
                  <option>Valley Farms</option>
                  <option>Green Acres</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wide">Date Range</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-md font-body-md py-1.5 px-3 focus:ring-2 focus:ring-primary focus:border-transparent" type="date" />
              </div>
              <div className="flex-1">
                <label className="block text-label-sm font-label-sm text-on-surface-variant mb-1 uppercase tracking-wide">Product / SKU</label>
                <input className="w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT text-body-md font-body-md py-1.5 px-3 focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="e.g. Soybeans" type="text" />
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                    <td className="px-md py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-surface-variant text-on-surface-variant">PLACED</span>
                    </td>
                    <td className="px-md py-2 text-right">
                      <button className="text-secondary hover:text-primary transition-colors text-xs font-semibold mr-3">VIEW</button>
                      <button className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">EDIT</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest/50 transition-colors h-10">
                    <td className="px-md py-2 font-mono-md text-mono-md">#ORD-9023C</td>
                    <td className="px-md py-2">Midwest Grains Ltd.</td>
                    <td className="px-md py-2 text-on-surface-variant">Soybeans (Grade A)</td>
                    <td className="px-md py-2 text-right font-mono-md">5,000 MT</td>
                    <td className="px-md py-2 text-right font-mono-md">$85,000</td>
                    <td className="px-md py-2 text-on-surface-variant">2023-10-21</td>
                    <td className="px-md py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-primary/20 text-primary-container">DELIVERED</span>
                    </td>
                    <td className="px-md py-2 text-right">
                      <button className="text-secondary hover:text-primary transition-colors text-xs font-semibold mr-3">VIEW</button>
                      <button className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">EDIT</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-lowest/50 transition-colors h-10">
                    <td className="px-md py-2 font-mono-md text-mono-md">#ORD-9024D</td>
                    <td className="px-md py-2">Highland Dairy</td>
                    <td className="px-md py-2 text-on-surface-variant">Raw Milk (Tanker)</td>
                    <td className="px-md py-2 text-right font-mono-md">2,500 Gal</td>
                    <td className="px-md py-2 text-right font-mono-md">$4,100</td>
                    <td className="px-md py-2 text-on-surface-variant">2023-10-20</td>
                    <td className="px-md py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-error-container text-on-error-container">CANCELLED</span>
                    </td>
                    <td className="px-md py-2 text-right">
                      <button className="text-secondary hover:text-primary transition-colors text-xs font-semibold mr-3">VIEW</button>
                      <button className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold">EDIT</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Pagination Footer */}
            <div className="bg-surface px-md py-3 border-t border-outline-variant flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <div>Showing 1 to 4 of 124 entries</div>
              <div className="flex gap-1">
                <button className="px-2 py-1 border border-outline-variant rounded bg-surface-container-lowest hover:bg-surface disabled:opacity-50" disabled>Prev</button>
                <button className="px-2 py-1 border border-primary bg-primary text-on-primary rounded">1</button>
                <button className="px-2 py-1 border border-outline-variant rounded bg-surface-container-lowest hover:bg-surface">2</button>
                <button className="px-2 py-1 border border-outline-variant rounded bg-surface-container-lowest hover:bg-surface">3</button>
                <button className="px-2 py-1 border border-outline-variant rounded bg-surface-container-lowest hover:bg-surface">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
