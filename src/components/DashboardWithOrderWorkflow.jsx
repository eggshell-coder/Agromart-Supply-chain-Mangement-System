import Dashboard from './Dashboard'

// Compatibility wrapper retained for existing imports. Order creation is implemented
// directly by OrdersPage in Dashboard.jsx so there is only one dashboard data lifecycle.
export default function DashboardWithOrderWorkflow(props) {
  return <Dashboard {...props} />
}
