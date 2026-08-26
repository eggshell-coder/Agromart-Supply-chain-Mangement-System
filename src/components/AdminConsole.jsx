import { useEffect, useState } from 'react'

async function api(path, opts = {}) {
  const token = sessionStorage.getItem('agromart_token')
  const r = await fetch(path, { ...opts, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(opts.headers || {}) }, body: opts.body ? JSON.stringify(opts.body) : undefined })
  const ct = r.headers.get('content-type') || ''
  const d = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(d.error || r.statusText || 'Request failed')
  return d
}

export default function AdminConsole({ role }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('staff')
  const [staff, setStaff] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    if (role !== 'superadmin') return
    setLoading(true); setError('')
    try {
      if (tab === 'staff') setStaff(await api('/api/admin/staff'))
      else setHistory(await api('/api/audit/history?limit=200'))
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { if (open) load() }, [open, tab, role])
  if (!['admin','superadmin'].includes(role)) return null

  return <>
    <button onClick={() => setOpen(true)} className="fixed right-5 bottom-5 z-[250] px-4 py-3 rounded-2xl bg-gray-950 text-white shadow-2xl font-bold text-sm hover:bg-gray-800">
      {role === 'superadmin' ? '🛡️ Governance' : '⚙️ Admin'}
    </button>
    {open && <div className="fixed inset-0 z-[300] bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setOpen(false)}>
      <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div><h2 className="text-lg font-extrabold text-gray-950">{role === 'superadmin' ? 'Super Admin Governance' : 'Administrator'}</h2><p className="text-xs text-gray-500">Transparent access control and accountability</p></div>
          <button onClick={() => setOpen(false)} className="text-2xl font-bold text-gray-500">×</button>
        </div>
        {role === 'superadmin' ? <>
          <div className="flex gap-2 px-5 py-3 border-b bg-gray-50"><button onClick={() => setTab('staff')} className={`px-4 py-2 rounded-xl text-sm font-bold ${tab==='staff'?'bg-green-600 text-white':'bg-white text-gray-700 border'}`}>Staff & approvals</button><button onClick={() => setTab('history')} className={`px-4 py-2 rounded-xl text-sm font-bold ${tab==='history'?'bg-green-600 text-white':'bg-white text-gray-700 border'}`}>Full audit history</button><button onClick={load} className="ml-auto px-3 py-2 rounded-xl border bg-white text-sm font-bold">Refresh</button></div>
          <div className="p-5 overflow-y-auto max-h-[68vh]">{error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>}{loading ? <div className="py-12 text-center text-gray-500">Loading…</div> : tab === 'staff' ? <StaffTable rows={staff} onChanged={load}/> : <AuditTable rows={history}/>}</div>
        </> : <div className="p-6"><div className="p-4 rounded-xl bg-blue-50 text-blue-800 text-sm">Admin access is enabled for operational work. The full change history, actor identity, staff governance, and audit trail are intentionally restricted to Super Admin.</div></div>}
      </div>
    </div>}
  </>
}

function StaffTable({ rows, onChanged }) {
  const [busy, setBusy] = useState('')
  const setRole = async (id, role) => { setBusy(id); try { await api(`/api/admin/staff/${id}`, { method:'PATCH', body:{ role } }); onChanged() } catch (e) { alert(e.message) } finally { setBusy('') } }
  return <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b text-gray-500"><th className="p-3">Staff</th><th className="p-3">Requested</th><th className="p-3">Current role</th><th className="p-3">Created</th><th className="p-3">Decision</th></tr></thead><tbody>{rows.map(r => <tr key={r.id} className="border-b"><td className="p-3 font-semibold">{r.full_name || '—'}</td><td className="p-3"><span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">{r.requested_role || 'user'}</span></td><td className="p-3">{r.role}</td><td className="p-3 text-gray-500">{r.created_at ? new Date(r.created_at).toLocaleString('en-BD') : '—'}</td><td className="p-3 flex gap-2">{r.role === 'pending' && <><button disabled={busy===r.id} onClick={() => setRole(r.id, r.requested_role === 'superadmin' ? 'superadmin' : 'admin')} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold">Approve</button><button disabled={busy===r.id} onClick={() => setRole(r.id, 'user')} className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold">User</button></>}</td></tr>)}</tbody></table></div>
}

function AuditTable({ rows }) {
  return <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left border-b text-gray-500"><th className="p-3">Time</th><th className="p-3">Actor</th><th className="p-3">Role</th><th className="p-3">Action</th><th className="p-3">Entity</th><th className="p-3">Result</th></tr></thead><tbody>{rows.map(r => <tr key={r.audit_id} className="border-b align-top"><td className="p-3 whitespace-nowrap">{new Date(r.created_at).toLocaleString('en-BD')}</td><td className="p-3 font-semibold">{r.actor_name || r.actor_user_id || '—'}</td><td className="p-3">{r.actor_role}</td><td className="p-3 font-mono text-xs">{r.action}</td><td className="p-3">{r.entity}{r.entity_id ? <div className="text-[10px] text-gray-400 break-all">{r.entity_id}</div> : null}</td><td className="p-3">{r.status_code}</td></tr>)}</tbody></table></div>
}
