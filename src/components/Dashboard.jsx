import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// API HELPER
// ═══════════════════════════════════════════════════════════════
async function api(path, opts = {}) {
  const r = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  })
  const ct = r.headers.get('content-type') || ''
  const d  = ct.includes('application/json') ? await r.json() : {}
  if (!r.ok) throw new Error(d.error || r.statusText || 'Request failed')
  return d
}

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════
function bdt(n) {
  const v = Math.abs(Number(n || 0))
  if (v >= 1000000) return `৳${(v/1000000).toFixed(1)}L`
  if (v >= 1000)    return `৳${(v/1000).toFixed(1)}K`
  return `৳${Math.round(v).toLocaleString()}`
}
function fmtDT(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('en-BD',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})
}
function fmtDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-BD',{day:'2-digit',month:'short',year:'numeric'})
}
function toLocalDT(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return new Date(d - d.getTimezoneOffset()*60000).toISOString().slice(0,16)
}

// ═══════════════════════════════════════════════════════════════
// TOAST SYSTEM
// ═══════════════════════════════════════════════════════════════
let _setToasts = null
function useToastSystem() {
  const [toasts, setToasts] = useState([])
  _setToasts = setToasts
  return toasts
}
const toast = {
  show(msg, type='success') {
    const id = Date.now()
    _setToasts?.(prev => [...prev, { id, msg, type }])
    setTimeout(() => _setToasts?.(prev => prev.filter(t => t.id !== id)), 4000)
  },
  success(msg) { toast.show(msg,'success') },
  error(msg)   { toast.show(msg,'error') },
}
function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-3 rounded-xl text-sm font-medium shadow-lg text-white
          ${t.type==='error'?'bg-red-600':'bg-green-600'}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${wide?'max-w-2xl':'max-w-lg'} max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-lg text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-600 text-2xl leading-none font-bold">×</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

function Field({ label, type='text', value, onChange, options, required, placeholder, min, step, rows }) {
  const cls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}{required&&<span className="text-red-500 ml-0.5">*</span>}</label>
      {type==='select' ? (
        <select className={cls} value={value||''} onChange={e=>onChange(e.target.value)} required={required}>
          <option value="">— Select —</option>
          {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type==='checkbox' ? (
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!value} onChange={e=>onChange(e.target.checked)}
            className="w-4 h-4 accent-green-600"/>
          <span className="text-sm text-gray-700">{placeholder}</span>
        </label>
      ) : type==='textarea' ? (
        <textarea className={cls} value={value||''} onChange={e=>onChange(e.target.value)}
          rows={rows||3} placeholder={placeholder}/>
      ) : (
        <input className={cls} type={type} value={value??''} onChange={e=>onChange(e.target.value)}
          required={required} placeholder={placeholder} min={min} step={step}/>
      )}
    </div>
  )
}

