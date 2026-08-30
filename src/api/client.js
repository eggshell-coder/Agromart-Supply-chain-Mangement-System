// src/api/client.js
// Same-origin API in production; Vite proxies /api to the gateway in local development.
import { supabase } from '../lib/supabase.js'

const BASE_URL = import.meta.env.VITE_API_URL || ''

function getAuthHeaders() {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`
    try {
      const err = await response.json()
      errorMsg = err.error || err.message || errorMsg
    } catch (_) {}
    throw new Error(errorMsg)
  }

  return response.json()
}

// Login directly with Supabase Auth. The API gateway requires a valid
// bearer token for /api/*, so attempting to POST /api/login before a token
// exists can never work reliably.
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  if (!data?.session?.access_token) throw new Error('No authentication session was returned')

  const result = {
    token: data.session.access_token,
    user: data.user || null,
  }

  localStorage.setItem('token', result.token)
  return result
}

export const fetchOrders = () => request('/api/orders')
export const fetchShipments = () => request('/api/shipments')
export const fetchInventory = () => request('/api/inventory')
export const fetchProducts = () => request('/api/products')
export const fetchTransfers = () => request('/api/transfers')
export const fetchProvenance = () => request('/api/provenance')
export const fetchFarmers = () => request('/api/farmers')
export const fetchWarehouses = () => request('/api/warehouses')
export const fetchVehicles = () => request('/api/vehicles')
export const fetchSpoilage = () => request('/api/spoilage')
export const fetchWeather = () => request('/api/weather')
export const fetchMarketPrices = () => request('/api/market-prices')
export const fetchAuditHistory = () => request('/api/audit-history')
export const fetchNotifications = () => request('/api/notifications')
export const fetchSettings = () => request('/api/settings')

export default {
  login,
  fetchOrders,
  fetchShipments,
  fetchInventory,
  fetchProducts,
  fetchTransfers,
  fetchProvenance,
  fetchFarmers,
  fetchWarehouses,
  fetchVehicles,
  fetchSpoilage,
  fetchWeather,
  fetchMarketPrices,
  fetchAuditHistory,
  fetchNotifications,
  fetchSettings,
}
