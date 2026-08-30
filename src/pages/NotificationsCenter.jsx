import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function NotificationsCenter() {
  return (
    <div className="bg-background text-on-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-sidebar-width relative">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-xl bg-background">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-end mb-xl border-b border-outline-variant pb-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
                  Notifications Center
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                  You have 3 unread alerts across your supply chain operations.
                </p>
              </div>
              <div className="flex gap-md">
                <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors">
                  Mark all as read
                </button>
                <button className="px-4 py-2 border border-outline-variant rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                  Filter
                </button>
              </div>
            </div>
            <div className="flex gap-sm mb-lg">
              <button className="px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md border border-primary-container">
                All
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors">
                Orders
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors">
                Shipments
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors">
                Inventory
              </button>
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md border border-outline-variant hover:bg-surface-container-low transition-colors">
                System
              </button>
            </div>
            <div className="flex flex-col gap-md">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col md:flex-row gap-lg items-start relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-active-highlight"></div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-label-sm text-label-sm text-secondary uppercase">Shipment Alert</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">10 mins ago</span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-active-highlight" title="Unread"></span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                    Transit Delay: Route SH-882 (Midwest Corridor)
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    Severe weather conditions have caused a 4-hour delay for vehicle fleet carrying perishable goods (SKU-ORG-01). Internal temperature sensors remain nominal. ETA updated to 18:00 EST.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-sm shrink-0 md:w-48 mt-md md:mt-0">
                  <button className="w-full px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-primary transition-colors text-center">
                    Re-route Fleet
                  </button>
                  <button className="w-full px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors text-center">
                    View Details
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col md:flex-row gap-lg items-start relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-active-highlight"></div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-label-sm text-label-sm text-primary-container uppercase">Order Received</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">1 hour ago</span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-active-highlight" title="Unread"></span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                    Bulk Order #4092 Confirmed
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    New order received from Central Farms Cooperative for 5,000 units of Premium Winter Wheat Seed. Awaiting warehouse allocation and shipment scheduling.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-sm shrink-0 md:w-48 mt-md md:mt-0">
                  <button className="w-full px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors text-center">
                    Allocate Stock
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col md:flex-row gap-lg items-start relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-active-highlight"></div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-error-container/40 flex items-center justify-center text-on-error-container">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-label-sm text-label-sm text-on-error-container uppercase">Inventory Alert</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">2 hours ago</span>
                    <span className="ml-auto w-2 h-2 rounded-full bg-active-highlight" title="Unread"></span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                    Low Stock Threshold Reached: Organic Fertilizer Blend A
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    Warehouse Alpha is reporting inventory levels below 15% capacity for SKU-FERT-ORG-A. Recommend initiating replenishment transfer immediately to avoid fulfillment delays.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-sm shrink-0 md:w-48 mt-md md:mt-0">
                  <button className="w-full px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded hover:bg-primary transition-colors text-center">
                    Issue PO
                  </button>
                  <button className="w-full px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors text-center">
                    View Inventory
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col md:flex-row gap-lg items-start opacity-75 hover:opacity-100 transition-opacity">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">System Update</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Yesterday, 14:30</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                    Platform Maintenance Scheduled
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    Routine database optimization and provenance ledger sync will occur on Sunday at 02:00 AM EST. Expected downtime is approximately 45 minutes. Core APIs will remain in read-only mode.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-sm shrink-0 md:w-48 mt-md md:mt-0">
                  <button className="w-full px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors text-center">
                    Dismiss
                  </button>
                </div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col md:flex-row gap-lg items-start opacity-75 hover:opacity-100 transition-opacity">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Shipment Delivered</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Yesterday, 09:15</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-sm">
                    Consignment DL-9921 Delivered successfully
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
                    Delivery confirmed at Northern Silo Complex. IoT environmental logs during transit have been verified and attached to the audit history. No spoilage reported.
                  </p>
                </div>
                <div className="flex flex-row md:flex-col gap-sm shrink-0 md:w-48 mt-md md:mt-0">
                  <button className="w-full px-4 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors text-center">
                    View Logs
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-xl flex justify-center pb-xl">
              <button className="px-6 py-2 border border-outline-variant text-on-surface font-label-md text-label-md rounded-full hover:bg-surface-container-low transition-colors flex items-center gap-sm">
                Load More Notifications
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
