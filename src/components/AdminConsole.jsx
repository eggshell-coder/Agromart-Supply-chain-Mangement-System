import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_566VpDhmAdFAWvayT7fIw_XvWswQXW'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })

async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const r = await fetch(path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const ct = r.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(data.error || r.statusText || 'Request failed')
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
    const { data, error: err } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
    if (err) setError(err.message)
    else setProfiles(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const setRole = async (id, role) => {
    setUpdating(id)
    const { error: err } = await supabase.from('profiles').update({ role }).eq('id', id)
    if (err) alert(err.message)
    else await load()
    setUpdating(null)
  }

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading users…</div>
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-green-950">User Management</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Email', 'Role', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">{p.email || p.id}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    p.role === 'admin' ? 'bg-red-100 text-red-800' :
                    p.role === 'user' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>{p.role || 'pending'}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {['pending', 'user', 'admin'].map(r => (
                      <button
                        key={r}
                        type="button"
                        disabled={p.role === r || updating === p.id}
                        onClick={() => setRole(p.id, r)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 ${
                          p.role === r ? 'bg-gray-100 text-gray-500 cursor-default' : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Admin Console ────────────────────────────────────────────────────────────
export default function AdminConsole({ role }) {
  const [open, setOpen] = useState(false)

  if (role !== 'admin') return null

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
