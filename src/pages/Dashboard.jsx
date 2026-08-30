import Layout from '../components/Layout'

const kpiCards = [
  { label: 'Total Orders', value: '1,248', icon: 'receipt_long', iconColor: 'text-primary', trend: '12%', trendColor: 'text-primary' },
  { label: 'Pending Orders', value: '45', icon: 'hourglass_empty', iconColor: 'text-warning', trend: '4%', trendColor: 'text-error' },
  { label: 'Active Shipments', value: '82', icon: 'local_shipping', iconColor: 'text-secondary' },
  { label: 'Delivered', value: '1,121', icon: 'check_circle', iconColor: 'text-primary' },
]

const recentOrders = [
  { id: '#ORD-9021', farmer: 'John Doe Farms', products: 'Organic Wheat, Soybeans', amount: '$4,250.00', status: 'Delivered', statusClass: 'bg-primary-container/10 text-primary-container' },
  { id: '#ORD-9022', farmer: 'Valley Produce', products: 'Tomatoes (A-Grade)', amount: '$1,120.50', status: 'In Transit', statusClass: 'bg-warning/10 text-warning' },
  { id: '#ORD-9023', farmer: 'Green Acres', products: 'Corn Seed, Fertilizer', amount: '$8,900.00', status: 'Placed', statusClass: 'bg-surface-variant text-on-surface-variant' },
  { id: '#ORD-9024', farmer: 'Sunrise Co-op', products: 'Apples (Gala)', amount: '$2,340.00', status: 'In Transit', statusClass: 'bg-warning/10 text-warning' },
]

const activeShipments = [
  { id: 'SHP-44A', vehicle: 'Truck 12 (Refrigerated)', warehouse: 'WH-North', eta: 'Today, 14:00', status: 'On Time', statusColor: 'text-primary' },
  { id: 'SHP-45B', vehicle: 'Truck 08 (Standard)', warehouse: 'WH-East', eta: 'Tomorrow, 09:00', status: 'Delayed', statusColor: 'text-warning' },
]

const activity = [
  { icon: 'check_circle', iconColor: 'text-primary', text: 'Order #ORD-9021 delivered successfully.', time: '10 mins ago' },
  { icon: 'warning', iconColor: 'text-warning', text: 'Low stock alert: Fertilizer Type A.', time: '1 hour ago' },
]

