import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard'
import ShipmentsDashboard from './pages/ShipmentsDashboard'
import ProductsManagement from './pages/ProductsManagement'
import InventoryWarehousing from './pages/InventoryWarehousing'
import AuditHistory from './pages/AuditHistory'
import OrdersManagement from './pages/OrdersManagement'
import NotificationsCenter from './pages/NotificationsCenter'
import SystemSettings from './pages/SystemSettings'
import MarketPricesAudit from './pages/MarketPricesAudit'
import TransferRequests from './pages/TransferRequests'
import ProductProvenance from './pages/ProductProvenance'
import FarmersDirectory from './pages/FarmersDirectory'
import WarehouseDetails from './pages/WarehouseDetails'
import UsersRolesPermissions from './pages/UsersRolesPermissions'
import SpoilageQuality from './pages/SpoilageQuality'
import WeatherHeatMonitor from './pages/WeatherHeatMonitor'
import VehiclesLogistics from './pages/VehiclesLogistics'
import LoginOnboarding from './pages/LoginOnboarding'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginOnboarding />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/shipments" element={<RequireAuth><ShipmentsDashboard /></RequireAuth>} />
      <Route path="/products" element={<RequireAuth><ProductsManagement /></RequireAuth>} />
      <Route path="/inventory" element={<RequireAuth><InventoryWarehousing /></RequireAuth>} />
      <Route path="/audit-history" element={<RequireAuth><AuditHistory /></RequireAuth>} />
      <Route path="/orders" element={<RequireAuth><OrdersManagement /></RequireAuth>} />
      <Route path="/notifications" element={<RequireAuth><NotificationsCenter /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth><SystemSettings /></RequireAuth>} />
      <Route path="/market-prices" element={<RequireAuth><MarketPricesAudit /></RequireAuth>} />
      <Route path="/transfer-requests" element={<RequireAuth><TransferRequests /></RequireAuth>} />
      <Route path="/provenance" element={<RequireAuth><ProductProvenance /></RequireAuth>} />
      <Route path="/farmers" element={<RequireAuth><FarmersDirectory /></RequireAuth>} />
      <Route path="/warehouses/:id" element={<RequireAuth><WarehouseDetails /></RequireAuth>} />
      <Route path="/users-roles" element={<RequireAuth><UsersRolesPermissions /></RequireAuth>} />
      <Route path="/spoilage" element={<RequireAuth><SpoilageQuality /></RequireAuth>} />
      <Route path="/weather" element={<RequireAuth><WeatherHeatMonitor /></RequireAuth>} />
      <Route path="/vehicles" element={<RequireAuth><VehiclesLogistics /></RequireAuth>} />
    </Routes>
  )
}
