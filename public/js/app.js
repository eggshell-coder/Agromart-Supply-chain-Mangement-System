/* AgroMart app.js — patched for kW heat monitor + DELIVERY_PROFIT price audit */

const agromartUser = sessionStorage.getItem("agromart_user");
const agromartToken = sessionStorage.getItem("agromart_token");

if (!agromartUser || !agromartToken) {
  window.location.replace("/?login=1");
}

function logout() {
  sessionStorage.removeItem("agromart_user");
  sessionStorage.removeItem("agromart_token");
  sessionStorage.removeItem("agromart_role");
  localStorage.removeItem("hasSeenOnboarding");
  window.location.replace("/");
}

let districts = [];
let farmers = [];
let products = [];
let vehicles = [];
let warehouses = [];
let shipments = [];
let orders = [];
let monitoring = [];

const API_ORIGIN =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:3000"
    : window.location.origin;

const SHIP_STATUSES = [
  "PENDING",
  "IN_TRANSIT",
  "IN_WAREHOUSE",
  "DELIVERED",
  "PARTIALLY_DELIVERED",
  "SPOILED",
  "DELAYED",
  "CANCELLED"
];

const ORDER_STATUSES = [
  "PLACED",
  "CONFIRMED",
  "IN_TRANSIT",
  "DELAYED",
  "DELIVERED",
  "PARTIALLY_DELIVERED",
  "CANCELLED",
  "RETURNED"
];

async function api(url, opts = {}) {
  let res;
  try {
    res = await fetch(`${API_ORIGIN}${url}`, {
      headers: { "Content-Type": "application/json" },
      ...opts,
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
  } catch (error) {
    throw new Error("Backend server is offline. Start API server on port 3000.");
  }

  const contentType = res.headers.get("content-type") || "";
  let d = {};

  if (contentType.includes("application/json")) {
    d = await res.json();
  } else {
    throw new Error("Invalid API response from server.");
  }

  if (!res.ok) {
    throw new Error(d.error || "Request failed");
  }

  return d;
}

function toast(msg, type = "success") {
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  document.getElementById("toast-container").appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

function bdt(n) {
  return "৳" + Number(n || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function fmtDate(ts) {
  return ts
    ? new Date(ts).toLocaleDateString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : "—";
}

function fmtDT(ts) {
  return ts
    ? new Date(ts).toLocaleString("en-BD", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "—";
}

function faIcon(name) {
  return `<i class="fa-solid ${name}" aria-hidden="true"></i>`;
}

function emptyState(iconName, message) {
  return `<div class="empty"><div class="empty-icon">${faIcon(iconName)}</div><p>${message}</p></div>`;
}

function toLocalDT(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

function badge(s) {
  const c =
    {
      PENDING: "badge-yellow",
      IN_TRANSIT: "badge-blue",
      IN_WAREHOUSE: "badge-yellow",
      DELIVERED: "badge-green",
      PARTIALLY_DELIVERED: "badge-green",
      SPOILED: "badge-red",
      DELAYED: "badge-red",
      CANCELLED: "badge-gray",

      PLACED: "badge-blue",
      CONFIRMED: "badge-blue",
      RETURNED: "badge-gray",

      LOW: "badge-green",
      MEDIUM: "badge-yellow",
      HIGH: "badge-red",

      INFO: "badge-blue",
      WARNING: "badge-yellow",
      CRITICAL: "badge-red",

      Active: "badge-green",
      Inactive: "badge-gray",
      Available: "badge-green",
      Busy: "badge-yellow",

      PROFIT: "badge-green",
      LOSS: "badge-red",
      BREAK_EVEN: "badge-gray",

      "HIGH RISK": "badge-red",
      SAFE: "badge-green"
    }[s] || "badge-gray";

  return `<span class="badge ${c}">${String(s).replace(/_/g, " ")}</span>`;
}

function filterTable(id, q) {
  document.querySelectorAll(`#${id} tbody tr`).forEach((r) => {
    r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase())
      ? ""
      : "none";
  });
}

function fillSelect(id, items, valKey, labelFn, empty = false) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = empty ? "<option value=''>— Select —</option>" : "";

  items.forEach((item) => {
    const o = document.createElement("option");
    o.value = item[valKey];
    o.textContent = typeof labelFn === "function" ? labelFn(item) : item[labelFn];
    el.appendChild(o);
  });
}

function fillStatusSelect(id, statuses, current = "") {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";

  statuses.forEach((s) => {
    const o = document.createElement("option");
    o.value = s;
    o.textContent = s.replace(/_/g, " ");
    if (s === current) o.selected = true;
    el.appendChild(o);
  });
}

/* Navigation */
const PAGES = {
  "#dashboard": { el: "page-dashboard", load: loadDashboard },
  "#orders": { el: "page-orders", load: loadOrders },
  "#shipments": { el: "page-shipments", load: loadShipments },
  "#farmers": { el: "page-farmers", load: loadFarmers },
  "#products": { el: "page-products", load: loadProducts },
  "#warehouses": { el: "page-warehouses", load: loadWarehouses },
  "#vehicles": { el: "page-vehicles", load: loadVehicles },
  "#monitoring": { el: "page-monitoring", load: loadMonitoring },
  "#weather": { el: "page-weather", load: loadWeather },
  "#spoilage": { el: "page-spoilage", load: loadSpoilage },
  "#provenance": { el: "page-provenance", load: loadProvenance },
  "#price-audit": { el: "page-price-audit", load: loadPriceAudit }
};

function navigate(hash) {
  const page = PAGES[hash] || PAGES["#dashboard"];

  document.querySelectorAll(".page").forEach((p) => {
    p.style.display = "none";
  });

  document.getElementById(page.el).style.display = "block";

  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === hash);
  });

  page.load();
}

document.querySelectorAll(".nav-link").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = a.getAttribute("href");
  })
);

window.addEventListener("hashchange", () => navigate(location.hash));

function openModal(name) {
  ({
    farmer: openFarmerModal,
    product: openProductModal,
    warehouse: openWarehouseModal,
    vehicle: openVehicleModal,
    shipment: openShipmentModal,
    weather: openWeatherModal,
    order: openOrderModal,
    spoilage: openSpoilageModal,
    sensor: openSensorModal
  })[name]?.();
}

function closeModal(name) {
  document.getElementById(`modal-${name}`)?.classList.remove("open");
}

document.querySelectorAll(".modal-overlay").forEach((m) =>
  m.addEventListener("click", (e) => {
    if (e.target === m) m.classList.remove("open");
  })
);

/* Dashboard */
async function loadDashboard() {
  const g = document.getElementById("kpi-grid");
  g.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  try {
    const d = await api("/api/dashboard");

    g.innerHTML = `
      <div class="kpi-card blue"><div class="kpi-label">Total Shipments</div><div class="kpi-value">${d.total_shipments}</div></div>
      <div class="kpi-card green"><div class="kpi-label">Active</div><div class="kpi-value">${d.active_shipments}</div></div>
      <div class="kpi-card yellow"><div class="kpi-label">Delayed</div><div class="kpi-value">${d.delayed_shipments}</div></div>
      <div class="kpi-card green"><div class="kpi-label">Delivered</div><div class="kpi-value">${d.delivered_shipments}</div></div>
      <div class="kpi-card red"><div class="kpi-label">Spoiled</div><div class="kpi-value">${d.spoiled_shipments}</div></div>
      <div class="kpi-card yellow"><div class="kpi-label">Weather Events</div><div class="kpi-value">${d.active_weather_events ?? d.active_weather ?? 0}</div></div>
      <div class="kpi-card red"><div class="kpi-label">Critical 24h</div><div class="kpi-value">${d.critical_events_24h}</div></div>
      <div class="kpi-card red"><div class="kpi-label">Total Loss</div><div class="kpi-value">${bdt(d.total_loss_bdt ?? d.total_loss)}</div></div>
      <div class="kpi-card yellow"><div class="kpi-label">Low Stock</div><div class="kpi-value">${d.low_stock_products ?? d.low_stock ?? 0}</div></div>
    `;
  } catch (e) {
    g.innerHTML = `<p style="color:var(--red)">Error: ${e.message}</p>`;
  }
}

