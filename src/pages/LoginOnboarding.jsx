import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'

export default function LoginOnboarding() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') || '').trim()
    const password = String(form.get('password') || '')

    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.message || 'Unable to authenticate. Please verify your credentials.')
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-surface text-on-surface h-screen w-full flex overflow-hidden">
      <div className="hidden lg:flex w-[55%] relative flex-col justify-between p-xl bg-sidebar-bg">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-sidebar-bg/80 via-sidebar-bg/40 to-sidebar-bg/90"></div>
        <div className="relative z-10 flex items-center gap-sm">
          <span className="material-symbols-outlined text-active-highlight" style={{fontSize: '32px', fontVariationSettings: "'FILL' 1"}}>agriculture</span>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-secondary tracking-tight">Agromart</h1>
            <p className="font-label-sm text-label-sm text-active-highlight uppercase tracking-widest">Supply Chain Management</p>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-2xl mt-auto">
          <h2 className="font-display-lg text-display-lg text-on-secondary mb-lg leading-tight">Command your<br />entire supply network.</h2>
          <div className="grid grid-cols-2 gap-md bg-white/40 backdrop-blur-md p-lg rounded-xl border border-white/30">
            <div className="flex items-start gap-md"><div className="p-sm bg-surface-container-low/10 rounded-lg shrink-0"><span className="material-symbols-outlined text-active-highlight">inventory_2</span></div><div><h3 className="font-label-md text-label-md text-on-secondary mb-xs">Inventory Core</h3><p className="font-body-sm text-body-sm text-on-secondary/70">Real-time tracking from warehouse to dispatch. Prevent spoilage with predictive analytics.</p></div></div>
            <div className="flex items-start gap-md"><div className="p-sm bg-surface-container-low/10 rounded-lg shrink-0"><span className="material-symbols-outlined text-active-highlight">local_shipping</span></div><div><h3 className="font-label-md text-label-md text-on-secondary mb-xs">Fleet & Shipments</h3><p className="font-body-sm text-body-sm text-on-secondary/70">Monitor vehicle telemetry and route optimization across global logistics hubs.</p></div></div>
            <div className="flex items-start gap-md"><div className="p-sm bg-surface-container-low/10 rounded-lg shrink-0"><span className="material-symbols-outlined text-active-highlight">verified</span></div><div><h3 className="font-label-md text-label-md text-on-secondary mb-xs">Provenance Ledger</h3><p className="font-body-sm text-body-sm text-on-secondary/70">Immutable audit trails verifying farmer origin and price compliance.</p></div></div>
            <div className="flex items-start gap-md"><div className="p-sm bg-surface-container-low/10 rounded-lg shrink-0"><span className="material-symbols-outlined text-active-highlight">monetization_on</span></div><div><h3 className="font-label-md text-label-md text-on-secondary mb-xs">Price Audit</h3><p className="font-body-sm text-body-sm text-on-secondary/70">Automated financial reconciliations against dynamic weather and spoilage indices.</p></div></div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-xl bg-surface relative">
        <div className="lg:hidden absolute top-xl left-xl flex items-center gap-sm"><span className="material-symbols-outlined text-sidebar-bg" style={{fontSize: '28px', fontVariationSettings: "'FILL' 1"}}>agriculture</span><span className="font-headline-sm text-headline-sm font-bold text-sidebar-bg">Agromart SCM</span></div>
        <div className="w-full max-w-sm">
          <div className="mb-xl text-center lg:text-left"><h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">Secure Access</h2><p className="font-body-md text-body-md text-on-surface-variant">Authenticate to enter the control center.</p></div>
          <form className="space-y-lg flex flex-col" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-sm"><label className="font-label-sm text-label-sm text-on-surface uppercase" htmlFor="email">Work Email</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none"><span className="material-symbols-outlined text-on-surface-variant text-opacity-50">mail</span></div><input className="block w-full pl-[44px] pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-sidebar-bg focus:ring-1 focus:ring-sidebar-bg transition-colors" id="email" name="email" placeholder="operator@agromart.com" required type="email" autoComplete="email" /></div></div>
            <div className="flex flex-col gap-sm"><div className="flex justify-between items-center"><label className="font-label-sm text-label-sm text-on-surface uppercase" htmlFor="password">Security Key</label><a className="font-label-sm text-label-sm text-sidebar-bg hover:text-sidebar-bg/80 transition-colors" href="#">Recover Access</a></div><div className="relative"><div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none"><span className="material-symbols-outlined text-on-surface-variant text-opacity-50">lock</span></div><input className="block w-full pl-[44px] pr-md py-sm bg-surface-container-lowest border border-outline-variant rounded-md font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:border-sidebar-bg focus:ring-1 focus:ring-sidebar-bg transition-colors" id="password" name="password" placeholder="••••••••••••" required type="password" autoComplete="current-password" /></div></div>
            <div className="bg-surface-container-low p-md rounded-lg flex items-start gap-sm border border-outline-variant/30"><span className="material-symbols-outlined text-on-surface-variant text-sm mt-0.5">policy</span><p className="font-body-sm text-body-sm text-on-surface-variant">By authenticating, you agree to the strict data governance and surveillance policies of the Agromart administrative network.</p></div>
            {error && <div role="alert" className="p-md rounded-lg border border-red-300 bg-red-50 text-red-700 font-body-sm">{error}</div>}
            <button disabled={submitting} className="w-full flex justify-center items-center gap-sm bg-primary hover:bg-primary-container disabled:opacity-60 disabled:cursor-not-allowed text-on-primary py-md rounded-md font-label-md text-label-md transition-all duration-200 active:scale-[0.98]" type="submit">{submitting ? <><span className="animate-spin material-symbols-outlined" style={{fontSize: '18px'}}>progress_activity</span><span>Authenticating...</span></> : <><span>Initialize Session</span><span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_forward</span></>}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
