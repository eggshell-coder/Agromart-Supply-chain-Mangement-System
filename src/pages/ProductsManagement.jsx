export default function ProductsManagement() {
  const navItems = [
    { icon: "dashboard", label: "Overview" },
    { icon: "shopping_cart", label: "Orders" },
    { icon: "local_shipping", label: "Shipments" },
    { icon: "inventory_2", label: "Inventory" },
    { icon: "swap_horiz", label: "Transfers" },
    { icon: "agriculture", label: "Farmers" },
    { icon: "category", label: "Products", active: true, fill: true },
    { icon: "warehouse", label: "Warehouses" },
    { icon: "local_shipping", label: "Vehicles" },
    { icon: "delete_forever", label: "Spoilage" },
    { icon: "cloud", label: "Weather" },
    { icon: "request_quote", label: "Price Audit" },
    { icon: "verified", label: "Provenance" },
    { icon: "notifications", label: "Notifications" },
    { icon: "group", label: "Users" },
    { icon: "manage_accounts", label: "Roles" },
    { icon: "history", label: "Audit History" },
    { icon: "settings", label: "Settings" },
  ];

  const products = [
    { name: "Premium Hard Red Winter Wheat", sku: "WHT-HRW-01", category: "Grains", stock: "24,500", unit: "Bushels", price: "$8.45", lowStock: null },
    { name: "Organic Soybeans", sku: "SOY-ORG-03", category: "Grains", stock: "1,200", unit: "Bushels", price: "$15.20", lowStock: "Low Stock" },
    { name: "Nitrogen Fertilizer (Urea)", sku: "FRT-N-UR-99", category: "Fertilizers", stock: "8,500", unit: "Tons", price: "$450.00", lowStock: null },
    { name: "Yellow Dent Corn", sku: "CRN-YEL-01", category: "Grains", stock: "45,000", unit: "Bushels", price: "$6.80", lowStock: null },
    { name: "Alfalfa Hay Bales", sku: "HAY-ALF-B2", category: "Feed", stock: "150", unit: "Tons", price: "$285.00", lowStock: "Critical" },
  ];

  const filters = ["All Categories", "Grains", "Produce", "Livestock", "Fertilizers"];

  return (
    <div className="flex bg-background min-h-screen font-body-md">
      {/* SideNavBar */}
      <nav className="w-[260px] h-screen fixed left-0 top-0 bg-[#022c16] flex flex-col py-lg z-50">
        <div className="px-6 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-fixed rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-[#022c16]" style={{ fontVariationSettings: "'FILL' 1" }}>
              agriculture
            </span>
          </div>
          <div>
            <h1 className="text-headline-md font-headline-md text-on-primary font-bold">AgroMart</h1>
            <p className="text-body-sm font-body-sm text-on-primary/70">Supply Chain Management</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={
                "font-label-md px-4 py-2 mx-2 flex items-center gap-3 rounded-full transition-colors " +
                (item.active
                  ? "bg-active-highlight text-primary scale-95 transition-transform"
                  : "text-on-primary/80 hover:bg-on-primary/10")
              }
            >
              <span className="material-symbols-outlined" style={item.fill ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col h-screen overflow-hidden">
        {/* TopAppBar */}
        <header className="flex justify-between items-center h-16 px-xl bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-40">
          <div className="flex items-center w-1/3">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                type="text"
                placeholder="Search across products, orders, and shipments..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-body-md font-body-md text-on-surface focus:ring-2 focus:ring-primary-container transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 text-primary font-label-md text-label-md">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 border border-outline-variant cursor-pointer">
              <img
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt=""
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-xl">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-headline-lg font-headline-lg text-on-surface">Products</h2>
              <p className="text-body-md font-body-md text-on-surface-variant mt-1">
                Manage and track your agricultural inventory.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 border border-outline text-on-surface font-label-md text-label-md rounded flex items-center gap-2 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export
              </button>
              <button className="px-4 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded flex items-center gap-2 hover:bg-[#005226] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Product
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md mb-6 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              {filters.map((f, i) => (
                <button
                  key={f}
                  className={
                    "px-4 py-1.5 font-label-sm text-label-sm rounded-full border transition-colors " +
                    (i === 0
                      ? "bg-surface-container-high text-on-surface border-transparent"
                      : "bg-transparent text-on-surface-variant border-outline-variant hover:bg-surface-container-low")
                  }
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                filter_list
              </span>
              <select className="w-full pl-10 pr-4 py-1.5 bg-surface-container-low border-none rounded text-body-md font-body-md text-on-surface focus:ring-0 cursor-pointer appearance-none">
                <option>Sort by: Stock (Low to High)</option>
                <option>Sort by: Name (A-Z)</option>
                <option>Sort by: Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#f9f9f9] border-b border-outline-variant">
                <tr>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Product Name</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">SKU</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Current Stock</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-right">Price / Unit</th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-md font-body-md text-on-surface">
                {products.map((p) => (
                  <tr
                    key={p.sku}
                    className={
                      "border-b border-[#F1F1F1] transition-colors " +
                      (p.lowStock ? "bg-error-container/20 hover:bg-error-container/30" : "hover:bg-surface-container-low/50")
                    }
                  >
                    <td className="py-4 px-4 font-label-md flex items-center gap-2">
                      {p.name}
                      {p.lowStock && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px]">
                          <span className="material-symbols-outlined text-[12px]">warning</span>
                          {p.lowStock}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant font-mono text-sm">{p.sku}</td>
                    <td className="py-4 px-4">{p.category}</td>
                    <td className={"py-4 px-4 text-right " + (p.lowStock ? "text-error font-bold" : "")}>
                      {p.stock} <span className="text-on-surface-variant text-xs font-normal">{p.unit}</span>
                    </td>
                    <td className="py-4 px-4 text-right font-label-md">{p.price}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
            <div className="bg-surface-container-lowest border-t border-outline-variant py-3 px-4 flex items-center justify-between">
              <p className="text-body-sm text-on-surface-variant">Showing 1 to 5 of 124 products</p>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-1 rounded text-on-surface hover:bg-surface-container-low">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