/* Orders */
async function loadOrders() {
  const list = document.getElementById("order-list");
  list.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  try {
    orders = await api("/api/orders");

    if (!orders.length) {
      list.innerHTML = emptyState("fa-cart-shopping", "No orders yet.");
      return;
    }

    list.innerHTML = orders
      .map((o) => {
        const items = o.order_item || o.items || [];
        const total = items.reduce(
          (sum, i) =>
            sum +
            (Number(i.total_price) ||
              Number(i.quantity || 0) * Number(i.agreed_price_per_unit || 0)),
          0
        );

        const rows = items
          .map((i) => {
            const prod =
              i.product ||
              products.find((p) => p.product_id === i.product_id);
            const farmer =
              i.farmer ||
              farmers.find((f) => f.farmer_id === i.farmer_id);
            const src =
              i.source_district ||
              districts.find((d) => d.district_id === i.source_district_id) ||
              farmer?.district;

            const subtotal =
              Number(i.total_price) ||
              Number(i.quantity || 0) * Number(i.agreed_price_per_unit || 0);

            return `<tr style="border-top:1px solid var(--gray-100)">
              <td style="padding:8px 10px">
                <strong>${prod?.name || "?"}</strong>
                <br>
                <span style="font-size:11px;color:var(--gray-500)">${prod?.category || ""}</span>
              </td>
              <td style="padding:8px 10px">${farmer?.name || "—"}</td>
              <td style="padding:8px 10px">${faIcon("fa-location-dot")} ${src?.name || farmer?.district?.name || "—"}</td>
              <td style="padding:8px 10px;text-align:right">${i.quantity || 0} ${prod?.unit || "kg"}</td>
              <td style="padding:8px 10px;text-align:right">${bdt(i.agreed_price_per_unit)}</td>
              <td style="padding:8px 10px;text-align:right;font-weight:600">${bdt(subtotal)}</td>
              <td style="padding:8px 10px">
                <button class="btn btn-danger btn-sm" onclick="deleteOrderItem('${o.order_id}','${i.item_id}')">${faIcon("fa-trash-can")}</button>
              </td>
            </tr>`;
          })
          .join("");

        const itemsHtml = items.length
          ? `<table style="width:100%;font-size:13px;border-collapse:collapse;margin-top:8px">
              <thead>
                <tr style="background:var(--gray-50)">
                  <th style="padding:7px 10px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">Product</th>
                  <th style="padding:7px 10px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">Farmer</th>
                  <th style="padding:7px 10px;text-align:left;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">From</th>
                  <th style="padding:7px 10px;text-align:right;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">Qty</th>
                  <th style="padding:7px 10px;text-align:right;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">Unit Price</th>
                  <th style="padding:7px 10px;text-align:right;font-size:11px;font-weight:600;text-transform:uppercase;color:var(--gray-500)">Subtotal</th>
                  <th style="padding:7px 10px"></th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>`
          : `<p style="color:var(--gray-500);font-size:13px;padding:10px 4px">No items yet. Add food items first, then create shipment for each item.</p>`;

        return `<div class="card" style="margin-bottom:14px">
          <div class="card-header">
            <div>
              <span style="font-family:monospace;font-size:12px;color:var(--gray-500)">${o.order_id.slice(0, 8)}…</span>
              &nbsp;
              <span style="cursor:pointer" onclick="openOrderStatusModal('${o.order_id}','${o.order_status}')">${badge(o.order_status)}</span>
              &nbsp;
              <span style="font-size:12px;color:var(--gray-500)">${fmtDT(o.ordered_at)}</span>
              ${o.notes ? `&nbsp;<span style="font-size:12px;color:var(--gray-500)">${o.notes}</span>` : ""}
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <strong>${bdt(Number(o.agreed_total) || total)}</strong>
              <button class="btn btn-primary btn-sm" onclick="openOrderItemModal('${o.order_id}')">+ Add Item</button>
            </div>
          </div>
          <div style="padding:0 8px 8px">${itemsHtml}</div>
        </div>`;
      })
      .join("");
  } catch (e) {
    list.innerHTML = `<p style="color:var(--red)">Error: ${e.message}</p>`;
  }
}

function openOrderModal() {
  document.getElementById("order-date").value = toLocalDT(new Date().toISOString());
  fillStatusSelect("order-status-new", ORDER_STATUSES, "PLACED");
  document.getElementById("order-notes").value = "";
  document.getElementById("modal-order").classList.add("open");
}

async function saveOrder() {
  const dateValue = document.getElementById("order-date").value;

  const body = {
    notes: document.getElementById("order-notes").value.trim(),
    order_status: document.getElementById("order-status-new").value,
    ordered_at: dateValue ? new Date(dateValue).toISOString() : new Date().toISOString()
  };

  try {
    await api("/api/orders", { method: "POST", body });
    toast("Order created! Now add food items.");
    closeModal("order");
    loadOrders();
  } catch (e) {
    toast(e.message, "error");
  }
}

function openOrderStatusModal(id, cur) {
  document.getElementById("order-status-id").value = id;
  fillStatusSelect("order-status-value", ORDER_STATUSES, cur);
  document.getElementById("modal-order-status").classList.add("open");
}

async function saveOrderStatus() {
  const id = document.getElementById("order-status-id").value;
  const order_status = document.getElementById("order-status-value").value;

  try {
    await api(`/api/orders/${id}/status`, {
      method: "PATCH",
      body: { order_status }
    });
    toast("Updated!");
    closeModal("order-status");
    loadOrders();
  } catch (e) {
    toast(e.message, "error");
  }
}

function openOrderItemModal(orderId) {
  document.getElementById("order-item-order-id").value = orderId;

  fillSelect(
    "order-item-product",
    products,
    "product_id",
    (p) => `${p.name} (${p.category}) — ${bdt(p.current_price)}`,
    true
  );

  fillSelect(
    "order-item-farmer",
    farmers,
    "farmer_id",
    (f) => `${f.name} — ${f.district?.name || ""}`,
    true
  );

  document.getElementById("order-item-qty").value = "";
  document.getElementById("order-item-price").value = "";

  document.getElementById("order-item-product").onchange = function () {
    const p = products.find((x) => x.product_id === this.value);
    if (p) {
      document.getElementById("order-item-price").value =
        p.current_price || p.purchase_price || "";
    }
  };

  document.getElementById("modal-order-item").classList.add("open");
}

async function saveOrderItem() {
  const orderId = document.getElementById("order-item-order-id").value;
  const product_id = document.getElementById("order-item-product").value;
  const farmer_id = document.getElementById("order-item-farmer").value;

  const body = {
    product_id,
    farmer_id,
    quantity: +document.getElementById("order-item-qty").value,
    agreed_price_per_unit: +document.getElementById("order-item-price").value
  };

  if (!body.product_id || !body.farmer_id || !body.quantity || !body.agreed_price_per_unit) {
    toast("Product, farmer, quantity, and price required", "error");
    return;
  }

  try {
    await api(`/api/orders/${orderId}/items`, {
      method: "POST",
      body
    });

    toast("Item added! Now create a shipment for it.");
    closeModal("order-item");
    loadOrders();
  } catch (e) {
    toast(e.message, "error");
  }
}

