import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const workflowPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'src/components/WorkflowPages.jsx')
const workflowSource = readFileSync(workflowPath, 'utf8')
const orderPage = workflowSource.match(/function OrdersPage\(\) \{[\s\S]*?\n\}\n\nfunction ShipmentsPage/)?.[0]?.replace(/\n\nfunction ShipmentsPage$/, '')
const shipmentPage = workflowSource.match(/function ShipmentsPage\(\) \{[\s\S]*?\n\}\n?$/)?.[0]

function workflowPlugin() {
  return {
    name: 'agromart-workflow-pages',
    transform(code, id) {
      if (!id.endsWith('/src/components/Dashboard.jsx')) return null
      const orderStart = code.indexOf('function OrdersPage() {')
      const shipmentStart = code.indexOf('function ShipmentsPage() {')
      const warehouseMarker = '\n// ═══════════════════════════════════════════════════════════════\n// WAREHOUSES PAGE'
      if (orderStart < 0 || shipmentStart < 0) return null
      const warehouseStart = code.indexOf(warehouseMarker, shipmentStart)
      if (warehouseStart < 0 || !orderPage || !shipmentPage) return null
      const before = code.slice(0, orderStart)
      const after = code.slice(warehouseStart)
      return { code: before + orderPage + '\n\n' + shipmentPage + after, map: null }
    },
  }
}

export default defineConfig({
  plugins: [workflowPlugin(), react()],
  server: {
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:3000', changeOrigin: true } },
  },
  optimizeDeps: { entries: ['src/main.jsx'] },
})