export default function Dashboard() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-xl gap-md">
        <div>
          <h2 className="text-headline-lg text-on-surface mb-xs">Good morning, Admin</h2>
          <p className="text-body-md text-on-surface-variant">Operational overview for today.</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="relative">
            <select className="appearance-none bg-surface-container-lowest border border-outline-variant text-body-md rounded py-sm pl-sm pr-xl focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
            <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">
              calendar_month
            </span>
          </div>
          <button className="bg-surface-container-lowest border border-outline-variant text-on-surface rounded py-sm px-md flex items-center gap-xs font-label-md hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[18px]">download</span> Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
        {kpiCards.map((card) => (
          <div key={card.label} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex flex-col justify-between h-[100px]">
            <div className="flex justify-between items-start">
              <span className="text-label-md text-on-surface-variant">{card.label}</span>
              <span className={`material-symbols-outlined text-[20px] ${card.iconColor}`}>{card.icon}</span>
            </div>
            <div className="flex items-end gap-sm">
              <span className="text-headline-md">{card.value}</span>
              {card.trend && (
                <span className={`text-label-sm flex items-center ${card.trendColor}`}>
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> {card.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
        {/* Order Overview Chart */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex flex-col min-h-[300px]">
          <div className="border-b border-outline-variant pb-sm mb-md flex justify-between items-center">
            <h3 className="text-headline-sm">Order Overview</h3>
            <button className="text-on-surface-variant">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center relative">
            <div className="w-48 h-48 rounded-full border-[16px] border-surface-container-highest relative flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border-[16px] border-primary"
                style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%, 50% 50%)' }}
              />
              <div
                className="absolute inset-0 rounded-full border-[16px] border-warning"
                style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%, 50% 50%)' }}
              />
              <div className="text-center">
                <span className="block text-headline-sm">1.2k</span>
                <span className="block text-label-sm text-on-surface-variant">Total</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-sm justify-center mt-md">
            <div className="flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-label-sm text-on-surface-variant">Delivered</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-label-sm text-on-surface-variant">In Transit</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-2 h-2 rounded-full bg-surface-container-highest" />
              <span className="text-label-sm text-on-surface-variant">Placed</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md lg:col-span-2 overflow-hidden flex flex-col">
          <div className="border-b border-outline-variant pb-sm mb-sm flex justify-between items-center">
            <h3 className="text-headline-sm">Recent Orders</h3>
            <a className="text-label-md text-primary hover:underline" href="#">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-label-sm text-on-surface-variant border-b border-outline-variant h-10">
                  <th className="font-normal px-sm w-24">Order ID</th>
                  <th className="font-normal px-sm">Farmer</th>
                  <th className="font-normal px-sm">Products</th>
                  <th className="font-normal px-sm text-right">Amount</th>
                  <th className="font-normal px-sm w-32">Status</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {recentOrders.map((order, i) => (
                  <tr key={order.id} className={`h-10 hover:bg-surface-container-low ${i < recentOrders.length - 1 ? 'border-b border-outline-variant' : ''}`}>
                    <td className="px-sm font-mono-md text-on-surface-variant">{order.id}</td>
                    <td className="px-sm">{order.farmer}</td>
                    <td className="px-sm truncate max-w-[150px]">{order.products}</td>
                    <td className="px-sm text-right font-mono-md">{order.amount}</td>
                    <td className="px-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium w-full justify-center ${order.statusClass}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md mb-xl">
        {/* Active Shipments */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md lg:col-span-2 overflow-hidden flex flex-col">
          <div className="border-b border-outline-variant pb-sm mb-sm flex justify-between items-center">
            <h3 className="text-headline-sm">Active Shipments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-label-sm text-on-surface-variant border-b border-outline-variant h-10">
                  <th className="font-normal px-sm w-24">Shipment ID</th>
                  <th className="font-normal px-sm">Vehicle</th>
                  <th className="font-normal px-sm">Warehouse</th>
                  <th className="font-normal px-sm">ETA</th>
                  <th className="font-normal px-sm w-32">Status</th>
                </tr>
              </thead>
              <tbody className="text-body-sm">
                {activeShipments.map((s, i) => (
                  <tr key={s.id} className={`h-10 hover:bg-surface-container-low ${i < activeShipments.length - 1 ? 'border-b border-outline-variant' : ''}`}>
                    <td className="px-sm font-mono-md text-on-surface-variant">{s.id}</td>
                    <td className="px-sm">{s.vehicle}</td>
                    <td className="px-sm">{s.warehouse}</td>
                    <td className="px-sm text-on-surface-variant">{s.eta}</td>
                    <td className="px-sm">
                      <span className={`inline-flex items-center gap-1 ${s.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.statusColor === 'text-primary' ? 'bg-primary' : 'bg-warning'}`} />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weather + Activity */}
        <div className="flex flex-col gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md">
            <h3 className="text-label-md text-on-surface-variant mb-md">Regional Weather Monitor</h3>
            <div className="flex items-center gap-md">
              <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
                <span className="material-symbols-outlined text-[32px] text-warning">partly_cloudy_day</span>
              </div>
              <div>
                <div className="text-headline-md">24°C</div>
                <div className="text-body-sm text-on-surface-variant">Midwest Region (Low Risk)</div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex-grow">
            <h3 className="text-label-md text-on-surface-variant mb-md">Recent Activity</h3>
            <ul className="space-y-sm">
              {activity.map((a, i) => (
                <li key={i} className="flex gap-sm items-start">
                  <span className={`material-symbols-outlined text-[18px] mt-0.5 ${a.iconColor}`}>{a.icon}</span>
                  <div>
                    <p className="text-body-sm">{a.text}</p>
                    <span className="text-label-sm text-on-surface-variant">{a.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