async function deleteOrderItem(orderId, itemId) {
  if (!confirm("Remove this item?")) return;

  try {
    await api(`/api/orders/${orderId}/items/${itemId}`, {
      method: "DELETE"
    });
    toast("Removed!");
    loadOrders();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* Shipments */
async function loadShipments() {
  loadActiveShipments();

  const tbody = document.getElementById("shipment-tbody");
  tbody.innerHTML =
    '<tr><td colspan="9"><div class="loader"><div class="spinner"></div></div></td></tr>';

  const status = document.getElementById("shipment-status-filter")?.value || "";

  try {
    shipments = await api(`/api/shipments${status ? "?status=" + status : ""}`);

    tbody.innerHTML = !shipments.length
      ? `<tr><td colspan="9">${emptyState("fa-truck-fast", "No shipments")}</td></tr>`
      : shipments
          .map(
            (s) => `<tr>
              <td><strong>${s.product?.name || "?"}</strong><div class="td-muted">${s.product?.category || ""}</div></td>
              <td>${s.farmer?.name || "?"}<div class="td-muted">${s.farmer?.district?.name || ""}</div></td>
              <td>${faIcon("fa-location-dot")} ${s.source_district?.name || "?"}→${s.dest_district?.name || "?"}</td>
              <td>${s.quantity} ${s.product?.unit || "kg"}</td>
              <td>
                <span style="cursor:pointer" onclick="openStatusModal('${s.shipment_id}','${s.status}','${(s.product?.name || "").replace(/'/g, "")} from ${(s.farmer?.name || "").replace(/'/g, "")}')">
                  ${badge(s.status)}
                </span>
              </td>
              <td>${s.vehicle?.plate_no || '<span class="td-muted">—</span>'}</td>
              <td class="td-muted">${fmtDT(s.start_time)}</td>
              <td class="td-muted">${s.actual_arrival ? fmtDT(s.actual_arrival) : s.estimated_arrival ? "Est: " + fmtDT(s.estimated_arrival) : "—"}</td>
              <td>${bdt(s.total_cost || 0)}</td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="9" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

async function loadActiveShipments() {
  const tbody = document.getElementById("active-shipment-tbody");

  try {
    const active = await api("/api/shipments/active");

    if (!active.length) {
      tbody.innerHTML =
        '<tr><td colspan="8" style="padding:16px;text-align:center;color:var(--gray-500)">No active shipments right now.</td></tr>';
      return;
    }

    const now = Date.now();

    tbody.innerHTML = active
      .map((s) => {
        const overdue = s.estimated_arrival && new Date(s.estimated_arrival) < now;

        return `<tr style="${overdue ? "background:#fff7ed" : ""}">
          <td><strong>${s.product?.name || "?"}</strong></td>
          <td>${s.farmer?.name || "?"}</td>
          <td>${faIcon("fa-location-dot")} ${s.source_district?.name || "?"}→${s.dest_district?.name || "?"}</td>
          <td>${s.quantity} ${s.product?.unit || "kg"}</td>
          <td>${badge(s.status)}</td>
          <td>${s.vehicle?.plate_no || "—"}</td>
          <td class="${overdue ? "" : "td-muted"}" style="${overdue ? "color:var(--red);font-weight:600" : ""}">
            ${s.estimated_arrival ? fmtDT(s.estimated_arrival) : "—"}${overdue ? ` ${faIcon("fa-triangle-exclamation")} OVERDUE` : ""}
          </td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="openStatusModal('${s.shipment_id}','${s.status}','${(s.product?.name || "").replace(/'/g, "")} from ${(s.farmer?.name || "").replace(/'/g, "")}')">
              Update →
            </button>
          </td>
        </tr>`;
      })
      .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red)">${e.message}</td></tr>`;
  }
}

function openStatusModal(id, cur, info) {
  document.getElementById("shipment-status-id").value = id;
  fillStatusSelect("shipment-status-value", SHIP_STATUSES, cur);
  document.getElementById("shipment-status-info").innerHTML = `<strong>${info}</strong>`;
  document.getElementById("shipment-actual-arrival").value = toLocalDT(new Date().toISOString());
  document.getElementById("modal-shipment-status").classList.add("open");
}

async function saveShipmentStatus() {
  const id = document.getElementById("shipment-status-id").value;
  const status = document.getElementById("shipment-status-value").value;
  const arr = document.getElementById("shipment-actual-arrival").value;

  try {
    await api(`/api/shipments/${id}/status`, {
      method: "PATCH",
      body: {
        status,
        actual_arrival: arr ? new Date(arr).toISOString() : undefined
      }
    });

    toast(status === "DELIVERED" ? "✅ Delivered! Stock updated & profit recorded by DB trigger." : "Status updated!");
    closeModal("shipment-status");
    loadShipments();
    vehicles = await api("/api/vehicles");
  } catch (e) {
    toast("Error: " + e.message, "error");
  }
}

function openShipmentModal() {
  fillSelect("shipment-product", products, "product_id", (p) => `${p.name} (${p.category})`, true);
  fillSelect("shipment-farmer", farmers, "farmer_id", (f) => `${f.name} — ${f.district?.name || ""}`, true);
  fillSelect("shipment-src-district", districts, "district_id", (d) => d.name, true);
  fillSelect("shipment-dest-district", districts, "district_id", (d) => d.name, true);

  const avail = vehicles.filter((v) => v.is_operational && !v._busy);
  const vEl = document.getElementById("shipment-vehicle");
  vEl.innerHTML = '<option value="">None</option>';

  avail.forEach((v) => {
    const o = document.createElement("option");
    o.value = v.vehicle_id;
    o.textContent = `${v.plate_no} (${v.vehicle_type || "Truck"}, ${v.capacity_kg}kg)`;
    vEl.appendChild(o);
  });

  const wEl = document.getElementById("shipment-warehouse");
  wEl.innerHTML = '<option value="">None</option>';

  warehouses
    .filter((w) => w.is_active)
    .forEach((w) => {
      const o = document.createElement("option");
      o.value = w.warehouse_id;
      o.textContent = w.name;
      wEl.appendChild(o);
    });

  document.getElementById("shipment-start").value = toLocalDT(new Date().toISOString());

  ["shipment-arrival", "shipment-actual-arrival-new", "shipment-qty", "shipment-notes"].forEach((id) => {
    document.getElementById(id).value = "";
  });

  document.getElementById("shipment-cost").value = "0";
  fillStatusSelect("shipment-status-new", SHIP_STATUSES, "PENDING");

  document.getElementById("shipment-farmer").onchange = function () {
    const f = farmers.find((x) => x.farmer_id === this.value);
    if (f?.district_id) document.getElementById("shipment-src-district").value = f.district_id;
  };

  document.getElementById("modal-shipment").classList.add("open");
}

async function saveShipment() {
  const status = document.getElementById("shipment-status-new").value;

  const body = {
    product_id: document.getElementById("shipment-product").value,
    farmer_id: document.getElementById("shipment-farmer").value,
    source_district_id: document.getElementById("shipment-src-district").value,
    dest_district_id: document.getElementById("shipment-dest-district").value,
    vehicle_id: document.getElementById("shipment-vehicle").value || null,
    warehouse_id: document.getElementById("shipment-warehouse").value || null,
    quantity: +document.getElementById("shipment-qty").value,
    transport_cost: +document.getElementById("shipment-cost").value || 0,
    start_time: new Date(document.getElementById("shipment-start").value).toISOString(),
    estimated_arrival: document.getElementById("shipment-arrival").value
      ? new Date(document.getElementById("shipment-arrival").value).toISOString()
      : null,
    actual_arrival: document.getElementById("shipment-actual-arrival-new").value
      ? new Date(document.getElementById("shipment-actual-arrival-new").value).toISOString()
      : null,
    status,
    notes: document.getElementById("shipment-notes").value.trim()
  };

  if (!body.product_id || !body.farmer_id || !body.quantity) {
    toast("Product, farmer and quantity are required", "error");
    return;
  }

  try {
    await api("/api/shipments", { method: "POST", body });
    toast("Shipment created!");
    closeModal("shipment");
    loadShipments();
    vehicles = await api("/api/vehicles");
  } catch (e) {
    toast("Error: " + e.message, "error");
  }
}

/* Farmers */
async function loadFarmers() {
  const tbody = document.getElementById("farmer-tbody");
  tbody.innerHTML = '<tr><td colspan="8"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    farmers = await api("/api/farmers");

    tbody.innerHTML = !farmers.length
      ? `<tr><td colspan="8">${emptyState("fa-people-group", "No farmers")}</td></tr>`
      : farmers
          .map(
            (f) => `<tr>
              <td><strong>${f.name}</strong></td>
              <td>${f.phone || '<span class="td-muted">—</span>'}</td>
              <td>${f.district?.name || f.district_id}</td>
              <td>${f.village || '<span class="td-muted">—</span>'}</td>
              <td>${f.land_size_acre ? f.land_size_acre + " ac" : '<span class="td-muted">—</span>'}</td>
              <td>${faIcon("fa-star")} ${Number(f.rating || 5).toFixed(1)}</td>
              <td>${badge(f.is_active ? "Active" : "Inactive")}</td>
              <td class="td-actions">
                <button class="btn btn-ghost btn-sm" onclick='editFarmer(${JSON.stringify(f).replace(/'/g, "&#39;")})'>${faIcon("fa-pen-to-square")}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteFarmer('${f.farmer_id}')">${faIcon("fa-trash-can")}</button>
              </td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

function openFarmerModal(f = null) {
  document.getElementById("farmer-modal-title").textContent = f ? "Edit Farmer" : "Add Farmer";
  document.getElementById("farmer-id").value = f?.farmer_id || "";
  document.getElementById("farmer-name").value = f?.name || "";
  document.getElementById("farmer-phone").value = f?.phone || "";

  fillSelect("farmer-district", districts, "district_id", (d) => d.name, true);

  if (f) document.getElementById("farmer-district").value = f.district_id;

  document.getElementById("farmer-village").value = f?.village || "";
  document.getElementById("farmer-land").value = f?.land_size_acre || "";
  document.getElementById("farmer-active").checked = f ? f.is_active : true;
  document.getElementById("modal-farmer").classList.add("open");
}

function editFarmer(f) {
  openFarmerModal(f);
}

async function saveFarmer() {
  const id = document.getElementById("farmer-id").value;

  const body = {
    name: document.getElementById("farmer-name").value.trim(),
    phone: document.getElementById("farmer-phone").value.trim(),
    district_id: document.getElementById("farmer-district").value,
    village: document.getElementById("farmer-village").value.trim(),
    land_size_acre: document.getElementById("farmer-land").value || null,
    is_active: document.getElementById("farmer-active").checked
  };

  if (!body.name || !body.district_id) {
    toast("Name and district required", "error");
    return;
  }

  try {
    if (id) {
      await api(`/api/farmers/${id}`, { method: "PUT", body });
    } else {
      await api("/api/farmers", { method: "POST", body });
    }

    toast(id ? "Updated!" : "Added!");
    closeModal("farmer");
    loadFarmers();
  } catch (e) {
    toast(e.message, "error");
  }
}

async function deleteFarmer(id) {
  if (!confirm("Delete?")) return;

  try {
    await api(`/api/farmers/${id}`, { method: "DELETE" });
    toast("Deleted!");
    loadFarmers();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* Products */
async function loadProducts() {
  const tbody = document.getElementById("product-tbody");
  tbody.innerHTML = '<tr><td colspan="8"><div class="loader"><div class="spinner"></div></div></td></tr>';

  const cat = document.getElementById("product-category-filter")?.value || "";

  try {
    products = await api(`/api/products${cat ? "?category=" + cat : ""}`);

    tbody.innerHTML = !products.length
      ? `<tr><td colspan="8">${emptyState("fa-box-open", "No products")}</td></tr>`
      : products
          .map(
            (p) => `<tr>
              <td><strong>${p.name}</strong></td>
              <td><span class="badge badge-blue">${p.category}</span></td>
              <td>${p.unit}</td>
              <td>${p.stock_quantity} ${p.unit}</td>
              <td>${bdt(p.purchase_price)}</td>
              <td><strong style="color:${p.current_price > p.purchase_price ? "var(--red)" : "var(--green)"}">${bdt(p.current_price)}</strong></td>
              <td>${badge(p.is_active ? "Active" : "Inactive")}</td>
              <td class="td-actions">
                <button class="btn btn-ghost btn-sm" onclick='editProduct(${JSON.stringify(p).replace(/'/g, "&#39;")})'>${faIcon("fa-pen-to-square")}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.product_id}')">${faIcon("fa-trash-can")}</button>
              </td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

function openProductModal(p = null) {
  document.getElementById("product-modal-title").textContent = p ? "Edit Product" : "Add Product";
  document.getElementById("product-id").value = p?.product_id || "";
  document.getElementById("product-name").value = p?.name || "";
  document.getElementById("product-category").value = p?.category || "Vegetable";
  document.getElementById("product-unit").value = p?.unit || "KG";
  document.getElementById("product-purchase-price").value = p?.purchase_price || "";
  document.getElementById("product-current-price").value = p?.current_price || "";
  document.getElementById("product-stock").value = p?.stock_quantity ?? 0;
  document.getElementById("product-shelf").value = p?.max_shelf_hours || "";
  document.getElementById("product-temp-min").value = p?.ideal_temp_min || "";
  document.getElementById("product-temp-max").value = p?.ideal_temp_max || "";

  if (document.getElementById("product-specific-heat")) {
    document.getElementById("product-specific-heat").value = p?.specific_heat || "";
  }

  document.getElementById("product-seasonal").checked = p?.is_seasonal || false;
  document.getElementById("product-active").checked = p ? p.is_active : true;
  document.getElementById("modal-product").classList.add("open");
}

function editProduct(p) {
  openProductModal(p);
}

async function saveProduct() {
  const id = document.getElementById("product-id").value;

  const body = {
    name: document.getElementById("product-name").value.trim(),
    category: document.getElementById("product-category").value,
    unit: document.getElementById("product-unit").value,
    purchase_price: +document.getElementById("product-purchase-price").value,
    current_price: +document.getElementById("product-current-price").value,
    stock_quantity: +document.getElementById("product-stock").value,
    max_shelf_hours: document.getElementById("product-shelf").value || null,
    ideal_temp_min: document.getElementById("product-temp-min").value || null,
    ideal_temp_max: document.getElementById("product-temp-max").value || null,
    specific_heat: document.getElementById("product-specific-heat")?.value || null,
    is_seasonal: document.getElementById("product-seasonal").checked,
    is_active: document.getElementById("product-active").checked
  };

  if (!body.name || !body.purchase_price || !body.current_price) {
    toast("Name and prices required", "error");
    return;
  }

  try {
    if (id) {
      await api(`/api/products/${id}`, { method: "PUT", body });
    } else {
      await api("/api/products", { method: "POST", body });
    }

    toast(id ? "Updated!" : "Added!");
    closeModal("product");
    loadProducts();
  } catch (e) {
    toast(e.message, "error");
  }
}

async function deleteProduct(id) {
  if (!confirm("Delete?")) return;

  try {
    await api(`/api/products/${id}`, { method: "DELETE" });
    toast("Deleted!");
    loadProducts();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* Warehouses */
async function loadWarehouses() {
  const g = document.getElementById("wh-grid");
  g.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  try {
    warehouses = await api("/api/warehouses");

    if (!warehouses.length) {
      g.innerHTML = emptyState("fa-warehouse", "No warehouses");
      return;
    }

    g.innerHTML = warehouses
      .map((w) => {
        const pct = w.capacity_kg ? Math.round((w.current_load_kg / w.capacity_kg) * 100) : 0;
        const bc = pct > 95 ? "red" : pct > 85 ? "yellow" : "";

        return `<div class="wh-card">
          <div class="wh-card-header">
            <div>
              <div class="wh-name">${faIcon("fa-warehouse")} ${w.name}</div>
              <div class="wh-district">${faIcon("fa-location-dot")} ${w.district?.name || ""}</div>
            </div>
            <div style="display:flex;gap:4px">
              ${badge(w.is_active ? "Active" : "Inactive")}
              <button class="btn btn-ghost btn-sm" onclick='editWarehouse(${JSON.stringify(w).replace(/'/g, "&#39;")})'>${faIcon("fa-pen-to-square")}</button>
            </div>
          </div>

          <div class="wh-util-label">
            <span>Utilization</span>
            <strong style="color:${pct > 95 ? "var(--red)" : pct > 85 ? "var(--yellow)" : "inherit"}">${pct}%</strong>
          </div>

          <div class="progress">
            <div class="progress-bar ${bc}" style="width:${Math.min(100, pct)}%"></div>
          </div>

          <div class="wh-util-label td-muted" style="font-size:11px">
            <span>${(w.current_load_kg || 0).toLocaleString()} kg</span>
            <span>${(w.capacity_kg || 0).toLocaleString()} kg total</span>
          </div>

          <div class="wh-meta">
            <div class="wh-meta-label">Temp</div>
            <div class="wh-meta-value">${w.temp_min != null ? `${w.temp_min}°C–${w.temp_max}°C` : "Ambient"}</div>
            <div class="wh-meta-label">Rent/Day</div>
            <div class="wh-meta-value">${bdt(w.rent_per_day)}</div>
            <div class="wh-meta-label">Manager</div>
            <div class="wh-meta-value">${w.manager_name || "—"}</div>
            <div class="wh-meta-label">Phone</div>
            <div class="wh-meta-value">${w.manager_phone || "—"}</div>
          </div>
        </div>`;
      })
      .join("");
  } catch (e) {
    g.innerHTML = `<p style="color:var(--red)">Error: ${e.message}</p>`;
  }
}

function openWarehouseModal(w = null) {
  document.getElementById("warehouse-modal-title").textContent = w ? "Edit Warehouse" : "Add Warehouse";
  document.getElementById("warehouse-id").value = w?.warehouse_id || "";
  document.getElementById("warehouse-name").value = w?.name || "";

  fillSelect("warehouse-district", districts, "district_id", (d) => d.name, true);

  if (w) document.getElementById("warehouse-district").value = w.district_id;

  document.getElementById("warehouse-capacity").value = w?.capacity_kg || "";
  document.getElementById("warehouse-rent").value = w?.rent_per_day || "";
  document.getElementById("warehouse-temp-min").value = w?.temp_min || "";
  document.getElementById("warehouse-temp-max").value = w?.temp_max || "";
  document.getElementById("warehouse-manager-name").value = w?.manager_name || "";
  document.getElementById("warehouse-manager-phone").value = w?.manager_phone || "";
  document.getElementById("warehouse-active").checked = w ? w.is_active : true;
  document.getElementById("modal-warehouse").classList.add("open");
}

function editWarehouse(w) {
  openWarehouseModal(w);
}

async function saveWarehouse() {
  const id = document.getElementById("warehouse-id").value;

  const body = {
    name: document.getElementById("warehouse-name").value.trim(),
    district_id: document.getElementById("warehouse-district").value,
    capacity_kg: +document.getElementById("warehouse-capacity").value,
    rent_per_day: +document.getElementById("warehouse-rent").value,
    temp_min: document.getElementById("warehouse-temp-min").value || null,
    temp_max: document.getElementById("warehouse-temp-max").value || null,
    manager_name: document.getElementById("warehouse-manager-name").value.trim(),
    manager_phone: document.getElementById("warehouse-manager-phone").value.trim(),
    is_active: document.getElementById("warehouse-active").checked
  };

  if (!body.name || !body.district_id) {
    toast("Name and district required", "error");
    return;
  }

  try {
    if (id) {
      await api(`/api/warehouses/${id}`, { method: "PUT", body });
    } else {
      await api("/api/warehouses", { method: "POST", body });
    }

    toast(id ? "Updated!" : "Added!");
    closeModal("warehouse");
    loadWarehouses();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* Vehicles */
async function loadVehicles() {
  const tbody = document.getElementById("vehicle-tbody");
  tbody.innerHTML = '<tr><td colspan="8"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    vehicles = await api("/api/vehicles");

    tbody.innerHTML = !vehicles.length
      ? `<tr><td colspan="8">${emptyState("fa-truck-moving", "No vehicles")}</td></tr>`
      : vehicles
          .map(
            (v) => `<tr style="${v._busy ? "background:#fffbeb" : ""}">
              <td><strong>${v.plate_no}</strong></td>
              <td>${v.vehicle_type || '<span class="td-muted">—</span>'}</td>
              <td>${v.capacity_kg} kg</td>
              <td>
                ${v.cooling_unit || '<span class="td-muted">—</span>'}
                ${v.cooling_capacity_btu ? `<div class="td-muted">${v.cooling_capacity_btu} BTU/hr</div>` : ""}
              </td>
              <td>
                ${v._busy
                  ? (v._busy.status === "DELAYED"
                      ? badge("DELAYED")
                      : v._busy.status === "IN_WAREHOUSE"
                      ? badge("IN_WAREHOUSE")
                      : badge("Busy"))
                  : badge(v.is_operational ? "Available" : "Inactive")}
              </td>
              <td>${v._busy
                ? `${faIcon("fa-truck-fast")} <strong>${v._busy.delivering}</strong> → ${v._busy.to}
                   <div class="td-muted" style="font-size:11px">${v._busy.status.replace(/_/g," ")}</div>`
                : '<span class="td-muted">—</span>'}</td>
              <td>${v.last_service_date ? fmtDate(v.last_service_date) : '<span class="td-muted">—</span>'}</td>
              <td class="td-actions">
                <button class="btn btn-ghost btn-sm" onclick='editVehicle(${JSON.stringify(v).replace(/'/g, "&#39;")})'>${faIcon("fa-pen-to-square")}</button>
                <button class="btn btn-danger btn-sm" onclick="deleteVehicle('${v.vehicle_id}')">${faIcon("fa-trash-can")}</button>
              </td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

function openVehicleModal(v = null) {
  document.getElementById("vehicle-modal-title").textContent = v ? "Edit Vehicle" : "Add Vehicle";
  document.getElementById("vehicle-id").value = v?.vehicle_id || "";
  document.getElementById("vehicle-plate").value = v?.plate_no || "";
  document.getElementById("vehicle-type").value = v?.vehicle_type || "";
  document.getElementById("vehicle-cooling").value = v?.cooling_unit || "";
  document.getElementById("vehicle-capacity").value = v?.capacity_kg || "";
  document.getElementById("vehicle-min-temp").value = v?.min_temp_capacity || "";

  if (document.getElementById("vehicle-cooling-capacity-btu")) {
    document.getElementById("vehicle-cooling-capacity-btu").value = v?.cooling_capacity_btu || "";
  }

  document.getElementById("vehicle-service-date").value = v?.last_service_date?.slice(0, 10) || "";
  document.getElementById("vehicle-operational").checked = v ? v.is_operational : true;
  document.getElementById("modal-vehicle").classList.add("open");
}

function editVehicle(v) {
  openVehicleModal(v);
}

async function saveVehicle() {
  const id = document.getElementById("vehicle-id").value;

  const body = {
    plate_no: document.getElementById("vehicle-plate").value.trim(),
    vehicle_type: document.getElementById("vehicle-type").value.trim(),
    cooling_unit: document.getElementById("vehicle-cooling").value.trim(),
    capacity_kg: +document.getElementById("vehicle-capacity").value,
    min_temp_capacity: document.getElementById("vehicle-min-temp").value || null,
    cooling_capacity_btu: document.getElementById("vehicle-cooling-capacity-btu")?.value || null,
    last_service_date: document.getElementById("vehicle-service-date").value || null,
    is_operational: document.getElementById("vehicle-operational").checked
  };

  if (!body.plate_no || !body.capacity_kg) {
    toast("Plate and capacity required", "error");
    return;
  }

  try {
    if (id) {
      await api(`/api/vehicles/${id}`, { method: "PUT", body });
    } else {
      await api("/api/vehicles", { method: "POST", body });
    }

    toast(id ? "Updated!" : "Added!");
    closeModal("vehicle");
    loadVehicles();
  } catch (e) {
    toast(e.message, "error");
  }
}

async function deleteVehicle(id) {
  if (!confirm("Delete?")) return;

  try {
    await api(`/api/vehicles/${id}`, { method: "DELETE" });
    toast("Deleted!");
    loadVehicles();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* ═══════════════════════════════════════════════════════════════
   HEAT MONITOR — FIXED for kW columns + load_ratio + humidity
   ═══════════════════════════════════════════════════════════════ */
async function loadMonitoring() {
  const tbody = document.getElementById("monitoring-tbody");
  if (!tbody) return;

  /* filter dropdown: "all" | "breach" | "overloaded" */
  const filter = document.getElementById("monitoring-filter")?.value || "";
  tbody.innerHTML = '<tr><td colspan="12"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    let url = "/api/monitoring";
    if (filter === "breach")     url += "?breach=true";
    if (filter === "overloaded") url += "?overloaded=true";

    monitoring = await api(url);

    tbody.innerHTML = !monitoring.length
      ? `<tr><td colspan="12">${emptyState("fa-temperature-half", "No sensor logs")}</td></tr>`
      : monitoring.map(m => {
          /* Support both flat (from v_heat_monitor view) and nested (joined) API responses */
          const product = m.product_name || m.shipment?.product?.name || "?";
          const farmer  = m.farmer_name  || m.shipment?.farmer?.name  || "?";
          const status  = m.shipment_status || m.shipment?.status || "?";

          /* kW columns — prefer the new _kw fields, fall back to legacy BTU-based fields */
          const heatKw    = m.calculated_heat_load_kw ?? m.heat_load_kw ?? null;
          const coolingKw = m.vehicle_cooling_cap_kw  ?? m.cooling_cap_kw  ?? null;
          const loadRatio = m.load_ratio ?? null;

          /* risk_level comes from v_heat_monitor view; calculate locally if missing */
          const riskLevel = m.risk_level
            ?? (loadRatio != null
                ? (loadRatio > 1.0 ? "HIGH RISK" : loadRatio > 0.8 ? "WARNING" : "SAFE")
                : (m.is_overloaded ? "HIGH RISK" : "SAFE"));

          /* Row highlight */
          const rowBg = riskLevel === "HIGH RISK" ? "background:#fff0f0"
                       : riskLevel === "WARNING"  ? "background:#fffbeb"
                       : "";

          const overloadBadge = m.is_overloaded
            ? `<span class="badge badge-red">${faIcon("fa-triangle-exclamation")} YES</span>`
            : '<span class="badge badge-green">NO</span>';

          const breachBadge = m.is_temp_breach
            ? `<span class="badge badge-yellow">${faIcon("fa-triangle-exclamation")} YES</span>`
            : '<span class="badge badge-green">NO</span>';

          const riskBadge = badge(riskLevel);

          /* ΔT (temp_difference in monitoring_sensor / delta_t in v_heat_monitor view) */
          const deltaT = m.temp_difference ?? m.delta_t ?? null;

          return `<tr style="${rowBg}">
            <td>
              <strong>${product}</strong>
              <div class="td-muted" style="font-size:11px">${farmer}</div>
            </td>
            <td>
              <span style="font-family:monospace;font-size:11px">${String(m.shipment_id || "").slice(0,8)}…</span>
              <div class="td-muted" style="font-size:11px">${badge(status)}</div>
            </td>
            <td><strong>${m.ambient_temp ?? "—"}°C</strong></td>
            <td><strong>${m.internal_temp ?? "—"}°C</strong></td>
            <td>
              ${m.ideal_temp_max != null ? m.ideal_temp_max + "°C" : "—"}
              ${deltaT != null ? `<div class="td-muted" style="font-size:11px">ΔT ${deltaT}°C</div>` : ""}
            </td>
            <td>${m.humidity != null ? m.humidity + "%" : "—"}</td>
            <td>
              ${heatKw != null ? `<strong>${Number(heatKw).toFixed(3)} kW</strong>` : "—"}
            </td>
            <td>
              ${coolingKw != null ? `${Number(coolingKw).toFixed(3)} kW` : "—"}
              ${loadRatio != null ? `<div class="td-muted" style="font-size:11px">ratio ${Number(loadRatio).toFixed(2)}</div>` : ""}
            </td>
            <td>${overloadBadge}</td>
            <td>${breachBadge}</td>
            <td>${riskBadge}</td>
            <td class="td-muted">${fmtDT(m.recorded_at)}</td>
          </tr>`;
        }).join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="12" style="color:var(--red);padding:16px">Error: ${e.message}</td></tr>`;
  }
}

function openSensorModal() {
  fillSelect(
    "sensor-shipment",
    shipments,
    "shipment_id",
    (s) => `${s.product?.name || "?"} — ${s.farmer?.name || "?"} (${s.status})`,
    true
  );

  // Clear all fields first
  ["sensor-ambient-temp", "sensor-internal-temp", "sensor-humidity", "sensor-gps-lat", "sensor-gps-lng"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  // When shipment is selected → auto-fill humidity + GPS from weather_cache
  document.getElementById("sensor-shipment").onchange = async function () {
    const shipmentId = this.value;
    if (!shipmentId) return;

    // Find the shipment in local cache
    const s = shipments.find(x => x.shipment_id === shipmentId);
    if (!s) return;

    // Auto-fill GPS from source district coordinates
    const srcDistrict = s.source_district || districts.find(d => d.district_id === s.source_district_id);
    if (srcDistrict?.latitude)  document.getElementById("sensor-gps-lat").value = srcDistrict.latitude;
    if (srcDistrict?.longitude) document.getElementById("sensor-gps-lng").value = srcDistrict.longitude;

    // Auto-fill humidity + ambient temp from weather_cache for source district
    try {
      const districtId = s.source_district_id || srcDistrict?.district_id;
      if (!districtId) return;

      const weatherRows = await api("/api/weather-cache");
      const cached = weatherRows.find(w => w.district_id === districtId);

      if (cached) {
        // Set humidity hint
        const humEl = document.getElementById("sensor-humidity");
        if (humEl && !humEl.value) {
          humEl.value = cached.humidity_pct ?? "";
          humEl.title = `Auto-filled from ${cached.district?.name} weather cache (${cached.condition_text ?? ""})`;
        }

        // Set ambient temp hint only if empty
        const ambEl = document.getElementById("sensor-ambient-temp");
        if (ambEl && !ambEl.value) {
          ambEl.value = cached.temp_celsius ?? "";
          ambEl.title = `Auto-filled from ${cached.district?.name} live weather`;
        }

        // Show hint label
        const hint = document.getElementById("sensor-weather-hint");
        if (hint && cached) {
          hint.style.display = "";
          hint.textContent = `📡 ${cached.district?.name}: ${cached.temp_celsius}°C, ${cached.humidity_pct}% humidity (${cached.condition_text ?? ""}) — fetched ${new Date(cached.fetched_at).toLocaleTimeString()}`;
        }
      } else {
        const hint = document.getElementById("sensor-weather-hint");
        if (hint) {
          hint.style.display = "";
          hint.textContent = "⚠️ No cached weather for this district — go to Weather Events → Fetch Live first";
          hint.style.color = "var(--yellow)";
        }
      }
    } catch (_) { /* weather cache optional */ }
  };

  document.getElementById("modal-sensor")?.classList.add("open");
}

async function saveSensorLog() {
  const body = {
    shipment_id:   document.getElementById("sensor-shipment").value,
    ambient_temp:  +document.getElementById("sensor-ambient-temp").value,
    internal_temp: +document.getElementById("sensor-internal-temp").value,
    humidity:  document.getElementById("sensor-humidity").value  ? +document.getElementById("sensor-humidity").value  : null,
    gps_lat:   document.getElementById("sensor-gps-lat").value   ? +document.getElementById("sensor-gps-lat").value   : null,
    gps_lng:   document.getElementById("sensor-gps-lng").value   ? +document.getElementById("sensor-gps-lng").value   : null
  };

  if (!body.shipment_id || Number.isNaN(body.ambient_temp) || Number.isNaN(body.internal_temp)) {
    toast("Shipment, ambient temp, and internal temp required", "error");
    return;
  }

  try {
    await api("/api/monitoring", { method: "POST", body });
    toast("Sensor log saved! Heat load auto-calculated by DB trigger.");
    closeModal("sensor");
    loadMonitoring();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* ═══════════════════════════════════════════════════════════════
   WEATHER — loads live cache cards + events table together
   ═══════════════════════════════════════════════════════════════ */

/* WMO code → Font Awesome icon class */
function wmoIcon(code, isDay = true) {
  if (code === 0)               return isDay ? 'fa-sun'                : 'fa-moon';
  if (code === 1)               return isDay ? 'fa-sun'                : 'fa-moon';
  if (code === 2)               return isDay ? 'fa-cloud-sun'          : 'fa-cloud-moon';
  if (code === 3)               return 'fa-cloud';
  if ([45,48].includes(code))   return 'fa-smog';
  if (code >= 51 && code <= 57) return 'fa-cloud-rain';
  if (code >= 61 && code <= 67) return 'fa-cloud-showers-heavy';
  if (code >= 71 && code <= 77) return 'fa-snowflake';
  if (code >= 80 && code <= 82) return 'fa-cloud-showers-heavy';
  if (code >= 85 && code <= 86) return 'fa-snowflake';
  if (code >= 95)               return 'fa-cloud-bolt';
  return 'fa-cloud';
}

/* Wind degrees → compass label */
function windDir(deg) {
  if (deg == null) return '—';
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
}

/* Colour-code temperature (Bangladesh context) */
function tempColor(t) {
  if (t == null) return 'var(--gray-500)';
  if (t >= 40)   return '#dc2626';
  if (t >= 35)   return '#ea580c';
  if (t >= 30)   return '#d97706';
  if (t >= 20)   return '#16a34a';
  if (t >= 10)   return '#2563eb';
  return '#7c3aed';
}

async function loadWeatherCache() {
  const grid    = document.getElementById('weather-cache-grid');
  const updEl   = document.getElementById('weather-cache-updated');
  const staleEl = document.getElementById('weather-cache-stale');
  if (!grid) return;

  grid.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  try {
    const rows = await api('/api/weather-cache');

    if (!rows.length) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--gray-500)">
          <i class="fas fa-satellite-dish" style="font-size:32px;margin-bottom:8px;display:block;opacity:.4"></i>
          No weather data yet. Click <strong>Fetch Live</strong> to pull from Open-Meteo.
        </div>`;
      return;
    }

    /* oldest fetch time to show staleness */
    const oldest = new Date(Math.min(...rows.map(r => new Date(r.fetched_at))));
    const minsOld = Math.round((Date.now() - oldest) / 60000);

    if (updEl) updEl.textContent = `Updated ${minsOld < 1 ? 'just now' : minsOld + 'm ago'}`;
    if (staleEl) staleEl.style.display = minsOld > 60 ? '' : 'none';

    grid.innerHTML = rows.map(w => {
      const icon      = wmoIcon(w.weather_code, w.is_day);
      const tColor    = tempColor(w.temp_celsius);
      const floodBadge = w.district?.flood_risk === 'HIGH'
        ? `<span class="badge badge-red" style="font-size:10px">High Flood</span>`
        : w.district?.flood_risk === 'MEDIUM'
        ? `<span class="badge badge-yellow" style="font-size:10px">Med Flood</span>`
        : '';

      const uvLevel = w.uv_index == null ? '—'
        : w.uv_index >= 11 ? `<span style="color:#dc2626;font-weight:600">${w.uv_index} Extreme</span>`
        : w.uv_index >= 8  ? `<span style="color:#ea580c;font-weight:600">${w.uv_index} Very High</span>`
        : w.uv_index >= 6  ? `<span style="color:#d97706;font-weight:600">${w.uv_index} High</span>`
        : `<span>${w.uv_index} Low–Mod</span>`;

      return `
        <div style="
          background:var(--gray-50);
          border:1px solid var(--gray-200);
          border-radius:10px;
          padding:14px 16px;
          display:flex;flex-direction:column;gap:6px;
        ">
          <!-- header: district + icon -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-weight:700;font-size:14px">${w.district?.name ?? '—'}</div>
              <div style="font-size:11px;color:var(--gray-500)">${w.district?.division ?? ''} ${floodBadge}</div>
            </div>
            <i class="fa-solid ${icon}" style="font-size:26px;color:${tColor};opacity:.85"></i>
          </div>

          <!-- temperature block -->
          <div style="display:flex;align-items:baseline;gap:6px;margin:4px 0">
            <span style="font-size:36px;font-weight:800;line-height:1;color:${tColor}">${w.temp_celsius ?? '—'}°</span>
            <span style="color:var(--gray-500);font-size:12px">
              Feels ${w.feels_like_celsius != null ? w.feels_like_celsius + '°C' : '—'}
            </span>
          </div>

          <!-- condition -->
          <div style="font-size:13px;font-weight:500;color:var(--gray-700)">${w.condition_text ?? '—'}</div>

          <!-- detail grid -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 8px;font-size:12px;margin-top:4px">
            <div style="color:var(--gray-500)"><i class="fas fa-droplet" style="width:12px"></i> Humidity</div>
            <div>${w.humidity_pct != null ? w.humidity_pct + '%' : '—'}</div>

            <div style="color:var(--gray-500)"><i class="fas fa-wind" style="width:12px"></i> Wind</div>
            <div>${w.wind_speed_kmh != null ? w.wind_speed_kmh + ' km/h ' + windDir(w.wind_direction_deg) : '—'}</div>

            <div style="color:var(--gray-500)"><i class="fas fa-cloud-rain" style="width:12px"></i> Rain</div>
            <div>${w.rain_mm != null ? w.rain_mm + ' mm' : '—'}</div>

            <div style="color:var(--gray-500)"><i class="fas fa-cloud" style="width:12px"></i> Cloud</div>
            <div>${w.cloud_cover_pct != null ? w.cloud_cover_pct + '%' : '—'}</div>

            <div style="color:var(--gray-500)"><i class="fas fa-sun" style="width:12px"></i> UV</div>
            <div>${uvLevel}</div>

            <div style="color:var(--gray-500)"><i class="fas fa-eye" style="width:12px"></i> Visibility</div>
            <div>${w.visibility_km != null ? w.visibility_km + ' km' : '—'}</div>
          </div>

          <div style="font-size:10px;color:var(--gray-400);margin-top:4px;text-align:right">
            ${fmtDT(w.fetched_at)}
          </div>
        </div>`;
    }).join('');

  } catch (e) {
    grid.innerHTML = `<div style="grid-column:1/-1;color:var(--red);padding:12px">Error: ${e.message}</div>`;
  }
}

async function refreshWeatherCache() {
  const btn = document.getElementById('weather-refresh-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-rotate-right fa-spin"></i> Fetching…'; }

  try {
    const r = await api('/api/weather-cache/refresh', { method: 'POST' });
    toast(r.errors?.length
      ? `Fetched ${r.updated} district(s). Errors: ${r.errors.join(', ')}`
      : `✅ Live weather updated for ${r.updated} district(s)!`
    );
    await loadWeatherCache();
  } catch (e) {
    toast('Fetch failed: ' + e.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-rotate-right"></i> Fetch Live'; }
  }
}

async function loadWeather() {
  /* Load both panels in parallel */
  loadWeatherCache();

  const tbody = document.getElementById("weather-tbody");
  tbody.innerHTML = '<tr><td colspan="8"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    const ev = await api("/api/weather-events");

    tbody.innerHTML = !ev.length
      ? `<tr><td colspan="8">${emptyState("fa-cloud-bolt", "No events")}</td></tr>`
      : ev
          .map(
            (e) => `<tr>
              <td><strong>${e.event_type.replace(/_/g, " ")}</strong></td>
              <td>${e.district?.name || "?"}</td>
              <td>${badge(e.severity_level)}</td>
              <td>${e.delay_impact_hours}h</td>
              <td class="td-muted">${fmtDT(e.started_at)}</td>
              <td class="td-muted">${e.ended_at ? fmtDT(e.ended_at) : "—"}</td>
              <td>${badge(e.ended_at ? "Inactive" : "Active")}</td>
              <td><button class="btn btn-ghost btn-sm" onclick='editWeather(${JSON.stringify(e).replace(/'/g, "&#39;")})'>${faIcon("fa-pen-to-square")}</button></td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="8" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

function openWeatherModal(e = null) {
  document.getElementById("weather-modal-title").textContent = e ? "Edit Event" : "Log Weather Event";
  document.getElementById("weather-id").value = e?.event_id || "";

  fillSelect("weather-district", districts, "district_id", (d) => d.name, true);

  if (e) {
    document.getElementById("weather-district").value = e.district_id;
    document.getElementById("weather-type").value = e.event_type;
    document.getElementById("weather-severity").value = e.severity_level || "LOW";
    document.getElementById("weather-delay").value = e.delay_impact_hours;
    document.getElementById("weather-started").value = toLocalDT(e.started_at);
    document.getElementById("weather-ended").value = e.ended_at ? toLocalDT(e.ended_at) : "";
    document.getElementById("weather-description").value = e.description || "";
  } else {
    document.getElementById("weather-started").value = toLocalDT(new Date().toISOString());
    ["weather-ended", "weather-description"].forEach((id) => {
      document.getElementById(id).value = "";
    });
    document.getElementById("weather-delay").value = "4";
    document.getElementById("weather-severity").value = "LOW";
  }

  document.getElementById("modal-weather").classList.add("open");
}

function editWeather(e) {
  openWeatherModal(e);
}

async function saveWeather() {
  const id = document.getElementById("weather-id").value;

  const body = {
    district_id:        document.getElementById("weather-district").value,
    event_type:         document.getElementById("weather-type").value,
    severity_level:     document.getElementById("weather-severity").value,
    delay_impact_hours: +document.getElementById("weather-delay").value || 0,
    started_at: new Date(document.getElementById("weather-started").value).toISOString(),
    ended_at:   document.getElementById("weather-ended").value
      ? new Date(document.getElementById("weather-ended").value).toISOString()
      : null,
    description: document.getElementById("weather-description").value.trim()
  };

  if (!body.district_id || !body.started_at) {
    toast("District and start time required", "error");
    return;
  }

  try {
    if (id) {
      await api(`/api/weather-events/${id}`, { method: "PUT", body });
    } else {
      await api("/api/weather-events", { method: "POST", body });
    }

    toast(id ? "Updated!" : "Event logged! Active shipments in this district auto-marked DELAYED.");
    closeModal("weather");
    loadWeather();
  } catch (e) {
    toast("DB Error: " + e.message, "error");
  }
}

/* Spoilage */
async function loadSpoilage() {
  const tbody = document.getElementById("spoilage-tbody");
  tbody.innerHTML = '<tr><td colspan="9"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    const d = await api("/api/spoilage");

    tbody.innerHTML = !d.length
      ? `<tr><td colspan="9">${emptyState("fa-triangle-exclamation", "No records")}</td></tr>`
      : d
          .map(
            (s) => `<tr>
              <td><strong>${s.shipment?.product?.name || "?"}</strong></td>
              <td>${s.shipment?.farmer?.name || "—"}</td>
              <td>${s.qty_sent} kg</td>
              <td>${s.qty_received} kg</td>
              <td style="color:var(--red);font-weight:600">${s.qty_spoiled} kg</td>
              <td>${s.spoilage_pct != null ? s.spoilage_pct.toFixed(1) + "%" : "—"}</td>
              <td>${[s.caused_by_heat_overload ? `${faIcon("fa-fire")} Heat` : "", s.caused_by_delay ? `${faIcon("fa-clock")} Delay` : "", s.spoilage_reason || ""].filter(Boolean).join(", ") || "—"}</td>
              <td style="color:var(--red)">${s.loss_amount != null ? bdt(s.loss_amount) : "—"}</td>
              <td class="td-muted">${fmtDT(s.detected_at)}</td>
            </tr>`
          )
          .join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="9" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

function openSpoilageModal() {
  fillSelect(
    "spoilage-shipment",
    shipments,
    "shipment_id",
    (s) => `${s.product?.name || "?"} — ${s.farmer?.name || "?"} (${s.shipment_id.slice(0, 8)})`,
    true
  );

  ["spoilage-sent", "spoilage-received", "spoilage-spoiled", "spoilage-reason"].forEach((id) => {
    document.getElementById(id).value = "";
  });

  document.getElementById("spoilage-heat").checked = false;
  document.getElementById("spoilage-delay").checked = false;
  document.getElementById("modal-spoilage").classList.add("open");
}

async function saveSpoilage() {
  const body = {
    shipment_id:           document.getElementById("spoilage-shipment").value,
    qty_sent:              +document.getElementById("spoilage-sent").value,
    qty_received:          +document.getElementById("spoilage-received").value,
    qty_spoiled:           +document.getElementById("spoilage-spoiled").value,
    spoilage_reason:       document.getElementById("spoilage-reason").value.trim(),
    caused_by_heat_overload: document.getElementById("spoilage-heat").checked,
    caused_by_delay:       document.getElementById("spoilage-delay").checked
  };

  if (!body.shipment_id || !body.qty_sent || !body.qty_received) {
    toast("Required fields missing", "error");
    return;
  }

  try {
    await api("/api/spoilage", { method: "POST", body });
    toast("Reported!");
    closeModal("spoilage");
    loadSpoilage();
  } catch (e) {
    toast(e.message, "error");
  }
}

/* ═══════════════════════════════════════════════════════════════
   PROVENANCE FEED — shows ALL actions across all tables
   ═══════════════════════════════════════════════════════════════ */

/* Map event_type → icon + colour */
function provIcon(type) {
  const map = {
    // Shipment lifecycle
    DEPARTURE:         { icon:"fa-truck-fast",           color:"var(--blue)"   },
    ARRIVAL:           { icon:"fa-flag-checkered",        color:"var(--green)"  },
    SHIPMENT_CREATED:  { icon:"fa-truck-loading",         color:"var(--blue)"   },
    WAREHOUSE_IN:      { icon:"fa-warehouse",             color:"var(--yellow)" },
    WAREHOUSE_OUT:     { icon:"fa-warehouse",             color:"var(--green)"  },
    DELAY:             { icon:"fa-clock",                 color:"var(--yellow)" },
    SPOILAGE:          { icon:"fa-skull-crossbones",      color:"var(--red)"    },
    SPOILAGE_CREATED:  { icon:"fa-triangle-exclamation",  color:"var(--red)"    },
    TEMP_RISE:         { icon:"fa-temperature-arrow-up",  color:"var(--red)"    },
    HEAT_OVERLOAD:     { icon:"fa-fire",                  color:"var(--red)"    },
    // Weather
    WEATHER_ALERT:     { icon:"fa-cloud-bolt",            color:"var(--red)"    },
    WEATHER_CREATED:   { icon:"fa-cloud-sun-rain",        color:"var(--yellow)" },
    WEATHER_UPDATED:   { icon:"fa-cloud",                 color:"var(--gray-500)"},
    // Price
    PRICE_CHANGE:      { icon:"fa-tags",                  color:"var(--blue)"   },
    // Sensor
    SENSOR_LOGGED:     { icon:"fa-temperature-half",      color:"var(--blue)"   },
    // Orders
    ORDER_CREATED:     { icon:"fa-cart-plus",             color:"var(--green)"  },
    ORDER_STATUS_CHANGE:{ icon:"fa-clipboard-check",      color:"var(--blue)"   },
    ORDER_ITEM_ADDED:  { icon:"fa-plus-circle",           color:"var(--green)"  },
    ORDER_ITEM_DELETED:{ icon:"fa-minus-circle",          color:"var(--yellow)" },
    // Farmers
    FARMER_CREATED:    { icon:"fa-user-plus",             color:"var(--green)"  },
    FARMER_UPDATED:    { icon:"fa-user-pen",              color:"var(--blue)"   },
    FARMER_DELETED:    { icon:"fa-user-minus",            color:"var(--red)"    },
    // Products
    PRODUCT_CREATED:   { icon:"fa-box-open",              color:"var(--green)"  },
    PRODUCT_UPDATED:   { icon:"fa-pen-to-square",         color:"var(--blue)"   },
    PRODUCT_DELETED:   { icon:"fa-trash-can",             color:"var(--red)"    },
    // Vehicles
    VEHICLE_CREATED:   { icon:"fa-truck-medical",         color:"var(--green)"  },
    VEHICLE_UPDATED:   { icon:"fa-screwdriver-wrench",    color:"var(--blue)"   },
    VEHICLE_DELETED:   { icon:"fa-truck",                 color:"var(--red)"    },
    // Warehouses
    WAREHOUSE_CREATED: { icon:"fa-warehouse",             color:"var(--green)"  },
    WAREHOUSE_UPDATED: { icon:"fa-pen-to-square",         color:"var(--blue)"   },
  };
  return map[type] || { icon:"fa-circle-info", color:"var(--gray-500)" };
}

/* Which "table" did this event come from? */
function provTable(type) {
  if (type.startsWith("FARMER"))    return "Farmer";
  if (type.startsWith("PRODUCT"))   return "Product";
  if (type.startsWith("VEHICLE"))   return "Vehicle";
  if (type.startsWith("WAREHOUSE")) return "Warehouse";
  if (type.startsWith("ORDER"))     return "Order";
  if (type.startsWith("WEATHER"))   return "Weather";
  if (type.startsWith("SENSOR"))    return "Sensor";
  if (type.startsWith("SPOILAGE"))  return "Spoilage";
  if (["DEPARTURE","ARRIVAL","SHIPMENT_CREATED","DELAY"].includes(type)) return "Shipment";
  if (["TEMP_RISE","HEAT_OVERLOAD"].includes(type))   return "Heat Monitor";
  if (type === "PRICE_CHANGE")      return "Price";
  return "";
}

async function loadProvenance() {
  const feed = document.getElementById("prov-feed");
  feed.innerHTML = '<div class="loader"><div class="spinner"></div></div>';

  const sev   = document.getElementById("prov-severity-filter")?.value || "";
  const table = document.getElementById("prov-table-filter")?.value || "";

  try {
    const ev = await api(`/api/provenance${sev ? "?severity=" + sev : ""}`);

    if (!ev.length) {
      feed.innerHTML = emptyState("fa-route", "No events yet — start adding data!");
      return;
    }

    // client-side table filter
    const filtered = table
      ? ev.filter(e => provTable(e.event_type) === table)
      : ev;

    if (!filtered.length) {
      feed.innerHTML = emptyState("fa-filter", `No ${table} events found`);
      return;
    }

    feed.innerHTML = filtered.map(e => {
      const { icon, color } = provIcon(e.event_type);
      const tbl = provTable(e.event_type);
      const label = e.event_type.replace(/_/g, " ");

      return `<div class="event-item" style="align-items:flex-start">
        <div style="
          width:36px;height:36px;border-radius:50%;
          background:${color}22;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;margin-top:2px
        ">
          <i class="fa-solid ${icon}" style="color:${color};font-size:14px"></i>
        </div>
        <div style="flex:1;min-width:0">
          <div class="event-title" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            <strong style="font-size:13px">${label}</strong>
            ${badge(e.severity)}
            ${tbl ? `<span style="
              background:var(--gray-100);color:var(--gray-500);
              font-size:10px;padding:1px 7px;border-radius:10px;font-weight:600;
              text-transform:uppercase;letter-spacing:.4px
            ">${tbl}</span>` : ""}
            ${e.shipment?.product?.name
              ? `<span class="td-muted" style="font-size:12px">${e.shipment.product.name}</span>`
              : ""}
          </div>
          <div class="event-meta" style="margin-top:3px;font-size:12px;color:var(--gray-500)">
            ${e.description
              ? `<span style="color:var(--gray-700)">${e.description}</span> &nbsp;·&nbsp; `
              : ""}
            <span>${fmtDT(e.event_time)}</span>
            ${e.shipment?.farmer?.name
              ? ` &nbsp;·&nbsp; <i class="fa-solid fa-user" style="font-size:10px"></i> ${e.shipment.farmer.name}`
              : ""}
          </div>
        </div>
      </div>`;
    }).join("");

  } catch (e) {
    feed.innerHTML = `<p style="color:var(--red)">Error: ${e.message}</p>`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   PRICE AUDIT — FIXED for DELIVERY_PROFIT rows
   Now renders two distinct row styles:
     • Price-change rows  (WEATHER_ADJ, SPOILAGE_ADJ, etc.)
     • Delivery rows      (DELIVERY_PROFIT — profit/loss per shipment)
   ═══════════════════════════════════════════════════════════════ */
async function loadPriceAudit() {
  const tbody = document.getElementById("audit-tbody");
  tbody.innerHTML = '<tr><td colspan="10"><div class="loader"><div class="spinner"></div></div></td></tr>';

  try {
    const d = await api("/api/price-audit");

    tbody.innerHTML = !d.length
      ? `<tr><td colspan="10">${emptyState("fa-chart-line", "No changes")}</td></tr>`
      : d.map((a) => {

          /* ── DELIVERY_PROFIT row ─────────────────────────────── */
          if (a.change_type === "DELIVERY_PROFIT") {
            const profitColor = a.profit_status === "PROFIT"     ? "var(--green)"
                               : a.profit_status === "LOSS"       ? "var(--red)"
                               : "var(--gray-500)";

            const profitSign  = a.profit_status === "PROFIT" ? "▲" : a.profit_status === "LOSS" ? "▼" : "=";

            return `<tr style="background:#f0fdf4">
              <td>
                <strong>${a.product?.name || a.product_name || "?"}</strong>
                <div class="td-muted" style="font-size:11px">${a.category || ""}</div>
              </td>
              <td colspan="2">
                <span class="badge badge-green">DELIVERY</span>
                <div class="td-muted" style="font-size:11px">Qty: ${a.qty_delivered ?? "—"} units @ ${bdt(a.sell_price)}</div>
              </td>
              <td>
                <span style="font-weight:600">Revenue</span><br>
                <strong>${bdt(a.revenue)}</strong>
              </td>
              <td>
                <span style="color:var(--gray-500)">Cost: ${bdt(a.total_cost)}</span>
              </td>
              <td>
                <strong style="color:${profitColor}">${profitSign} ${bdt(Math.abs(a.gross_profit ?? 0))}</strong>
                <div class="td-muted" style="font-size:11px">${a.profit_margin_pct != null ? a.profit_margin_pct.toFixed(1) + "% margin" : ""}</div>
              </td>
              <td>${badge(a.profit_status ?? "BREAK_EVEN")}</td>
              <td class="td-muted" style="font-size:12px">
                ${a.farmer_name || a.product?.farmer?.name || "—"}
                ${a.source_district ? `<div>${faIcon("fa-location-dot")} ${a.source_district}</div>` : ""}
              </td>
              <td class="td-muted" style="font-size:11px">${a.price_source ?? "AUTO"}</td>
              <td class="td-muted">${fmtDT(a.changed_at)}</td>
            </tr>`;
          }

          /* ── Regular price-change row ────────────────────────── */
          const diff = Number(a.new_price ?? 0) - Number(a.old_price ?? 0);
          const pct  = a.increase_pct != null
            ? Number(a.increase_pct).toFixed(1)
            : a.old_price ? ((diff / a.old_price) * 100).toFixed(1) : "0.0";

          const diffColor = diff > 0 ? "var(--red)" : diff < 0 ? "var(--green)" : "var(--gray-500)";
          const diffArrow = diff > 0 ? "▲" : diff < 0 ? "▼" : "=";

          return `<tr>
            <td>
              <strong>${a.product?.name || a.product_name || "?"}</strong>
              <div class="td-muted" style="font-size:11px">${a.category || a.product?.category || ""}</div>
            </td>
            <td>${bdt(a.old_price)}</td>
            <td><strong>${bdt(a.new_price)}</strong></td>
            <td style="color:${diffColor}">
              ${diffArrow} ${bdt(Math.abs(diff))}
              <div class="td-muted" style="font-size:11px">${Math.abs(pct)}%</div>
            </td>
            <td><span class="badge badge-blue">${(a.change_type || "").replace(/_/g, " ")}</span></td>
            <td>
              ${badge(a.profit_status ?? (a.price_source === "AUTO" ? "INFO" : "INFO"))}
              <div class="td-muted" style="font-size:11px">${a.price_source ?? "MANUAL"}</div>
            </td>
            <td class="td-muted" style="font-size:12px">${a.reason || a.market_note || "—"}</td>
            <td class="td-muted" style="font-size:12px">
              ${a.weather_cause ? `${faIcon("fa-cloud-bolt")} ${a.weather_cause} (${a.weather_severity || ""})` : ""}
              ${a.weather_district ? `<div>${faIcon("fa-location-dot")} ${a.weather_district}</div>` : ""}
              ${!a.weather_cause ? (a.farmer_name || "—") : ""}
            </td>
            <td class="td-muted" style="font-size:11px">${a.price_source ?? "MANUAL"}</td>
            <td class="td-muted">${fmtDT(a.changed_at)}</td>
          </tr>`;
        }).join("");
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="10" style="color:var(--red)">Error: ${e.message}</td></tr>`;
  }
}

/* Init */
async function init() {
  try {
    districts = await api("/api/districts");
    const el = document.getElementById("db-status");
    el.classList.add(districts.length ? "online" : "offline");
    document.getElementById("db-status-text").textContent = districts.length
      ? "Supabase Connected"
      : "No data — check /api/debug";
  } catch (e) {
    document.getElementById("db-status").classList.add("offline");
    document.getElementById("db-status-text").textContent = "Server error";
  }

  try { farmers    = await api("/api/farmers");    } catch {}
  try { products   = await api("/api/products");   } catch {}
  try { vehicles   = await api("/api/vehicles");   } catch {}
  try { warehouses = await api("/api/warehouses"); } catch {}
  try { shipments  = await api("/api/shipments");  } catch {}

  navigate(location.hash || "#dashboard");
}

init();