function PageHeader({ title, sub, children }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="text-xl font-extrabold text-gray-950">{title}</h2>
        {sub && <p className="text-sm text-gray-700 mt-0.5 font-medium">{sub}</p>}
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

function AddBtn({ onClick, label='+ Add' }) {
  return <button onClick={onClick}
    className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition">{label}</button>
}

function Loader() {
  return <div className="flex items-center justify-center h-48">
    <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"/>
  </div>
}

function Empty({ icon='📭', msg }) {
  return <div className="flex flex-col items-center justify-center h-40 text-gray-600 gap-2">
    <span className="text-4xl">{icon}</span><p className="text-sm font-medium text-gray-700">{msg}</p>
  </div>
}

const STATUS_COLOR = {
  PENDING:'bg-yellow-100 text-yellow-800', IN_TRANSIT:'bg-blue-100 text-blue-800',
  IN_WAREHOUSE:'bg-purple-100 text-purple-800', DELAYED:'bg-red-100 text-red-800',
  DELIVERED:'bg-green-100 text-green-800', PARTIALLY_DELIVERED:'bg-green-100 text-green-700',
  SPOILED:'bg-red-100 text-red-800', CANCELLED:'bg-gray-100 text-gray-600',
  PLACED:'bg-blue-100 text-blue-700', CONFIRMED:'bg-indigo-100 text-indigo-700',
  RETURNED:'bg-gray-100 text-gray-600', LOW:'bg-green-100 text-green-700',
  MEDIUM:'bg-yellow-100 text-yellow-700', HIGH:'bg-red-100 text-red-700',
  INFO:'bg-blue-100 text-blue-700', WARNING:'bg-yellow-100 text-yellow-700',
  CRITICAL:'bg-red-100 text-red-700', Active:'bg-green-100 text-green-700',
  Inactive:'bg-gray-100 text-gray-500',
}
function Badge({ s }) {
  const cls = STATUS_COLOR[s] || 'bg-gray-100 text-gray-600'
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${cls}`}>{String(s||'').replace(/_/g,' ')}</span>
}

const SHIP_STATUSES = ['PENDING','IN_TRANSIT','IN_WAREHOUSE','DELIVERED','PARTIALLY_DELIVERED','SPOILED','DELAYED','CANCELLED']
const ORDER_STATUSES = ['PLACED','CONFIRMED','IN_TRANSIT','DELAYED','DELIVERED','PARTIALLY_DELIVERED','CANCELLED','RETURNED']
const DISTRICTS_CACHE = { data: null }

async function loadDistricts() {
  if (!DISTRICTS_CACHE.data) DISTRICTS_CACHE.data = await api('/api/districts')
  return DISTRICTS_CACHE.data || []
}

function sortWeatherCache(rows = []) {
  return [...rows].sort((a, b) => (a?.district?.name || '').localeCompare(b?.district?.name || ''))
}

function formatMetric(value, unit = '', digits = 0) {
  if (value == null || value === '') return '—'
  const n = Number(value)
  if (!Number.isFinite(n)) return '—'
  return `${n.toFixed(digits)}${unit}`
}

function describeWeather(row) {
  const parts = [
    row?.condition_text,
    row?.temp_celsius != null ? `${formatMetric(row.temp_celsius, '°C')} temp` : null,
    row?.rain_mm != null ? `${formatMetric(row.rain_mm, ' mm')} rain` : null,
    row?.wind_speed_kmh != null ? `${formatMetric(row.wind_speed_kmh, ' km/h')} wind` : null,
  ].filter(Boolean)
  return parts.join(' | ')
}

function deriveWeatherEvent(row) {
  const temp = Number(row?.temp_celsius ?? NaN)
  const feelsLike = Number(row?.feels_like_celsius ?? NaN)
  const rain = Number(row?.rain_mm ?? 0)
  const precipitation = Number(row?.precipitation_mm ?? 0)
  const wind = Number(row?.wind_speed_kmh ?? 0)
  const uv = Number(row?.uv_index ?? 0)
  const code = Number(row?.weather_code ?? -1)
  const floodRisk = String(row?.district?.flood_risk || '').toUpperCase()

  if ([95, 96, 99].includes(code) || wind >= 70) {
    return { event_type: 'Cyclone', severity_level: 'HIGH', delay_impact_hours: 18 }
  }
  if (wind >= 50 || [82].includes(code)) {
    return { event_type: 'Storm', severity_level: 'MEDIUM', delay_impact_hours: 10 }
  }
  if (precipitation >= 25 || rain >= 20 || [65, 67].includes(code)) {
    return { event_type: floodRisk === 'HIGH' ? 'Flood' : 'Heavy_Rain', severity_level: 'HIGH', delay_impact_hours: 12 }
  }
  if (precipitation >= 12 || rain >= 8 || [61, 63, 80, 81].includes(code)) {
    return { event_type: floodRisk === 'HIGH' ? 'Flood' : 'Heavy_Rain', severity_level: 'MEDIUM', delay_impact_hours: 6 }
  }
  if (temp >= 39 || feelsLike >= 43 || uv >= 9) {
    return { event_type: 'Heatwave', severity_level: 'HIGH', delay_impact_hours: 10 }
  }
  if (temp >= 35 || feelsLike >= 39) {
    return { event_type: 'Heatwave', severity_level: 'MEDIUM', delay_impact_hours: 6 }
  }
  if (temp <= 8) {
    return { event_type: 'Cold_Wave', severity_level: 'HIGH', delay_impact_hours: 10 }
  }
  if (temp <= 12) {
    return { event_type: 'Cold_Wave', severity_level: 'LOW', delay_impact_hours: 4 }
  }
  return null
}

// ═══════════════════════════════════════════════════════════════
// CHART COMPONENTS (Dashboard Overview)
// ═══════════════════════════════════════════════════════════════
function LineChart({ data }) {
  if (!data || data.length < 2) return <div className="flex items-center justify-center h-full text-gray-500 text-sm">No spoilage data yet</div>
  const W=520, H=150, P={t:16,r:12,b:36,l:38}
  const vals = data.map(d=>d.rate), maxV=Math.max(...vals,4)
  const xs = data.map((_,i)=>P.l+(i/(data.length-1))*(W-P.l-P.r))
  const ys = vals.map(v=>P.t+(1-v/maxV)*(H-P.t-P.b))
  const pts = xs.map((x,i)=>`${x},${ys[i]}`).join(' ')
  const area = `M${xs[0]},${ys[0]} `+xs.slice(1).map((x,i)=>`L${x},${ys[i+1]}`).join(' ')+` L${xs[xs.length-1]},${H-P.b} L${xs[0]},${H-P.b} Z`
  return <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
    {[0,maxV*0.5,maxV].map((v,i)=>{const y=P.t+(1-v/maxV)*(H-P.t-P.b);return<g key={i}><line x1={P.l} x2={W-P.r} y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1"/><text x={P.l-5} y={y+4} textAnchor="end" fontSize="10" fill="#9ca3af">{v.toFixed(1)}%</text></g>})}
    <path d={area} fill="#ef444415"/>
    <polyline points={pts} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
    {xs.map((x,i)=><g key={i}><circle cx={x} cy={ys[i]} r="4" fill="#ef4444" stroke="white" strokeWidth="2"/><text x={x} y={H-P.b+14} textAnchor="middle" fontSize="9.5" fill="#6b7280">{data[i].label.replace(' weeks ago','w').replace('This week','Now').replace('Last week','1w')}</text>{vals[i]>0&&<text x={x} y={ys[i]-8} textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="600">{vals[i]}%</text>}</g>)}
  </svg>
}

function DonutChart({ data }) {
  if (!data||!Object.keys(data).length) return <div className="flex items-center justify-center h-full text-gray-500 text-sm">No shipment data</div>
  const C={DELIVERED:'#16a34a',PARTIALLY_DELIVERED:'#4ade80',IN_TRANSIT:'#3b82f6',PENDING:'#eab308',DELAYED:'#f97316',IN_WAREHOUSE:'#a855f7',SPOILED:'#ef4444',CANCELLED:'#9ca3af'}
  const entries=Object.entries(data).filter(([,v])=>v>0), sum=entries.reduce((a,[,v])=>a+v,0)
  let cum=0
  const slices=entries.map(([label,val])=>{const pct=val/sum,start=cum*2*Math.PI-Math.PI/2;cum+=pct;const end=cum*2*Math.PI-Math.PI/2,R=55,cx=80,cy=75;return{label,val,color:C[label]||'#9ca3af',d:`M${cx},${cy} L${cx+R*Math.cos(start)},${cy+R*Math.sin(start)} A${R},${R} 0 ${pct>0.5?1:0},1 ${cx+R*Math.cos(end)},${cy+R*Math.sin(end)} Z`,R,cx,cy}})
  return <svg viewBox="0 0 260 155" className="w-full h-full">
    {slices.map((s,i)=><path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth="1.5"/>)}
    <circle cx={80} cy={75} r={55*0.52} fill="white"/>
    <text x={80} y={71} textAnchor="middle" fontSize="14" fontWeight="700" fill="#111">{sum}</text>
    <text x={80} y={85} textAnchor="middle" fontSize="9" fill="#6b7280">Total</text>
    {slices.map((s,i)=><g key={i}><rect x={150} y={6+i*18} width={9} height={9} rx="2" fill={s.color}/><text x={162} y={14+i*18} fontSize="9" fill="#374151">{s.label.replace(/_/g,' ')} ({s.val})</text></g>)}
  </svg>
}

function BarChart({ data }) {
  if (!data||!data.length) return <div className="flex items-center justify-center h-full text-gray-500 text-sm">No data</div>
  const W=520,H=110,P={t:6,r:8,b:24,l:28}
  const max=Math.max(...data.map(d=>d.count),1), bW=Math.max(2,(W-P.l-P.r)/data.length-1.5)
  return <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
    {[0,Math.ceil(max/2),max].map((v,i)=>{const y=P.t+(1-v/max)*(H-P.t-P.b);return<g key={i}><line x1={P.l} x2={W-P.r} y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1"/><text x={P.l-3} y={y+3} textAnchor="end" fontSize="8" fill="#9ca3af">{v}</text></g>})}
    {data.map((d,i)=>{const barH=(d.count/max)*(H-P.t-P.b),x=P.l+i*(bW+1.5),y=H-P.b-barH,showLbl=i===0||i===Math.floor(data.length/2)||i===data.length-1;return<g key={i}><rect x={x} y={y} width={bW} height={Math.max(barH,1)} rx="2" fill="#16a34a" fillOpacity={d.count?0.8:0.12}/>{showLbl&&<text x={x+bW/2} y={H-P.b+10} textAnchor="middle" fontSize="8" fill="#9ca3af">{d.day}</text>}</g>})}
  </svg>
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD OVERVIEW PAGE
// ═══════════════════════════════════════════════════════════════
function DashboardOverview() {
  const [analytics,   setAnalytics]   = useState(null)
  const [coldChain,   setColdChain]   = useState([])
  const [activeShips, setActiveShips] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timer = useRef(null)

  const loadAll = useCallback(async () => {
    try {
      const [a, cc, as_] = await Promise.all([
        api('/api/dashboard/analytics'),
        api('/api/dashboard/cold-chain').catch(()=>[]),
        api('/api/dashboard/active-shipments').catch(()=>[]),
      ])
      setAnalytics(a); setColdChain(Array.isArray(cc)?cc:[]); setActiveShips(Array.isArray(as_)?as_:[])
      setLastUpdated(new Date())
    } catch(e) { toast.error(e.message) }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { loadAll(); timer.current=setInterval(loadAll,30000); return()=>clearInterval(timer.current) }, [loadAll])

  const kpi = analytics?.kpi || {}
  const spoilBadge = kpi.spoilageRate>5?{l:'High Risk',c:'red'}:kpi.spoilageRate>2?{l:'Moderate',c:'yellow'}:{l:'Normal',c:'green'}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h2 className="text-xl font-extrabold text-gray-950">Dashboard</h2><p className="text-sm text-gray-700 font-medium">Overview of your supply chain operations</p></div>
        <div className="flex items-center gap-3">
          {lastUpdated&&<span className="text-xs text-gray-600 hidden sm:block">Updated {lastUpdated.toLocaleTimeString()}</span>}
          <button onClick={loadAll} className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 transition">✦ Refresh</button>
        </div>
      </div>

      {/* KPI */}
      {loading ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">{[0,1,2,3].map(i=><div key={i} className="bg-white rounded-2xl h-28 animate-pulse border border-gray-100"/>)}</div> : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {[
            { title:'Spoilage Rate', value:`${kpi.spoilageRate??0}%`, badge:spoilBadge.l, bc:spoilBadge.c, sub: kpi.spoilDelta!==undefined?`${kpi.spoilDelta<=0?'↓':'↑'} ${Math.abs(kpi.spoilDelta)}% vs last week`:null },
            { title:'Cold Chain Breaches', value:kpi.coldChainBreaches??0, sub:`↑ ${kpi.breachesNewToday??0} new today` },
            { title:'Active Shipments', value:kpi.activeShipments??0, sub:`↑ ${kpi.inTransit??0} in transit` },
            { title:'Revenue (This Month)', value:bdt(kpi.revenueThisMonth), color:'text-green-600', sub:kpi.revenueGrowth!==undefined?`${kpi.revenueGrowth>=0?'↑':'↓'} ${Math.abs(kpi.revenueGrowth)}% vs last month`:null },
          ].map((k,i)=>(
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-800 font-semibold">{k.title}</p>
                {k.badge&&<span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${k.bc==='red'?'bg-red-100 text-red-700':k.bc==='yellow'?'bg-yellow-100 text-yellow-700':'bg-green-100 text-green-700'}`}>{k.badge}</span>}
              </div>
              <p className={`text-4xl font-bold tracking-tight ${k.color||'text-gray-900'}`}>{k.value}</p>
              {k.sub&&<p className="mt-2 text-xs text-gray-700 font-medium">{k.sub}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-950 mb-4">Spoilage Trend (Weekly)</h3>
          <div className="h-40">{analytics?.weeklyTrend?<LineChart data={analytics.weeklyTrend}/>:<div className="h-full animate-pulse bg-gray-100 rounded-xl"/>}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-950">Cold Chain Status</h3>
            {coldChain.some(c=>c.latestSensor?.is_temp_breach)&&<span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">{coldChain.filter(c=>c.latestSensor?.is_temp_breach).length} Breach</span>}
          </div>
          {coldChain.length===0?<Empty icon="🚛" msg="No active shipments with sensors"/>:(
            <div className="grid grid-cols-2 gap-3">
              {coldChain.map((c,i)=>{const s=c.latestSensor,breach=s?.is_temp_breach,limit=Number(c.product?.ideal_temp_max||s?.ideal_temp_max||0),diff=s?Number(s.internal_temp)-limit:null;return(
                <div key={i} className={`rounded-xl p-3 border ${breach?'border-red-200 bg-red-50':'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-700 truncate">{c.vehicle?.plate_no||'No vehicle'}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 ${breach?'bg-red-200 text-red-800':'bg-green-100 text-green-700'}`}>{breach?'Breach':'OK'}</span>
                  </div>
                  <p className={`text-xl font-bold ${breach?'text-red-600':'text-gray-800'}`}>{s?(diff!==null?(diff>0?'+':'')+diff.toFixed(0)+'°C':'—'):'No sensor'}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 truncate">{c.source_district?.name||'?'} → {c.dest_district?.name||'?'} · {c.product?.name||'?'}</p>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-950">Active Shipments</h3></div>
          {activeShips.length===0?<Empty icon="🚚" msg="No active shipments"/>:(
            <div className="overflow-x-auto"><table className="w-full text-sm">
              <thead><tr className="text-xs text-gray-800 font-bold">{['Product','Farmer','Route','Qty','Status','Risk'].map(h=><th key={h} className="text-left pb-2 pr-2">{h}</th>)}</tr></thead>
              <tbody>{activeShips.map((s,i)=><tr key={i} className="border-t border-gray-50">
                <td className="py-2 pr-2 font-medium">{s.product?.name||'?'}</td>
                <td className="py-2 pr-2 text-gray-700 text-xs font-medium">{s.farmer?.name||'?'}</td>
                <td className="py-2 pr-2 text-xs text-gray-700">{s.source_district?.name||'?'}→{s.dest_district?.name||'?'}</td>
                <td className="py-2 pr-2 text-right text-xs">{s.quantity}kg</td>
                <td className="py-2 pr-2"><Badge s={s.status}/></td>
                <td className="py-2"><Badge s={s.risk}/></td>
              </tr>)}</tbody>
            </table></div>
          )}
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-950 mb-4">Stock Level</h3>
          {analytics?.stockCategories?(
            <div className="space-y-3.5">
              {analytics.stockCategories.map((c,i)=>{const color=c.pct>70?'#16a34a':c.pct>40?'#a855f7':c.pct>15?'#f97316':'#ef4444';return(
                <div key={i}><div className="flex items-center justify-between text-sm mb-1"><span className="text-gray-700 font-medium">{c.category}</span><span className="text-gray-600 text-xs">{c.pct}%</span></div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{width:`${Math.max(c.pct,c.stock>0?2:0)}%`,background:color}}/></div></div>
              )})}
              {analytics.stockCategories.some(c=>c.pct<20&&c.stock>0)&&<div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs">⚠ {analytics.stockCategories.filter(c=>c.pct<20&&c.stock>0).map(c=>c.category).join(', ')} stock critically low</div>}
            </div>
          ):<div className="space-y-3">{[1,2,3,4].map(i=><div key={i} className="h-7 bg-gray-100 rounded animate-pulse"/>)}</div>}
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-950 mb-3">Orders (This Month)</h3>
          <div className="h-28">{analytics?.dailyOrders?<BarChart data={analytics.dailyOrders}/>:<div className="h-full animate-pulse bg-gray-100 rounded-xl"/>}</div>
          <div className="mt-3 pt-3 border-t border-gray-50"><p className="text-xs text-gray-500">Total Orders</p><p className="text-3xl font-extrabold text-gray-950">{(analytics?.totalOrdersMonth||0).toLocaleString()}</p></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-950 mb-2">Shipment Breakdown</h3>
          <div className="h-40">{analytics?.shipmentBreakdown?<DonutChart data={analytics.shipmentBreakdown}/>:<div className="h-full animate-pulse bg-gray-100 rounded-xl"/>}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-950 mb-4">Top Farmers</h3>
          {analytics?.topFarmers?.length?(
            <table className="w-full text-xs"><thead><tr className="text-gray-600 font-semibold border-b border-gray-100">{['Farmer','District','Rating','Orders'].map(h=><th key={h} className={`pb-2 ${h==='Rating'||h==='Orders'?'text-right':''}`}>{h}</th>)}</tr></thead>
            <tbody>{analytics.topFarmers.map((f,i)=><tr key={i} className="border-t border-gray-50"><td className="py-1.5 font-medium text-gray-800">{f.name}</td><td className="py-1.5 text-gray-700 font-medium">{f.district?.name||'—'}</td><td className="py-1.5 text-right text-amber-500">★ {Number(f.rating||5).toFixed(1)}</td><td className="py-1.5 text-right">{f.total_orders??0}</td></tr>)}</tbody>
            </table>
          ):<Empty icon="👨‍🌾" msg="No farmer data"/>}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// FARMERS PAGE
// ═══════════════════════════════════════════════════════════════
function FarmersPage() {
  const [data, setData] = useState([])
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})
  const [search, setSearch] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try { const [f,d]=await Promise.all([api('/api/farmers'),loadDistricts()]); setData(f); setDistricts(d) }
    catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [])
  useEffect(()=>{ load() },[load])

  const openAdd = () => { setForm({ is_active:true, rating:5.0 }); setModal('add') }
  const openEdit = r => { setForm({...r}); setModal('edit') }
  const save = async () => {
    try {
      if (form.farmer_id) await api(`/api/farmers/${form.farmer_id}`,{method:'PUT',body:form})
      else await api('/api/farmers',{method:'POST',body:form})
      toast.success(form.farmer_id?'Updated!':'Added!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }
  const remove = async id => {
    if (!confirm('Delete this farmer?')) return
    try { await api(`/api/farmers/${id}`,{method:'DELETE'}); toast.success('Deleted!'); load() }
    catch(e) { toast.error(e.message) }
  }

  const distOpts = districts.map(d=>({value:d.district_id,label:d.name}))
  const filtered = data.filter(r=>!search||JSON.stringify(r).toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <PageHeader title="Farmers" sub="Manage all registered farmers">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…"
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500"/>
        <AddBtn onClick={openAdd} label="+ Add Farmer"/>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:filtered.length===0?<Empty icon="👨‍🌾" msg="No farmers found"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>
              {['Name','Phone','District','Village','Land (ac)','Rating','Status',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}
            </tr></thead>
            <tbody>{filtered.map((r,i)=><tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium">{r.name}</td>
              <td className="px-4 py-3 text-gray-700">{r.phone||'—'}</td>
              <td className="px-4 py-3">{r.district?.name||'—'}</td>
              <td className="px-4 py-3 text-gray-700">{r.village||'—'}</td>
              <td className="px-4 py-3 text-gray-700">{r.land_size_acre||'—'}</td>
              <td className="px-4 py-3 text-amber-500">★ {Number(r.rating||5).toFixed(1)}</td>
              <td className="px-4 py-3"><Badge s={r.is_active?'Active':'Inactive'}/></td>
              <td className="px-4 py-3"><div className="flex gap-1">
                <button onClick={()=>openEdit(r)} className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={()=>remove(r.farmer_id)} className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Del</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {modal&&<Modal title={modal==='add'?'Add Farmer':'Edit Farmer'} onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} required/>
          <Field label="Phone" value={form.phone} onChange={v=>setForm(f=>({...f,phone:v}))}/>
          <Field label="District" type="select" value={form.district_id} onChange={v=>setForm(f=>({...f,district_id:v}))} options={distOpts} required/>
          <Field label="Village" value={form.village} onChange={v=>setForm(f=>({...f,village:v}))}/>
          <Field label="Land Size (acres)" type="number" value={form.land_size_acre} onChange={v=>setForm(f=>({...f,land_size_acre:v}))} min="0" step="0.1"/>
          <Field label="Active" type="checkbox" value={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} placeholder="Farmer is active"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700">Save</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PRODUCTS PAGE
// ═══════════════════════════════════════════════════════════════
function ProductsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [historyId, setHistoryId] = useState(null)
  const [form, setForm] = useState({})
  const [catFilter, setCatFilter] = useState('')
  const CATS = ['Vegetable','Fruit','Fish','Meat','Dairy','Grain']

  const load = useCallback(async () => {
    setLoading(true)
    try { setData(await api(`/api/products${catFilter?'?category='+catFilter:''}`)) }
    catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [catFilter])
  useEffect(()=>{ load() },[load])

  const openAdd = () => { setForm({ is_active:true, is_seasonal:false, unit:'KG', specific_heat:3.5, stock_quantity:0 }); setModal('form') }
  const openEdit = r => { setForm({...r}); setModal('form') }
  const save = async () => {
    try {
      if (form.product_id) await api(`/api/products/${form.product_id}`,{method:'PUT',body:form})
      else await api('/api/products',{method:'POST',body:form})
      toast.success(form.product_id?'Updated!':'Added!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }
  const remove = async id => {
    if (!confirm('Delete?')) return
    try { await api(`/api/products/${id}`,{method:'DELETE'}); toast.success('Deleted!'); load() }
    catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Products" sub="Inventory and pricing management">
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All Categories</option>{CATS.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <AddBtn onClick={openAdd} label="+ Add Product"/>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="📦" msg="No products"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>
              {['Name','Category','Unit','Stock','Buy Price','Sell Price','Status',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}
            </tr></thead>
            <tbody>{data.map((r,i)=><tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium">{r.name}</td>
              <td className="px-4 py-3"><Badge s={r.category}/></td>
              <td className="px-4 py-3 text-gray-700">{r.unit}</td>
              <td className="px-4 py-3">{r.stock_quantity} {r.unit}</td>
              <td className="px-4 py-3 text-gray-700">{bdt(r.purchase_price)}</td>
              <td className="px-4 py-3 font-semibold" style={{color:r.current_price>r.purchase_price?'#dc2626':'#16a34a'}}>{bdt(r.current_price)}</td>
              <td className="px-4 py-3"><Badge s={r.is_active?'Active':'Inactive'}/></td>
              <td className="px-4 py-3"><div className="flex gap-1">
                <button onClick={()=>openEdit(r)} className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={()=>remove(r.product_id)} className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Del</button>
                <button onClick={()=>setHistoryId(r.product_id)} className="px-2 py-1 text-xs rounded-lg bg-green-50 text-green-700 hover:bg-green-100">History</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {modal==='form'&&<Modal title={form.product_id?'Edit Product':'Add Product'} onClose={()=>setModal(null)} wide>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} required/>
          <Field label="Category" type="select" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={CATS.map(c=>({value:c,label:c}))} required/>
          <Field label="Unit" type="select" value={form.unit} onChange={v=>setForm(f=>({...f,unit:v}))} options={['KG','LITRE','PCS'].map(u=>({value:u,label:u}))}/>
          <Field label="Stock Quantity" type="number" value={form.stock_quantity} onChange={v=>setForm(f=>({...f,stock_quantity:v}))} min="0"/>
          <Field label="Purchase Price (৳)" type="number" value={form.purchase_price} onChange={v=>setForm(f=>({...f,purchase_price:v}))} required min="0" step="0.01"/>
          <Field label="Current Price (৳)" type="number" value={form.current_price} onChange={v=>setForm(f=>({...f,current_price:v}))} required min="0" step="0.01"/>
          <Field label="Ideal Temp Min (°C)" type="number" value={form.ideal_temp_min} onChange={v=>setForm(f=>({...f,ideal_temp_min:v}))} step="0.1"/>
          <Field label="Ideal Temp Max (°C)" type="number" value={form.ideal_temp_max} onChange={v=>setForm(f=>({...f,ideal_temp_max:v}))} step="0.1"/>
          <Field label="Max Shelf Hours" type="number" value={form.max_shelf_hours} onChange={v=>setForm(f=>({...f,max_shelf_hours:v}))} min="1"/>
          <Field label="Specific Heat" type="number" value={form.specific_heat} onChange={v=>setForm(f=>({...f,specific_heat:v}))} step="0.001"/>
          <div className="col-span-2 flex gap-4">
            <Field label="" type="checkbox" value={form.is_seasonal} onChange={v=>setForm(f=>({...f,is_seasonal:v}))} placeholder="Seasonal product"/>
            <Field label="" type="checkbox" value={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} placeholder="Active"/>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200 font-bold">Cancel</button>
          <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700 font-bold">Save</button>
        </div>
      </Modal>}
      {historyId && <Modal title="Product Stock Audit History" onClose={()=>setHistoryId(null)}><ProductHistoryView productId={historyId} /></Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// ORDERS PAGE  — screenshot-matching design
// ═══════════════════════════════════════════════════════════════
const PRODUCT_EMOJI = {
  Tomato:'🍅',Potato:'🥔',Cabbage:'🥬',Chili:'🌶️',Brinjal:'🍆',Carrot:'🥕',
  Cucumber:'🥒',Spinach:'🥬',Cauliflower:'🥦',Capsicum:'🫑',Onion:'🧅',
  Garlic:'🧄',Okra:'🫑',Pumpkin:'🎃','Bottle Gourd':'🫙','Bitter Gourd':'🌿',
  Apple:'🍎',Banana:'🍌',Mango:'🥭',Orange:'🍊',Guava:'🍈',
  Hilsa:'🐟',Catfish:'🐠',Tilapia:'🐠',
  Beef:'🥩',Chicken:'🍗',
  'Fresh Milk':'🥛',Yogurt:'🫙',
  Rice:'🌾',Wheat:'🌾',Lentil:'🫘',
}
const PROD_EMOJI = name => PRODUCT_EMOJI[name] || '🌿'
const ORDER_PROGRESS = s => ({PLACED:10,CONFIRMED:25,IN_TRANSIT:55,IN_WAREHOUSE:75,DELIVERED:100,PARTIALLY_DELIVERED:90,DELAYED:35,SPOILED:100,CANCELLED:0}[s]??0)
const PROG_COLOR = p => p>=100?'#16a34a':p>=70?'#22c55e':p>=40?'#f97316':'#9ca3af'

function OrdersPage() {
  const [orders,    setOrders]    = useState([])
  const [products,  setProducts]  = useState([])
  const [farmers,   setFarmers]   = useState([])
  const [shipKpi,   setShipKpi]   = useState({ total:0, inTransit:0, delivered:0, delayed:0 })
  const [loading,   setLoading]   = useState(true)
  const [modal,     setModal]     = useState(null)
  const [selOrder,  setSelOrder]  = useState(null)
  const [form,      setForm]      = useState({})
  const [search,    setSearch]    = useState('')
  const [sfilt,     setSfilt]     = useState('')
  const [viewOrder, setViewOrder] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [o,p,f,sh] = await Promise.all([
        api('/api/orders'), api('/api/products'), api('/api/farmers'), api('/api/shipments'),
      ])
      setOrders(o); setProducts(p); setFarmers(f)
      setShipKpi({
        total:    o.length,
        inTransit:sh.filter(s=>s.status==='IN_TRANSIT').length,
        delivered:sh.filter(s=>['DELIVERED','PARTIALLY_DELIVERED'].includes(s.status)).length,
        delayed:  sh.filter(s=>s.status==='DELAYED').length,
      })
    } catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [])
  useEffect(()=>{ load() },[load])

  const newOrder = async () => {
    try { await api('/api/orders',{method:'POST',body:{notes:form.notes||'',order_status:'PLACED',ordered_at:new Date().toISOString()}}); toast.success('Order created! Now add items.'); setModal(null); setForm({}); load() }
    catch(e) { toast.error(e.message) }
  }
  const updateStatus = async (id,status) => {
    try { await api(`/api/orders/${id}/status`,{method:'PATCH',body:{order_status:status}}); toast.success('Updated!'); load() }
    catch(e) { toast.error(e.message) }
  }
  const addItem = async () => {
    if (!form.product_id||!form.farmer_id||!form.quantity||!form.agreed_price_per_unit) { toast.error('All fields required'); return }
    try { await api(`/api/orders/${selOrder}/items`,{method:'POST',body:form}); toast.success('Item added!'); setModal(null); setForm({}); load() }
    catch(e) { toast.error(e.message) }
  }
  const delItem = async (oid,iid) => {
    if (!confirm('Remove item?')) return
    try { await api(`/api/orders/${oid}/items/${iid}`,{method:'DELETE'}); toast.success('Removed!'); load() }
    catch(e) { toast.error(e.message) }
  }

  // Flatten all order items for the list view
  const allItems = orders.flatMap((o,oi) =>
    (o.order_item||[]).map(it => ({ ...it, order:o, rowNum: oi+1 }))
  )

  const filtered = allItems.filter(it => {
    const q = search.toLowerCase()
    const matchQ = !q || (it.product?.name||'').toLowerCase().includes(q)
      || (it.farmer?.name||'').toLowerCase().includes(q)
      || it.order?.order_id?.slice(0,8).includes(q)
    const matchS = !sfilt || it.order?.order_status === sfilt
    return matchQ && matchS
  })

  const KPI_CARDS = [
    { label:'Total Orders',  value:shipKpi.total,     icon:'🛒', color:'#16a34a', bg:'#f0fdf4' },
    { label:'In Transit',    value:shipKpi.inTransit,  icon:'🚚', color:'#f97316', bg:'#fff7ed' },
    { label:'Delivered',     value:shipKpi.delivered,  icon:'✅', color:'#16a34a', bg:'#f0fdf4' },
    { label:'Delayed',       value:shipKpi.delayed,    icon:'⚠️', color:'#ef4444', bg:'#fef2f2' },
  ]

  return (
    <div className="-mx-6 -mt-6">
      {/* ── Hero Banner ── */}
      <div className="relative h-52 overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0a2e16 0%,#1a5c2a 60%,#2d7a3a 100%)' }}>
        <img src="/images/delivery.png" alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e16]/80 to-transparent"/>
        <div className="relative z-10 flex flex-col justify-center h-full px-8">
          <h1 className="text-3xl font-extrabold text-white leading-tight">Manage Orders<br/>Seamlessly</h1>
          <p className="text-green-200 text-sm mt-2 max-w-xs">Track, deliver, and monitor agricultural shipments in real-time</p>
          <button onClick={()=>{ setForm({}); setModal('newOrder') }}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-bold w-fit transition shadow-lg">
            + Create Order
          </button>
        </div>
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search by Order ID, Product or Farmer…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500"/>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div>
              <p className="text-xs text-gray-600 mb-1 font-medium">Status</p>
              <select value={sfilt} onChange={e=>setSfilt(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 bg-white">
                <option value="">All Status</option>
                {ORDER_STATUSES.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
              </select>
            </div>
            <div className="self-end">
              <button onClick={load}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition">
                ⚙ Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {KPI_CARDS.map((k,i)=>(
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background:k.bg}}>
                {k.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">{k.label}</p>
                <p className="text-2xl font-bold" style={{color:k.color}}>{k.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Recent Orders List ── */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <button onClick={()=>{ setSearch(''); setSfilt('') }} className="text-sm text-green-600 hover:underline font-semibold">View All Orders →</button>
        </div>

        {loading ? <Loader/> : filtered.length===0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Empty icon="🛒" msg={orders.length===0?"No orders yet — create your first order":"No orders match your search"}/>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((it,i)=>{
              const o       = it.order
              const prog    = ORDER_PROGRESS(o.order_status)
              const pColor  = PROG_COLOR(prog)
              const shipSt  = it.shipment?.status || o.order_status
              const isBreach= it.shipment?.status === 'DELAYED'
              const tempC   = it.shipment ? '—' : null
              const shortId = `#A${String(it.rowNum||i+1).padStart(4,'0')}`

              return (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Header row */}
                  <div className="grid grid-cols-12 gap-2 items-center px-5 py-4">

                    {/* Order ID + Farmer */}
                    <div className="col-span-3">
                      <p className="text-xs text-gray-600 font-medium">Order ID</p>
                      <p className="font-bold text-gray-800 text-sm">{shortId}</p>
                      <p className="text-xs font-semibold text-gray-700 mt-1">{it.farmer?.name||'—'}</p>
                      <p className="text-xs text-gray-600">{it.farmer?.district?.name||it.source_district?.name||'Bangladesh'}</p>
                    </div>

                    {/* Product */}
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">
                        {PROD_EMOJI(it.product?.name)}
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-medium">Product</p>
                        <p className="font-semibold text-gray-800 text-sm">{it.product?.name||'?'}</p>
                        <p className="text-xs text-gray-600">{it.quantity} {it.product?.unit||'kg'}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">Status</p>
                      <select value={o.order_status} onChange={e=>updateStatus(o.order_id,e.target.value)}
                        className={`text-xs px-2 py-1 rounded-lg font-semibold border-0 focus:outline-none cursor-pointer
                          ${o.order_status==='IN_TRANSIT'?'bg-orange-100 text-orange-700':
                            o.order_status==='DELIVERED'?'bg-green-100 text-green-700':
                            o.order_status==='DELAYED'?'bg-red-100 text-red-700':
                            o.order_status==='IN_WAREHOUSE'?'bg-purple-100 text-purple-700':
                            'bg-gray-100 text-gray-600'}`}>
                        {ORDER_STATUSES.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
                      </select>
                    </div>

                    {/* Temp Status */}
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">Temp Status</p>
                      <span className={`text-xs px-2 py-1 rounded-lg font-semibold ${isBreach?'bg-red-100 text-red-700':'bg-green-100 text-green-700'}`}>
                        {isBreach?'Breach 🔥':'Normal'}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 font-medium mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{width:`${prog}%`,background:pColor}}/>
                        </div>
                        <span className="text-xs font-semibold text-gray-600 flex-shrink-0">{prog}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between px-5 py-2 bg-gray-50/50 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{fmtDate(o.ordered_at)}</span>
                      <span>·</span>
                      <span className="font-semibold text-gray-600">{bdt(it.total_price||0)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>setViewOrder(viewOrder===i?null:i)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition">
                        👁 View
                      </button>
                      <button onClick={()=>delItem(o.order_id,it.item_id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition">
                        ✕ Remove
                      </button>
                      <button onClick={()=>{ setSelOrder(o.order_id); setForm({product_id:'',farmer_id:'',quantity:'',agreed_price_per_unit:''}); setModal('addItem') }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition">
                        + Item
                      </button>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {viewOrder===i && (
                    <div className="px-5 py-3 border-t border-gray-100 bg-white text-xs grid grid-cols-3 gap-3 text-gray-600">
                      <div><span className="text-gray-600">Order ID</span><br/><span className="font-mono text-gray-700">{o.order_id?.slice(0,16)}…</span></div>
                      <div><span className="text-gray-600">Unit Price</span><br/><strong>{bdt(it.agreed_price_per_unit)}</strong></div>
                      <div><span className="text-gray-600">Total</span><br/><strong className="text-green-600">{bdt(it.total_price)}</strong></div>
                      <div><span className="text-gray-600">Source</span><br/>{it.source_district?.name||'—'}</div>
                      <div><span className="text-gray-600">Shipment Status</span><br/><Badge s={it.shipment?.status||'—'}/></div>
                      <div><span className="text-gray-600">Notes</span><br/>{o.notes||'—'}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {modal==='newOrder'&&<Modal title="New Order" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Notes (optional)" type="textarea" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2} placeholder="Optional notes for this order"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={newOrder} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white font-semibold">Create Order</button>
          </div>
        </div>
      </Modal>}
      {modal==='addItem'&&<Modal title="Add Order Item" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Product" type="select" value={form.product_id}
            onChange={v=>{ const p=products.find(x=>x.product_id===v); setForm(f=>({...f,product_id:v,agreed_price_per_unit:p?.current_price||''})) }}
            options={products.map(p=>({value:p.product_id,label:`${PROD_EMOJI(p.name)} ${p.name} (${p.category}) — ${bdt(p.current_price)}`}))} required/>
          <Field label="Farmer" type="select" value={form.farmer_id}
            onChange={v=>setForm(f=>({...f,farmer_id:v}))}
            options={farmers.map(f=>({value:f.farmer_id,label:`${f.name} — ${f.district?.name||''}`}))} required/>
          <Field label="Quantity" type="number" value={form.quantity} onChange={v=>setForm(f=>({...f,quantity:v}))} required min="0" placeholder="Enter quantity"/>
          <Field label="Agreed Price / Unit (৳)" type="number" value={form.agreed_price_per_unit} onChange={v=>setForm(f=>({...f,agreed_price_per_unit:v}))} required min="0" step="0.01"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={addItem} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white font-semibold">Add Item</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SHIPMENTS PAGE
// ═══════════════════════════════════════════════════════════════
function ShipmentsPage() {
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [farmers, setFarmers] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [warehouses, setWarehouses] = useState([])
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})
  const [statusFilter, setStatusFilter] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const url = `/api/shipments${statusFilter?'?status='+statusFilter:''}`
      const [s,p,f,v,w,d] = await Promise.all([api(url),api('/api/products'),api('/api/farmers'),api('/api/vehicles'),api('/api/warehouses'),loadDistricts()])
      setData(s); setProducts(p); setFarmers(f); setVehicles(v); setWarehouses(w); setDistricts(d)
    } catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [statusFilter])
  useEffect(()=>{ load() },[load])

  const openStatus = r => { setForm({ shipment_id:r.shipment_id, status:r.status, info:`${r.product?.name} from ${r.farmer?.name}`, actual_arrival:toLocalDT(new Date().toISOString()), days_in_warehouse:r.days_in_warehouse||0 }); setModal('status') }
  const saveStatus = async () => {
    try {
      await api(`/api/shipments/${form.shipment_id}/status`,{method:'PATCH',body:{ status:form.status, actual_arrival:form.actual_arrival?new Date(form.actual_arrival).toISOString():undefined, days_in_warehouse:form.days_in_warehouse||0 }})
      toast.success(form.status==='DELIVERED'?'Delivered! Stock & profit updated.':'Status updated!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }
  const openAdd = () => {
    setForm({ status:'PENDING', transport_cost:0, start_time:toLocalDT(new Date().toISOString()) }); setModal('add')
  }
  const saveShipment = async () => {
    if (!form.product_id||!form.farmer_id||!form.quantity) { toast.error('Product, farmer, quantity required'); return }
    try {
      await api('/api/shipments',{method:'POST',body:{...form, start_time:form.start_time?new Date(form.start_time).toISOString():new Date().toISOString(), estimated_arrival:form.estimated_arrival?new Date(form.estimated_arrival).toISOString():null }})
      toast.success('Shipment created!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Shipments" sub="Track all deliveries">
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All Statuses</option>{SHIP_STATUSES.map(s=><option key={s} value={s}>{s.replace(/_/g,' ')}</option>)}
        </select>
        <AddBtn onClick={openAdd} label="+ New Shipment"/>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="🚚" msg="No shipments"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>
              {['Product','Farmer','Route','Qty','Status','Vehicle','Start','Cost',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}
            </tr></thead>
            <tbody>{data.map((r,i)=><tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium">{r.product?.name||'?'}<div className="text-xs text-gray-600">{r.product?.category}</div></td>
              <td className="px-4 py-3">{r.farmer?.name||'?'}<div className="text-xs text-gray-600">{r.farmer?.district?.name}</div></td>
              <td className="px-4 py-3 text-xs">{r.source_district?.name||'?'} → {r.dest_district?.name||'?'}</td>
              <td className="px-4 py-3">{r.quantity} {r.product?.unit||'kg'}</td>
              <td className="px-4 py-3"><Badge s={r.status}/></td>
              <td className="px-4 py-3 text-gray-700">{r.vehicle?.plate_no||'—'}</td>
              <td className="px-4 py-3 text-xs text-gray-700">{fmtDate(r.start_time)}</td>
              <td className="px-4 py-3 text-xs">{bdt(r.total_cost||0)}</td>
              <td className="px-4 py-3">
                <button onClick={()=>openStatus(r)} className="px-2 py-1 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100">Update →</button>
              </td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>

      {modal==='status'&&<Modal title="Update Shipment Status" onClose={()=>setModal(null)}>
        <p className="text-sm text-gray-600 mb-4 font-medium">{form.info}</p>
        <div className="space-y-3">
          <Field label="New Status" type="select" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={SHIP_STATUSES.map(s=>({value:s,label:s.replace(/_/g,' ')}))}/>
          <Field label="Actual Arrival" type="datetime-local" value={form.actual_arrival} onChange={v=>setForm(f=>({...f,actual_arrival:v}))}/>
          <Field label="Days in Warehouse" type="number" value={form.days_in_warehouse} onChange={v=>setForm(f=>({...f,days_in_warehouse:v}))} min="0"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={saveStatus} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Update</button>
          </div>
        </div>
      </Modal>}

      {modal==='add'&&<Modal title="New Shipment" onClose={()=>setModal(null)} wide>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Product" type="select" value={form.product_id} onChange={v=>setForm(f=>({...f,product_id:v}))} options={products.map(p=>({value:p.product_id,label:p.name}))} required/>
          <Field label="Farmer" type="select" value={form.farmer_id} onChange={v=>{ const fr=farmers.find(x=>x.farmer_id===v); setForm(f=>({...f,farmer_id:v,source_district_id:fr?.district_id||''})) }} options={farmers.map(f=>({value:f.farmer_id,label:`${f.name} — ${f.district?.name||''}`}))} required/>
          <Field label="Destination District" type="select" value={form.dest_district_id} onChange={v=>setForm(f=>({...f,dest_district_id:v}))} options={districts.map(d=>({value:d.district_id,label:d.name}))}/>
          <Field label="Vehicle" type="select" value={form.vehicle_id} onChange={v=>setForm(f=>({...f,vehicle_id:v}))} options={vehicles.filter(v=>v.is_operational&&!v._busy).map(v=>({value:v.vehicle_id,label:`${v.plate_no} (${v.capacity_kg}kg)`}))}/>
          <Field label="Warehouse" type="select" value={form.warehouse_id} onChange={v=>setForm(f=>({...f,warehouse_id:v}))} options={warehouses.filter(w=>w.is_active).map(w=>({value:w.warehouse_id,label:w.name}))}/>
          <Field label="Quantity (kg)" type="number" value={form.quantity} onChange={v=>setForm(f=>({...f,quantity:v}))} required min="0"/>
          <Field label="Transport Cost (৳)" type="number" value={form.transport_cost} onChange={v=>setForm(f=>({...f,transport_cost:v}))} min="0"/>
          <Field label="Status" type="select" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={SHIP_STATUSES.map(s=>({value:s,label:s.replace(/_/g,' ')}))}/>
          <Field label="Start Time" type="datetime-local" value={form.start_time} onChange={v=>setForm(f=>({...f,start_time:v}))}/>
          <Field label="Est. Arrival" type="datetime-local" value={form.estimated_arrival} onChange={v=>setForm(f=>({...f,estimated_arrival:v}))}/>
          <div className="col-span-2"><Field label="Notes" type="textarea" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} rows={2}/></div>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
          <button onClick={saveShipment} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Create</button>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WAREHOUSES PAGE
// ═══════════════════════════════════════════════════════════════
function WarehousesPage() {
  const [data, setData] = useState([])
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    try { const [w,d]=await Promise.all([api('/api/warehouses'),loadDistricts()]); setData(w); setDistricts(d) }
    catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [])
  useEffect(()=>{ load() },[load])

  const save = async () => {
    try {
      if (form.warehouse_id) await api(`/api/warehouses/${form.warehouse_id}`,{method:'PUT',body:form})
      else await api('/api/warehouses',{method:'POST',body:form})
      toast.success(form.warehouse_id?'Updated!':'Added!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Warehouses" sub="Cold storage management">
        <AddBtn onClick={()=>{ setForm({is_active:true,rent_per_day:0}); setModal('form') }} label="+ Add Warehouse"/>
      </PageHeader>
      {loading?<Loader/>:data.length===0?<Empty icon="🏭" msg="No warehouses"/>:(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((w,i)=>{
            const pct=w.capacity_kg?Math.round((w.current_load_kg/w.capacity_kg)*100):0
            const barColor=pct>95?'#ef4444':pct>85?'#f97316':'#16a34a'
            return <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div><p className="font-bold text-gray-900">{w.name}</p><p className="text-xs text-gray-600">{w.district?.name}</p></div>
                <div className="flex items-center gap-1"><Badge s={w.is_active?'Active':'Inactive'}/>
                  <button onClick={()=>{ setForm({...w}); setModal('form') }} className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 ml-1">Edit</button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-1"><span className="text-gray-500">Utilization</span><strong style={{color:barColor}}>{pct}%</strong></div>
              <div className="h-2 rounded-full bg-gray-100 mb-1"><div className="h-full rounded-full" style={{width:`${Math.min(100,pct)}%`,background:barColor}}/></div>
              <p className="text-xs text-gray-600 mb-3">{(w.current_load_kg||0).toLocaleString()} / {(w.capacity_kg||0).toLocaleString()} kg</p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <span className="text-gray-600">Temp</span><span>{w.temp_min!=null?`${w.temp_min}–${w.temp_max}°C`:'Ambient'}</span>
                <span className="text-gray-600">Rent/Day</span><span>{bdt(w.rent_per_day)}</span>
                <span className="text-gray-600">Manager</span><span>{w.manager_name||'—'}</span>
              </div>
            </div>
          })}
        </div>
      )}
      {modal==='form'&&<Modal title={form.warehouse_id?'Edit Warehouse':'Add Warehouse'} onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} required/>
          <Field label="District" type="select" value={form.district_id} onChange={v=>setForm(f=>({...f,district_id:v}))} options={districts.map(d=>({value:d.district_id,label:d.name}))} required/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Capacity (kg)" type="number" value={form.capacity_kg} onChange={v=>setForm(f=>({...f,capacity_kg:v}))} min="0"/>
            <Field label="Rent/Day (৳)" type="number" value={form.rent_per_day} onChange={v=>setForm(f=>({...f,rent_per_day:v}))} min="0"/>
            <Field label="Temp Min (°C)" type="number" value={form.temp_min} onChange={v=>setForm(f=>({...f,temp_min:v}))} step="0.1"/>
            <Field label="Temp Max (°C)" type="number" value={form.temp_max} onChange={v=>setForm(f=>({...f,temp_max:v}))} step="0.1"/>
          </div>
          <Field label="Manager Name" value={form.manager_name} onChange={v=>setForm(f=>({...f,manager_name:v}))}/>
          <Field label="Manager Phone" value={form.manager_phone} onChange={v=>setForm(f=>({...f,manager_phone:v}))}/>
          <Field label="" type="checkbox" value={form.is_active} onChange={v=>setForm(f=>({...f,is_active:v}))} placeholder="Active"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Save</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// VEHICLES PAGE
// ═══════════════════════════════════════════════════════════════
function VehiclesPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    try { setData(await api('/api/vehicles')) } catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [])
  useEffect(()=>{ load() },[load])

  const save = async () => {
    try {
      if (form.vehicle_id) await api(`/api/vehicles/${form.vehicle_id}`,{method:'PUT',body:form})
      else await api('/api/vehicles',{method:'POST',body:form})
      toast.success(form.vehicle_id?'Updated!':'Added!'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }
  const remove = async id => {
    if (!confirm('Delete vehicle?')) return
    try { await api(`/api/vehicles/${id}`,{method:'DELETE'}); toast.success('Deleted!'); load() } catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Vehicles" sub="Refrigerated transport fleet">
        <AddBtn onClick={()=>{ setForm({is_operational:true,cooling_capacity_btu:10236}); setModal('form') }} label="+ Add Vehicle"/>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="🚛" msg="No vehicles"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>
              {['Plate No','Type','Capacity','Cooling Unit','BTU/hr','Status','Delivery',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}
            </tr></thead>
            <tbody>{data.map((r,i)=><tr key={i} className={`border-b border-gray-50 ${r._busy?'bg-amber-50/50':''} hover:bg-gray-50/50`}>
              <td className="px-4 py-3 font-medium font-mono">{r.plate_no}</td>
              <td className="px-4 py-3 text-gray-700">{r.vehicle_type||'—'}</td>
              <td className="px-4 py-3">{r.capacity_kg} kg</td>
              <td className="px-4 py-3 text-gray-700">{r.cooling_unit||'—'}</td>
              <td className="px-4 py-3 text-gray-700">{r.cooling_capacity_btu||'—'}</td>
              <td className="px-4 py-3"><Badge s={r._busy?'Busy':r.is_operational?'Active':'Inactive'}/></td>
              <td className="px-4 py-3 text-xs text-gray-500">{r._busy?`${r._busy.delivering} → ${r._busy.to}`:'—'}</td>
              <td className="px-4 py-3"><div className="flex gap-1">
                <button onClick={()=>{ setForm({...r}); setModal('form') }} className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button>
                <button onClick={()=>remove(r.vehicle_id)} className="px-2 py-1 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100">Del</button>
              </div></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {modal==='form'&&<Modal title={form.vehicle_id?'Edit Vehicle':'Add Vehicle'} onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Plate No" value={form.plate_no} onChange={v=>setForm(f=>({...f,plate_no:v}))} required/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type" value={form.vehicle_type} onChange={v=>setForm(f=>({...f,vehicle_type:v}))}/>
            <Field label="Cooling Unit" value={form.cooling_unit} onChange={v=>setForm(f=>({...f,cooling_unit:v}))}/>
            <Field label="Capacity (kg)" type="number" value={form.capacity_kg} onChange={v=>setForm(f=>({...f,capacity_kg:v}))} min="0"/>
            <Field label="Cooling BTU/hr" type="number" value={form.cooling_capacity_btu} onChange={v=>setForm(f=>({...f,cooling_capacity_btu:v}))} min="0"/>
            <Field label="Min Temp (°C)" type="number" value={form.min_temp_capacity} onChange={v=>setForm(f=>({...f,min_temp_capacity:v}))} step="0.1"/>
            <Field label="Last Service" type="date" value={form.last_service_date?.slice(0,10)} onChange={v=>setForm(f=>({...f,last_service_date:v}))}/>
          </div>
          <Field label="" type="checkbox" value={form.is_operational} onChange={v=>setForm(f=>({...f,is_operational:v}))} placeholder="Operational"/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Save</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SPOILAGE PAGE
// ═══════════════════════════════════════════════════════════════
function SpoilagePage() {
  const [data, setData] = useState([])
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})

  const load = useCallback(async () => {
    setLoading(true)
    try { const [s,sh]=await Promise.all([api('/api/spoilage'),api('/api/shipments')]); setData(s); setShipments(sh) }
    catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [])
  useEffect(()=>{ load() },[load])

  const save = async () => {
    if (!form.shipment_id||!form.qty_sent||!form.qty_received) { toast.error('Required fields missing'); return }
    try { await api('/api/spoilage',{method:'POST',body:{...form,caused_by_heat_overload:!!form.caused_by_heat_overload,caused_by_delay:!!form.caused_by_delay}}); toast.success('Reported!'); setModal(null); load() }
    catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Spoilage" sub="Food loss tracking"><AddBtn onClick={()=>{ setForm({ caused_by_heat_overload:false, caused_by_delay:false }); setModal('form') }} label="+ Report Spoilage"/></PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="⚠️" msg="No spoilage records"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>{['Product','Farmer','Sent','Received','Spoiled','%','Cause','Loss','Detected'].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>{data.map((r,i)=><tr key={i} className="border-b border-gray-50">
              <td className="px-4 py-3 font-medium">{r.shipment?.product?.name||'?'}</td>
              <td className="px-4 py-3 text-gray-700">{r.shipment?.farmer?.name||'—'}</td>
              <td className="px-4 py-3">{r.qty_sent} kg</td>
              <td className="px-4 py-3">{r.qty_received} kg</td>
              <td className="px-4 py-3 font-semibold text-red-600">{r.qty_spoiled} kg</td>
              <td className="px-4 py-3">{r.spoilage_pct?.toFixed(1)||0}%</td>
              <td className="px-4 py-3 text-xs text-gray-500">{[r.caused_by_heat_overload&&'Heat',r.caused_by_delay&&'Delay',r.spoilage_reason].filter(Boolean).join(', ')||'—'}</td>
              <td className="px-4 py-3 text-red-600 font-semibold">{r.loss_amount!=null?bdt(r.loss_amount):'—'}</td>
              <td className="px-4 py-3 text-xs text-gray-700">{fmtDate(r.detected_at)}</td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {modal==='form'&&<Modal title="Report Spoilage" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Shipment" type="select" value={form.shipment_id} onChange={v=>setForm(f=>({...f,shipment_id:v}))}
            options={shipments.map(s=>({value:s.shipment_id,label:`${s.product?.name||'?'} — ${s.farmer?.name||'?'} (${s.shipment_id.slice(0,8)})`}))} required/>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Qty Sent (kg)" type="number" value={form.qty_sent} onChange={v=>setForm(f=>({...f,qty_sent:v}))} required min="0"/>
            <Field label="Qty Received" type="number" value={form.qty_received} onChange={v=>setForm(f=>({...f,qty_received:v}))} required min="0"/>
            <Field label="Qty Spoiled" type="number" value={form.qty_spoiled} onChange={v=>setForm(f=>({...f,qty_spoiled:v}))} required min="0"/>
          </div>
          <Field label="Reason" value={form.spoilage_reason} onChange={v=>setForm(f=>({...f,spoilage_reason:v}))} placeholder="Reason for spoilage"/>
          <div className="flex gap-4">
            <Field label="" type="checkbox" value={form.caused_by_heat_overload} onChange={v=>setForm(f=>({...f,caused_by_heat_overload:v}))} placeholder="Caused by heat overload"/>
            <Field label="" type="checkbox" value={form.caused_by_delay} onChange={v=>setForm(f=>({...f,caused_by_delay:v}))} placeholder="Caused by delay"/>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Report</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// HEAT MONITOR PAGE
// ═══════════════════════════════════════════════════════════════
function HeatMonitorPage() {
  const [data, setData] = useState([])
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})
  const [filter, setFilter] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      let url='/api/monitoring'
      if (filter==='breach') url+='?breach=true'
      if (filter==='overloaded') url+='?overloaded=true'
      const [m,s]=await Promise.all([api(url),api('/api/shipments')]); setData(m); setShipments(s)
    } catch(e) { toast.error(e.message) } finally { setLoading(false) }
  }, [filter])
  useEffect(()=>{ load() },[load])

  const save = async () => {
    if (!form.shipment_id||!form.ambient_temp||!form.internal_temp) { toast.error('Shipment, ambient & internal temp required'); return }
    try { await api('/api/monitoring',{method:'POST',body:form}); toast.success('Sensor log saved!'); setModal(null); load() }
    catch(e) { toast.error(e.message) }
  }

  return (
    <div>
      <PageHeader title="Heat Monitor" sub="Cold chain temperature tracking">
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All</option><option value="breach">Temp Breach</option><option value="overloaded">Overloaded</option>
        </select>
        <AddBtn onClick={()=>{ setForm({}); setModal('form') }} label="+ Log Sensor"/>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="🌡️" msg="No sensor logs"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>{['Product','Ambient','Internal','Limit','Heat Load','Cooling Cap','Ratio','Overloaded','Breach','Recorded'].map(h=><th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>{data.map((r,i)=>{
              const hl=r.calculated_heat_load_kw??r.heat_load_kw, cc=r.vehicle_cooling_cap_kw??r.cooling_cap_kw, lr=r.load_ratio
              const rowBg=r.is_overloaded?'bg-red-50/50':r.is_temp_breach?'bg-amber-50/50':''
              return <tr key={i} className={`border-b border-gray-50 ${rowBg}`}>
                <td className="px-3 py-2 font-medium">{r.product_name||r.shipment?.product?.name||'?'}<div className="text-[10px] text-gray-600">{r.shipment?.farmer?.name}</div></td>
                <td className="px-3 py-2">{r.ambient_temp}°C</td>
                <td className="px-3 py-2 font-semibold">{r.internal_temp}°C</td>
                <td className="px-3 py-2 text-gray-700">{r.ideal_temp_max!=null?r.ideal_temp_max+'°C':'—'}</td>
                <td className="px-3 py-2">{hl!=null?Number(hl).toFixed(3)+' kW':'—'}</td>
                <td className="px-3 py-2 text-gray-700">{cc!=null?Number(cc).toFixed(3)+' kW':'—'}</td>
                <td className="px-3 py-2">{lr!=null?Number(lr).toFixed(2):'—'}</td>
                <td className="px-3 py-2"><Badge s={r.is_overloaded?'HIGH':'LOW'}/></td>
                <td className="px-3 py-2"><Badge s={r.is_temp_breach?'HIGH':'LOW'}/></td>
                <td className="px-3 py-2 text-xs text-gray-700">{fmtDate(r.recorded_at)}</td>
              </tr>
            })}</tbody>
          </table></div>
        )}
      </div>
      {modal==='form'&&<Modal title="Log Sensor Reading" onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="Shipment" type="select" value={form.shipment_id} onChange={v=>setForm(f=>({...f,shipment_id:v}))}
            options={shipments.map(s=>({value:s.shipment_id,label:`${s.product?.name||'?'} — ${s.farmer?.name||'?'} (${s.status})`}))} required/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ambient Temp (°C)" type="number" value={form.ambient_temp} onChange={v=>setForm(f=>({...f,ambient_temp:v}))} required step="0.1"/>
            <Field label="Internal Temp (°C)" type="number" value={form.internal_temp} onChange={v=>setForm(f=>({...f,internal_temp:v}))} required step="0.1"/>
            <Field label="Humidity (%)" type="number" value={form.humidity} onChange={v=>setForm(f=>({...f,humidity:v}))} min="0" max="100"/>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Save</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// WEATHER PAGE
// ═══════════════════════════════════════════════════════════════
function WeatherPage() {
  const [data, setData] = useState([])
  const [weatherCache, setWeatherCache] = useState([])
  const [districts, setDistricts] = useState([])
  const [loading, setLoading] = useState(true)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [refreshingWeather, setRefreshingWeather] = useState(false)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({})

  const loadWeatherCache = useCallback(async () => {
    const cache = await api('/api/weather-cache').catch(() => [])
    const rows = sortWeatherCache(Array.isArray(cache) ? cache : [])
    setWeatherCache(rows)
    return rows
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setWeatherLoading(true)
    try {
      const [events, districtRows, cacheRows] = await Promise.all([
        api('/api/weather-events'),
        loadDistricts(),
        loadWeatherCache(),
      ])
      setData(Array.isArray(events) ? events : [])
      setDistricts(districtRows)
      setWeatherCache(cacheRows)
    } catch(e) {
      toast.error(e.message)
    } finally {
      setLoading(false)
      setWeatherLoading(false)
    }
  }, [loadWeatherCache])

  const refreshWeather = useCallback(async (silent = false) => {
    setRefreshingWeather(true)
    try {
      const result = await api('/api/weather-cache/refresh', { method:'POST' })
      const cacheRows = await loadWeatherCache()
      setWeatherLoading(false)
      if (!silent) {
        toast.success(result?.updated ? `Live weather updated for ${result.updated} districts` : 'Live weather refresh completed')
      } else if (!cacheRows.length && result?.errors?.length) {
        toast.error(result.errors[0])
      }
    } catch(e) {
      if (!silent) toast.error(e.message)
    } finally {
      setRefreshingWeather(false)
    }
  }, [loadWeatherCache])

  useEffect(()=>{ load() },[load])
  useEffect(() => {
    const latestFetch = Math.max(...weatherCache.map(row => new Date(row?.fetched_at || 0).getTime()), 0)
    const isStale = !latestFetch || (Date.now() - latestFetch) > 20 * 60 * 1000
    if (!refreshingWeather && (weatherCache.length === 0 || isStale)) refreshWeather(true)
  }, [weatherCache, refreshingWeather, refreshWeather])

  const openAdd = () => { setForm({ severity_level:'LOW', delay_impact_hours:4, started_at:toLocalDT(new Date().toISOString()) }); setModal('form') }
  const openFromWeather = row => {
    const suggestion = deriveWeatherEvent(row)
    setForm({
      district_id: row?.district_id || '',
      event_type: suggestion?.event_type || '',
      severity_level: suggestion?.severity_level || 'LOW',
      delay_impact_hours: suggestion?.delay_impact_hours || 0,
      started_at: toLocalDT(new Date().toISOString()),
      ended_at: '',
      description: `Open-Meteo live weather for ${row?.district?.name || 'district'}: ${describeWeather(row)}`
    })
    setModal('form')
  }
  const save = async () => {
    if (!form.district_id||!form.event_type||!form.started_at) { toast.error('District, type and start time required'); return }
    try {
      const body={...form, started_at:new Date(form.started_at).toISOString(), ended_at:form.ended_at?new Date(form.ended_at).toISOString():null}
      if (form.event_id) await api(`/api/weather-events/${form.event_id}`,{method:'PUT',body})
      else await api('/api/weather-events',{method:'POST',body})
      toast.success(form.event_id?'Updated!':'Logged! Active shipments auto-marked DELAYED.'); setModal(null); load()
    } catch(e) { toast.error(e.message) }
  }
  const TYPES = ['Flood','Drought','Storm','Heatwave','Cold_Wave','Heavy_Rain','Cyclone']

  return (
    <div>
      <PageHeader title="Weather Events" sub="Climate impact tracking">
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshWeather()}
            disabled={refreshingWeather}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-950 hover:bg-gray-50 disabled:opacity-60">
            {refreshingWeather ? 'Refreshing…' : 'Refresh Live Weather'}
          </button>
          <AddBtn onClick={openAdd} label="+ Log Event"/>
        </div>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="font-bold text-gray-950">Live District Weather</h3>
            <p className="text-sm text-gray-800 mt-0.5 font-medium">Auto-fetched from Open-Meteo and stored in `weather_cache` for each district.</p>
          </div>
          {weatherCache.length > 0 && <span className="text-xs text-gray-800 font-semibold">{weatherCache.length} districts tracked</span>}
        </div>
        {weatherLoading ? <Loader/> : weatherCache.length===0 ? <Empty icon="☁️" msg="No live weather found yet. Use Refresh Live Weather."/> : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {weatherCache.map((row, i) => {
              const suggestion = deriveWeatherEvent(row)
              const tone = suggestion?.severity_level === 'HIGH'
                ? 'border-red-200 bg-red-50/70'
                : suggestion?.severity_level === 'MEDIUM'
                  ? 'border-amber-200 bg-amber-50/70'
                  : 'border-gray-200 bg-gray-50'

              return (
                <div key={row.cache_id || row.district_id || i} className={`rounded-2xl border p-4 ${tone}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-950">{row.district?.name || 'Unknown district'}</p>
                      <p className="text-xs text-gray-800 font-medium">{row.district?.division || 'Bangladesh'} · {row.condition_text || 'Live weather'}</p>
                    </div>
                    {suggestion ? <Badge s={suggestion.severity_level}/> : <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700">Stable</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div className="rounded-xl bg-white/80 border border-white px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-gray-700 font-semibold">Temp</p>
                      <p className="text-lg font-bold text-gray-950">{formatMetric(row.temp_celsius, '°C')}</p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-white px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-gray-700 font-semibold">Feels Like</p>
                      <p className="text-lg font-bold text-gray-950">{formatMetric(row.feels_like_celsius, '°C')}</p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-white px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-gray-700 font-semibold">Rain</p>
                      <p className="text-base font-bold text-gray-950">{formatMetric(row.rain_mm, ' mm')}</p>
                    </div>
                    <div className="rounded-xl bg-white/80 border border-white px-3 py-2">
                      <p className="text-[11px] uppercase tracking-wide text-gray-700 font-semibold">Wind</p>
                      <p className="text-base font-bold text-gray-950">{formatMetric(row.wind_speed_kmh, ' km/h')}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-gray-900 font-semibold">
                        {suggestion ? `${suggestion.event_type.replace(/_/g,' ')} suggested` : 'Manual event optional'}
                      </p>
                      <p className="text-[11px] text-gray-800 font-medium">
                        {suggestion ? `Estimated delay impact: ${suggestion.delay_impact_hours}h` : `Fetched ${fmtDT(row.fetched_at)}`}
                      </p>
                    </div>
                    <button onClick={() => openFromWeather(row)} className="px-3 py-1.5 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold">
                      {suggestion ? 'Use Weather' : 'Log Event'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="⛅" msg="No weather events"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>{['Type','District','Severity','Delay Impact','Description','Started','Ended','Status',''].map(h=><th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>{data.map((r,i)=><tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium">{r.event_type?.replace(/_/g,' ')}</td>
              <td className="px-4 py-3">{r.district?.name||'?'}</td>
              <td className="px-4 py-3"><Badge s={r.severity_level}/></td>
              <td className="px-4 py-3 text-gray-700">{r.delay_impact_hours}h</td>
              <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">{r.description||'—'}</td>
              <td className="px-4 py-3 text-xs">{fmtDate(r.started_at)}</td>
              <td className="px-4 py-3 text-xs text-gray-700">{r.ended_at?fmtDate(r.ended_at):'—'}</td>
              <td className="px-4 py-3"><Badge s={r.ended_at?'Inactive':'Active'}/></td>
              <td className="px-4 py-3"><button onClick={()=>{ setForm({...r,started_at:toLocalDT(r.started_at),ended_at:r.ended_at?toLocalDT(r.ended_at):''}); setModal('form') }} className="px-2 py-1 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">Edit</button></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </div>
      {modal==='form'&&<Modal title={form.event_id?'Edit Weather Event':'Log Weather Event'} onClose={()=>setModal(null)}>
        <div className="space-y-3">
          <Field label="District" type="select" value={form.district_id} onChange={v=>setForm(f=>({...f,district_id:v}))} options={districts.map(d=>({value:d.district_id,label:d.name}))} required/>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Event Type" type="select" value={form.event_type} onChange={v=>setForm(f=>({...f,event_type:v}))} options={TYPES.map(t=>({value:t,label:t.replace(/_/g,' ')}))} required/>
            <Field label="Severity" type="select" value={form.severity_level} onChange={v=>setForm(f=>({...f,severity_level:v}))} options={['LOW','MEDIUM','HIGH'].map(s=>({value:s,label:s}))}/>
            <Field label="Delay Impact (hours)" type="number" value={form.delay_impact_hours} onChange={v=>setForm(f=>({...f,delay_impact_hours:v}))} min="0"/>
            <div/>
            <Field label="Started At" type="datetime-local" value={form.started_at} onChange={v=>setForm(f=>({...f,started_at:v}))} required/>
            <Field label="Ended At" type="datetime-local" value={form.ended_at} onChange={v=>setForm(f=>({...f,ended_at:v}))}/>
          </div>
          <Field label="Description" type="textarea" value={form.description} onChange={v=>setForm(f=>({...f,description:v}))} rows={2}/>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={()=>setModal(null)} className="px-4 py-2 text-sm rounded-xl border border-gray-200">Cancel</button>
            <button onClick={save} className="px-4 py-2 text-sm rounded-xl bg-green-600 text-white">Save</button>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PRICE AUDIT PAGE
// ═══════════════════════════════════════════════════════════════
function PriceAuditPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const load = useCallback(async () => { setLoading(true); try { setData(await api('/api/price-audit')) } catch(e) { toast.error(e.message) } finally { setLoading(false) } }, [])
  useEffect(()=>{ load() },[load])

  return (
    <div>
      <PageHeader title="Price Audit" sub="Automatic price change history"/>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="💰" msg="No price changes"/>:(
          <div className="overflow-x-auto"><table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100"><tr>{['Product','Type','Old Price','New Price','Change','Profit/Revenue','Source','Reason','Date'].map(h=><th key={h} className="text-left px-3 py-3 text-xs font-semibold text-gray-500">{h}</th>)}</tr></thead>
            <tbody>{data.map((r,i)=>{
              const isDelivery=r.change_type==='DELIVERY_PROFIT'
              const diff=Number(r.new_price||0)-Number(r.old_price||0)
              return <tr key={i} className={`border-b border-gray-50 ${isDelivery?'bg-green-50/50':''}`}>
                <td className="px-3 py-2 font-medium">{r.product?.name||r.product_name||'?'}</td>
                <td className="px-3 py-2"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{r.change_type?.replace(/_/g,' ')}</span></td>
                <td className="px-3 py-2 text-gray-700">{bdt(r.old_price)}</td>
                <td className="px-3 py-2 font-semibold">{bdt(r.new_price)}</td>
                <td className="px-3 py-2" style={{color:diff>0?'#dc2626':diff<0?'#16a34a':'#6b7280'}}>{diff>0?'▲':diff<0?'▼':'='} {bdt(Math.abs(diff))}</td>
                <td className="px-3 py-2 text-xs">{isDelivery?(<span style={{color:r.profit_status==='PROFIT'?'#16a34a':r.profit_status==='LOSS'?'#dc2626':'#6b7280'}}>{r.profit_status}: {bdt(Math.abs(r.gross_profit||0))}</span>):('—')}</td>
                <td className="px-3 py-2 text-xs text-gray-500">{r.price_source}</td>
                <td className="px-3 py-2 text-xs text-gray-600 max-w-xs truncate">{r.reason||r.market_note||'—'}</td>
                <td className="px-3 py-2 text-xs text-gray-700">{fmtDate(r.changed_at)}</td>
              </tr>
            })}</tbody>
          </table></div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// PROVENANCE PAGE
// ═══════════════════════════════════════════════════════════════
function ProvenancePage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sevFilter, setSevFilter] = useState('')
  const load = useCallback(async () => { setLoading(true); try { setData(await api(`/api/provenance${sevFilter?'?severity='+sevFilter:''}`)) } catch(e) { toast.error(e.message) } finally { setLoading(false) } }, [sevFilter])
  useEffect(()=>{ load() },[load])
  const SEV_COLOR = { CRITICAL:'text-red-600 bg-red-50', WARNING:'text-amber-600 bg-amber-50', INFO:'text-blue-600 bg-blue-50' }

  return (
    <div>
      <PageHeader title="Provenance" sub="Full audit trail of all events">
        <select value={sevFilter} onChange={e=>setSevFilter(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none">
          <option value="">All Severity</option>{['CRITICAL','WARNING','INFO'].map(s=><option key={s} value={s}>{s}</option>)}
        </select>
      </PageHeader>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading?<Loader/>:data.length===0?<Empty icon="📋" msg="No provenance events"/>:(
          <div className="divide-y divide-gray-50">
            {data.map((r,i)=>(
              <div key={i} className={`flex items-start gap-4 px-5 py-3 ${r.severity==='CRITICAL'?'bg-red-50/30':r.severity==='WARNING'?'bg-amber-50/30':''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm ${SEV_COLOR[r.severity]||'bg-gray-50 text-gray-600'}`}>
                  {r.severity==='CRITICAL'?'🔴':r.severity==='WARNING'?'🟡':'🔵'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-gray-900">{r.event_type?.replace(/_/g,' ')}</span>
                    <Badge s={r.severity}/>
                    {r.shipment?.product?.name&&<span className="text-xs text-gray-600">{r.shipment.product.name}</span>}
                  </div>
                  {r.description&&<p className="text-xs text-gray-600 mt-0.5 truncate">{r.description}</p>}
                  <p className="text-xs text-gray-700 mt-0.5 font-medium">{fmtDT(r.event_time)}{r.shipment?.farmer?.name&&` · ${r.shipment.farmer.name}`}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// SIDEBAR NAV CONFIG
// ═══════════════════════════════════════════════════════════════
const NAV = [
  { key:'dashboard',  icon:'📊', label:'Dashboard' },
  { key:'orders',     icon:'🛒', label:'Orders' },
  { key:'shipments',  icon:'🚚', label:'Shipments' },
  { key:'farmers',    icon:'👨‍🌾', label:'Farmers' },
  { key:'products',   icon:'📦', label:'Products' },
  { key:'notifications', icon:'🔔', label:'Notifications' },
]
const NAV_LOG = [
  { key:'warehouses', icon:'🏭', label:'Warehouses' },
  { key:'vehicles',   icon:'🚛', label:'Vehicles' },
  { key:'product-requests', icon:'🔄', label:'Transfer Requests' },
]
const NAV_MON = [
  { key:'spoilage',   icon:'⚠️',  label:'Spoilage' },
  { key:'monitoring', icon:'🌡️', label:'Heat Monitor' },
  { key:'weather',    icon:'⛅', label:'Weather' },
  { key:'priceaudit', icon:'💰', label:'Price Audit' },
  { key:'provenance', icon:'📋', label:'Provenance' },
]

// ═══════════════════════════════════════════════════════════════
// MAIN DASHBOARD LAYOUT
// ═══════════════════════════════════════════════════════════════
export default function Dashboard({ onLogout }) {
  const [page, setPage] = useState('dashboard')
  const toasts = useToastSystem()

  const user = (() => {
    try { return JSON.parse(sessionStorage.getItem('agromart_user') || '{}') } catch { return {} }
  })()

  const allNav = [...NAV, ...NAV_LOG, ...NAV_MON]

  const renderPage = () => {
    switch(page) {
      case 'dashboard':  return <DashboardOverview/>
      case 'orders':     return <OrdersPage/>
      case 'shipments':  return <ShipmentsPage/>
      case 'farmers':    return <FarmersPage/>
      case 'products':   return <ProductsPage/>
      case 'warehouses': return <WarehousesPage/>
      case 'vehicles':   return <VehiclesPage/>
      case 'spoilage':   return <SpoilagePage/>
      case 'monitoring': return <HeatMonitorPage/>
      case 'weather':    return <WeatherPage/>
      case 'priceaudit': return <PriceAuditPage/>
      case 'provenance': return <ProvenancePage/>
      case 'product-requests': return <ProductRequestsPage/>
      case 'notifications':    return <NotificationsPage/>
      default:           return <DashboardOverview/>
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50" style={{ fontFamily:'Inter,sans-serif' }}>
      <ToastContainer toasts={toasts}/>

      {/* ── SIDEBAR ── */}
      <aside className="w-56 flex-shrink-0 flex flex-col py-5 px-3 overflow-y-auto" style={{ background:'#0a1e12' }}>
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">⚡</div>
          <span className="text-white font-bold text-base">AgroMart</span>
        </div>

        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV.map(n=>(
            <button key={n.key} onClick={()=>setPage(n.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                ${page===n.key?'bg-green-700 text-white':'text-green-200 hover:bg-green-900/50 hover:text-white'}`}>
              <span className="w-5 text-center text-base">{n.icon}</span>{n.label}
            </button>
          ))}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-green-700/80 px-3 mt-4 mb-1">Logistics</p>
          {NAV_LOG.map(n=>(
            <button key={n.key} onClick={()=>setPage(n.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                ${page===n.key?'bg-green-700 text-white':'text-green-200 hover:bg-green-900/50 hover:text-white'}`}>
              <span className="w-5 text-center text-base">{n.icon}</span>{n.label}
            </button>
          ))}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-green-700/80 px-3 mt-4 mb-1">Monitoring</p>
          {NAV_MON.map(n=>(
            <button key={n.key} onClick={()=>setPage(n.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left
                ${page===n.key?'bg-green-700 text-white':'text-green-200 hover:bg-green-900/50 hover:text-white'}`}>
              <span className="w-5 text-center text-base">{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        <div className="pt-3 border-t border-green-900/50 mt-4">
          <div className="flex items-center gap-2 px-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-400"/>
            <span className="text-green-300 text-xs">DB Connected</span>
          </div>
          <div className="flex items-center justify-between px-2">
            <div>
              <p className="text-white text-xs font-semibold truncate max-w-[100px]">{user.email?.split('@')[0]||'Admin'}</p>
              <p className="text-green-400 text-[10px]">Admin</p>
            </div>
            <button onClick={onLogout} title="Logout"
              className="text-green-400 hover:text-red-400 transition text-sm font-bold flex-shrink-0">↪</button>
          </div>
        </div>
      </aside>

      {/* ── CONTENT ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
