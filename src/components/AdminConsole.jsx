import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

async function api(path, opts = {}) {
  const { data: { session } } = await supabase.auth.getSession()
  const token = session?.access_token
  const headers = { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}), ...(opts.headers || {}) }
  const r = await fetch(path, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined })
  const ct = r.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ─── User Management ──────────────────────────────────────────────────────────
function UserManagement() {
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api('/api/admin/staff')
      setProfiles(data || [])
      setError('')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const setRole = async (id, role) => {
    setUpdating(id)
    try {
      await api('/api/admin/staff/' + id, { method: 'PATCH', body: { role } })
      await load()
    } catch (err) { alert(err.message) }
    finally { setUpdating(null) }
  }

// ─── Admin Console ────────────────────────────────────────────────────────────
export default function AdminConsole({ role }) {
  const [open, setOpen] = useState(false)

  if (!['admin', 'superadmin'].includes(role)) return null

  return (
    <>
      {/* Floating admin button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[200] px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold shadow-lg hover:bg-red-700 transition-colors"
      >
        ⚙️ Admin
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[250] bg-black/60 flex items-center justify-center p-4"
          onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-xl text-gray-900">Admin Console</h2>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500 text-2xl font-bold">×</button>
            </div>
            <UserManagement />
          </div>
        </div>
      )}
    </>
  )
}
