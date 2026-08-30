export default function ProductProvenance() {
  return (
    <div>
      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full w-sidebar-width bg-sidebar-bg flex flex-col py-lg gap-sm z-50">
        <div className="px-lg mb-md flex items-center gap-sm">
          <div className="w-10 h-10 bg-active-highlight rounded-full flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-primary-container" data-icon="agriculture">agriculture</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-secondary">Agromart</h1>
            <p className="font-body-sm text-body-sm text-on-secondary/80">Supply Chain Management</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-sm scrollbar-hide">
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span className="font-label-md text-label-md">Overview</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            <span className="font-label-md text-label-md">Orders</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            <span className="font-label-md text-label-md">Shipments</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span className="font-label-md text-label-md">Inventory</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
            <span className="font-label-md text-label-md">Transfers</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="agriculture">agriculture</span>
            <span className="font-label-md text-label-md">Farmers</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="category">category</span>
            <span className="font-label-md text-label-md">Products</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="warehouse">warehouse</span>
            <span className="font-label-md text-label-md">Warehouses</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="local_shipping">local_shipping</span>
            <span className="font-label-md text-label-md">Vehicles</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="delete_sweep">delete_sweep</span>
            <span className="font-label-md text-label-md">Spoilage</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="cloud">cloud</span>
            <span className="font-label-md text-label-md">Weather</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="monetization_on">monetization_on</span>
            <span className="font-label-md text-label-md">Price Audit</span>
          </a>
          <a className="bg-active-highlight text-on-secondary-fixed rounded-full mx-2 px-4 py-2 font-bold transition-all duration-200 active:scale-95 flex items-center gap-md" href="#">
            <span className="material-symbols-outlined" data-icon="verified" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
            <span className="font-label-md text-label-md">Provenance</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            <span className="font-label-md text-label-md">Notifications</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="group">group</span>
            <span className="font-label-md text-label-md">Users</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="manage_accounts">manage_accounts</span>
            <span className="font-label-md text-label-md">Roles</span>
          </a>
          <a className="text-on-secondary/80 hover:text-on-secondary hover:bg-primary-container/50 mx-2 px-4 py-2 transition-colors transition-all duration-200 active:scale-95 flex items-center gap-md rounded-lg" href="#">
            <span className="material-symbols-outlined" data-icon="history">history</span>
            <span className="font-label-md text-label-md">Audit History</span>
          </a>
        </div>
      </nav>
      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen">
        {/* TopNavBar */}
        <header className="bg-surface dark:bg-surface-dim fixed top-0 right-0 w-[calc(100%-260px)] h-16 border-b border-outline-variant flex justify-between items-center px-xl w-full z-40">
          <div className="flex items-center gap-lg w-1/3">
            <div className="font-headline-sm text-headline-sm font-bold text-primary">Agromart SCM</div>
          </div>
          <div className="flex-1 flex justify-center w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" data-icon="search">search</span>
              <input className="w-full pl-10 pr-4 py-2 rounded-full border border-outline-variant bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container font-body-md text-body-md" placeholder="Search by Product or Order ID..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-md justify-end w-1/3">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined" data-icon="help">help</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant cursor-pointer active:opacity-80">
              <span className="material-symbols-outlined" data-icon="settings">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-container overflow-hidden ml-2 cursor-pointer border border-outline-variant">
              <img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
            </div>
          </div>
        </header>
        {/* Canvas */}
        <main className="flex-1 overflow-y-auto mt-16 p-xl bg-background">
          <div className="max-w-7xl mx-auto space-y-lg">
            {/* Page Header */}
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">Provenance Tracking</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Track the complete lifecycle of product batch #PRD-8472-A</p>
              </div>
              <div className="flex gap-md">
                <button className="px-4 py-2 border border-outline-variant text-primary rounded-lg hover:bg-surface-container-low transition-colors font-label-md text-label-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-sm" data-icon="download">download</span>
                  Export Report
                </button>
              </div>
            </div>
            {/* Bento Grid Layout for Details */}
            <div className="grid grid-cols-12 gap-lg">
              {/* Product Info Card */}
              <div className="col-span-12 md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-lg bg-surface-container-low overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-primary">eco</span>
                  </div>
                  <span className="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full font-label-sm text-label-sm uppercase">Verified Authentic</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Premium Hass Avocados</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Batch ID: PRD-8472-A</p>
                </div>
                <div className="grid grid-cols-2 gap-sm mt-auto">
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase">Quantity</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">2.5 Tons</p>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase">Harvest Date</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">Oct 12, 2023</p>
                  </div>
                </div>
              </div>
              {/* Current Status Map Card */}
              <div className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80")'}} />
                <div className="relative z-10 flex justify-between items-start mb-auto">
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary">Current Location</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">Central Distribution Hub, Regional Center</p>
                  </div>
                  <div className="bg-surface-container-lowest/90 backdrop-blur border border-outline-variant px-4 py-2 rounded-lg flex items-center gap-md">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-active-highlight opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-active-highlight" />
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">In Transit to Delivery</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Timeline / Flowchart */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-xl">Lifecycle Timeline</h3>
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[39px] top-8 bottom-8 w-0.5 bg-outline-variant" />
                <div className="space-y-xl">
                  {/* Farmer Stage */}
                  <div className="relative flex gap-lg">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary" data-icon="agriculture">agriculture</span>
                      </div>
                      <div className="w-0.5 h-full bg-primary-container mt-2 absolute top-12 left-[39px]" />
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-primary">Farm Origination</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Oct 12, 08:30 AM</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Harvested and registered on blockchain ledger by Finca Los Pinos.</p>
                      <div className="flex gap-md">
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant">Farmer: Finca Los Pinos</span>
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant">Cert: Organic MX-489</span>
                      </div>
                    </div>
                  </div>
                  {/* Order Stage */}
                  <div className="relative flex gap-lg">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary" data-icon="receipt_long">receipt_long</span>
                      </div>
                      <div className="w-0.5 h-full bg-primary-container mt-2 absolute top-12 left-[39px]" />
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-primary">Order Processing</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Oct 13, 11:15 AM</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Purchase order PO-9921 approved by regional distributor.</p>
                      <div className="flex gap-md">
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant">Order ID: PO-9921</span>
                      </div>
                    </div>
                  </div>
                  {/* Shipment Stage */}
                  <div className="relative flex gap-lg">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary" data-icon="local_shipping">local_shipping</span>
                      </div>
                      <div className="w-0.5 h-full bg-primary-container mt-2 absolute top-12 left-[39px]" />
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-primary">Initial Shipment</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Oct 14, 06:00 AM</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Dispatched via refrigerated transport. Temperature logged at 4°C.</p>
                      <div className="flex gap-md">
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]" data-icon="thermostat">thermostat</span> 4°C Avg</span>
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant">Carrier: AgriLogistics Ltd.</span>
                      </div>
                    </div>
                  </div>
                  {/* Warehouse Stage */}
                  <div className="relative flex gap-lg">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-primary-container text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary" data-icon="warehouse">warehouse</span>
                      </div>
                      <div className="w-0.5 h-full bg-outline-variant mt-2 absolute top-12 left-[39px]" />
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-primary">Warehouse Receiving</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Oct 15, 14:30 PM</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Received at Central Distribution Hub. Quality check passed.</p>
                      <div className="flex gap-md">
                        <span className="bg-primary-fixed px-2 py-1 rounded text-body-sm font-body-sm text-on-primary-fixed-variant">QC Passed</span>
                        <span className="bg-surface-container-low px-2 py-1 rounded text-body-sm font-body-sm border border-outline-variant">Location: Zone B, Rack 4</span>
                      </div>
                    </div>
                  </div>
                  {/* Transfer Stage */}
                  <div className="relative flex gap-lg opacity-60">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant">
                        <span className="material-symbols-outlined" data-icon="swap_horiz">swap_horiz</span>
                      </div>
                      <div className="w-0.5 h-full bg-outline-variant mt-2 absolute top-12 left-[39px] border-dashed border-l border-outline-variant bg-transparent" />
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant border-dashed">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface-variant">Last Mile Transfer</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Pending</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Scheduled transfer to local fulfillment center.</p>
                    </div>
                  </div>
                  {/* Delivery Stage */}
                  <div className="relative flex gap-lg opacity-60">
                    <div className="w-20 flex flex-col items-center z-10">
                      <div className="w-12 h-12 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center border border-outline-variant">
                        <span className="material-symbols-outlined" data-icon="task_alt">task_alt</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-surface py-md px-lg rounded-lg border border-outline-variant border-dashed">
                      <div className="flex justify-between items-start mb-sm">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface-variant">Final Delivery</h4>
                        <span className="font-label-sm text-label-sm text-outline uppercase">Pending</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-md">Delivery to final retail destination.</p>
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
