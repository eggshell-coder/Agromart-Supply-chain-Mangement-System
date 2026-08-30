// src/api/client.js
// Central API client wrapper. Adjust VITE_API_URL in .env or vite.config.js.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  });
  if (!response.ok) {
    let errorMsg = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      errorMsg = err.message || errorMsg;
    } catch (_) {}
    throw new Error(errorMsg);
  }
  return response.json();
}

// Authentication
export async function login(email, password) {
  const data = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  // Expect response: { token, user }
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

// Data fetching functions – add or adjust endpoints as needed.
export const fetchOrders = () => request("/api/orders");
export const fetchShipments = () => request("/api/shipments");
export const fetchInventory = () => request("/api/inventory");
export const fetchProducts = () => request("/api/products");
export const fetchTransfers = () => request("/api/transfers");
export const fetchProvenance = () => request("/api/provenance");
export const fetchFarmers = () => request("/api/farmers");
export const fetchWarehouses = () => request("/api/warehouses");
export const fetchVehicles = () => request("/api/vehicles");
export const fetchSpoilage = () => request("/api/spoilage");
export const fetchWeather = () => request("/api/weather");
export const fetchMarketPrices = () => request("/api/market-prices");
export const fetchAuditHistory = () => request("/api/audit-history");
export const fetchNotifications = () => request("/api/notifications");
export const fetchSettings = () => request("/api/settings");

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
};
