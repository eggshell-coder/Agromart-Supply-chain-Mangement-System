// src/api/client.js
// Browser-safe API client: same-origin in production, Vite proxy in development.
import { createClient } from '@supabase/supabase-js'

const BASE_URL = import.meta.env.VITE_API_URL || ''

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null

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

// Authentication is performed directly against Supabase Auth.
// This avoids sending login requests to a protected API gateway before a token exists.
export async function login(email, password) {
  if (!supabase) {
    throw new Error('Supabase frontend configuration is missing')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  if (!data?.session?.access_token) throw new Error('Authentication succeeded but no session token was returned')

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
