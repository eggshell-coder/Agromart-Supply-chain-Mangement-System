import Layout from "../components/Layout";

const KPI_CARDS = [
  {
    label: "Pending",
    icon: "pending_actions",
    value: "124",
    footer: (
      <div className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{" "}
        12% vs last week
      </div>
    ),
  },
  {
    label: "Preparing",
    icon: "inventory",
    iconColor: "text-[#b45309]",
    value: "86",
    footer: (
      <div className="w-full bg-surface-variant rounded-full h-1.5 mt-1">
        <div className="bg-[#b45309] h-1.5 rounded-full" style={{ width: "45%" }} />
      </div>
    ),
  },
  {
    label: "In Transit",
    icon: "local_shipping",
    iconColor: "text-[#1d4ed8]",
    value: "342",
    footer: (
      <div className="text-body-sm font-body-sm text-[#1d4ed8] bg-[#dbeafe] px-2 py-0.5 rounded inline-block w-fit mt-1">
        High Volume
      </div>
    ),
  },
  {
    label: "Delayed",
    icon: "warning",
    iconColor: "text-error",
    value: "18",
    valueColor: "text-error",
    footer: (
      <div className="text-body-sm font-body-sm text-on-surface-variant">
        Requires immediate attention
      </div>
    ),
  },
  {
    label: "Delivered",
    icon: "check_circle",
    iconColor: "text-primary-container",
    value: "892",
    footer: (
      <div className="text-body-sm font-body-sm text-on-surface-variant">
        Last 7 days
      </div>
    ),
    span: "col-span-2 md:col-span-1 lg:col-span-1",
  },
];

const STATUS_STYLES = {
  "In Transit": "bg-[#dbeafe] text-[#1e40af]",
  Delayed: "bg-[#fee2e2] text-[#b91c1c]",
  Preparing: "bg-[#fef3c7] text-[#b45309]",
  Delivered: "bg-[#dcfce7] text-[#15803d]",
};

const SHIPMENTS = [
  {
    id: "SHP-9021A",
    orderId: "ORD-4402",
    farmer: "Valley Farms Inc.",
    logistics: { truck: "TRK-882", driver: "M. Johnson" },
    route: "Sacramento → LA",
    eta: "Oct 24, 14:00",
    etaError: false,
    type: "smart_toy",
    typeTitle: "Auto-generated",
    status: "In Transit",
  },
  {
    id: "SHP-9018B",
    orderId: "ORD-4399",
    farmer: "Oak Ridge Orchards",
    logistics: { truck: "TRK-104", driver: "S. Davis" },
    route: "Fresno → SF",
    eta: "Oct 23, 09:00",
    etaError: true,
    type: "person",
    typeTitle: "Manual",
    status: "Delayed",
  },
  {
    id: "SHP-9024C",
    orderId: "ORD-4405",
    farmer: "Sunrise Co-op",
    logistics: { unassigned: true },
    route: "Salinas → Seattle",
    eta: "Oct 26, 08:00",
    etaError: false,
    type: "smart_toy",
    typeTitle: "Auto-generated",
    status: "Preparing",
  },
  {
    id: "SHP-8992A",
    orderId: "ORD-4310",
    farmer: "Golden Grain Ltd.",
    logistics: { truck: "TRK-552", driver: "R. Chen" },
    route: "Stockton → Portland",
    eta: "Oct 22, 16:30",
    etaError: false,
    type: "smart_toy",
    typeTitle: "Auto-generated",
    status: "Delivered",
  },
];

export default function ShipmentsDashboard() {
  return (
    <Layout
      activeSidebar="operations"
      activeTopTab="Shipments"
      searchPlaceholder="Search shipments..."
      createLabel="Create New Order"
    >
      <div className="flex flex-col gap-xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface font-semibold">
              Active Shipments
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-1">
              Monitor and manage all current logistics operations.
            </p>
          </div>
          <button className="bg-primary text-on-primary py-2 px-4 rounded font-label-md flex items-center gap-2 hover:bg-surface-tint transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            Create Shipment
          </button>
        </div>

        {/* KPI Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-md">
          {KPI_CARDS.map((card) => (
            <div
              key={card.label}
              className={
                "bg-surface-container-lowest border border-outline-variant p-md rounded-lg flex flex-col gap-sm " +
                (card.span || "")
              }
            >
              <div className="flex justify-between items-center">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
                  {card.label}
                </span>
                <span
                  className={
                    "material-symbols-outlined text-[18px] " +
                    (card.iconColor || "text-on-surface-variant")
                  }
                >
                  {card.icon}
                </span>
              </div>
              <span
                className={
                  "text-headline-md font-headline-md font-bold " +
                  (card.valueColor || "text-on-surface")
                }
              >
                {card.value}
              </span>
              {card.footer}
            </div>
          ))}
        </div>

        {/* Data Table Section */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col flex-grow">
          <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface">
            <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
              Shipment Manifest
            </h3>
            <div className="flex gap-2">
              <button className="p-1 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
              <button className="p-1 border border-outline-variant rounded bg-surface-container-lowest text-on-surface-variant hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant uppercase">
                  <th className="p-sm font-medium sticky left-0 bg-surface-container-low z-10">Shipment ID</th>
                  <th className="p-sm font-medium">Order ID</th>
                  <th className="p-sm font-medium">Farmer/Co-op</th>
                  <th className="p-sm font-medium">Logistics</th>
                  <th className="p-sm font-medium">Route</th>
                  <th className="p-sm font-medium">Est. Delivery</th>
                  <th className="p-sm font-medium">Type</th>
                  <th className="p-sm font-medium">Status</th>
                  <th className="p-sm font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-body-sm font-body-sm text-on-surface">
                {SHIPMENTS.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-surface-variant hover:bg-surface-container-low transition-colors h-[40px]"
                  >
                    <td className="p-sm font-mono-md sticky left-0 bg-surface-container-lowest z-10">{s.id}</td>
                    <td className="p-sm font-mono-md text-on-surface-variant">{s.orderId}</td>
                    <td className="p-sm">{s.farmer}</td>
                    <td className="p-sm">
                      <div className="flex flex-col">
                        {s.logistics.unassigned ? (
                          <span className="text-on-surface-variant italic">Pending Assignment</span>
                        ) : (
                          <>
                            <span>{s.logistics.truck}</span>
                            <span className="text-[10px] text-on-surface-variant">{s.logistics.driver}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-sm text-on-surface-variant">{s.route}</td>
                    <td className={"p-sm text-right " + (s.etaError ? "text-error font-medium" : "")}>
                      {s.eta}
                    </td>
                    <td className="p-sm">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant" title={s.typeTitle}>
                        {s.type}
                      </span>
                    </td>
                    <td className="p-sm">
                      <span className={"inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium " + STATUS_STYLES[s.status]}>
                        {s.status}
                      </span>
                    </td>
                    <td className="p-sm text-right">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-sm border-t border-outline-variant bg-surface flex justify-between items-center text-body-sm text-on-surface-variant">
            <span>Showing 1 to 4 of 468 entries</span>
            <div className="flex gap-1">
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant disabled:opacity-50">Prev</button>
              <button className="px-2 py-1 border border-outline-variant rounded bg-surface-variant">1</button>
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">2</button>
              <button className="px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant">Next</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
