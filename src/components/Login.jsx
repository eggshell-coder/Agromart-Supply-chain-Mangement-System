import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_566VpDhmAdFAWvayfT7fIw_XvWswQXW'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
const SLIDES = [
  { img: '/images/delivery.webp', label: 'Seamless Delivery Tracking', desc: 'Real-time vehicle & cold-chain monitoring across Bangladesh.' },
  { img: '/images/market.webp', label: 'Farm-to-Market Intelligence', desc: 'Price audit, spoilage alerts and provenance in one platform.' },
  { img: '/images/login.webp', label: 'Live Agro Supply Chain', desc: 'Track every shipment from farm to warehouse to buyer.' },
  { img: '/images/weather.webp', label: 'Weather-Smart Agriculture', desc: 'Auto-delay & price adjustment based on live weather events.' },
]
function normalizeError(msg = '') {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'Incorrect email or password.'
  if (m.includes('email not confirmed')) return 'Please verify your email first.'
  if (m.includes('already registered') || m.includes('already been registered')) return 'An account with this email already exists.'
  if (m.includes('password')) return 'Password does not meet the minimum requirements.'
  if (m.includes('network') || m.includes('fetch')) return 'Network error. Check your connection.'
  return msg || 'Authentication failed. Please try again.'
}

export default function Login({ onSuccess }) {
  const [slide, setSlide] = useState(0), [email, setEmail] = useState(''), [fullName, setFullName] = useState('')
  const [password, setPassword] = useState(''), [showPass, setShowPass] = useState(false), [authMode, setAuthMode] = useState('signin')
  const [requestedRole, setRequestedRole] = useState('admin'), [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(''), [successMsg, setSuccessMsg] = useState(''), [logoSrc, setLogoSrc] = useState('/logo1.webp')
  const timerRef = useRef(null)
  useEffect(() => { timerRef.current = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 4500); return () => clearInterval(timerRef.current) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault(); setErrorMsg(''); setSuccessMsg(''); setLoading(true)
    try {
      if (authMode === 'signup') {
        if (!fullName.trim()) { setErrorMsg('Enter your full name.'); return }
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: fullName.trim(), requested_role: requestedRole } } })
        if (error) { setErrorMsg(normalizeError(error.message)); return }
        if (data.session) {
          sessionStorage.setItem('agromart_user', JSON.stringify(data.user)); sessionStorage.setItem('agromart_token', data.session.access_token)
          setSuccessMsg('Account created. Your request is being checked…'); setTimeout(() => onSuccess?.(), 500)
        } else {
          setSuccessMsg('Registration submitted. Verify your email, then wait for administrator approval before signing in.'); setAuthMode('signin'); setPassword('')
        }
        return
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) { setErrorMsg(normalizeError(error.message)); return }
      if (!data?.session) { setErrorMsg('No authenticated session returned.'); return }
      sessionStorage.setItem('agromart_user', JSON.stringify(data.user)); sessionStorage.setItem('agromart_token', data.session.access_token)
      setSuccessMsg('Login successful. Opening dashboard…'); setTimeout(() => onSuccess?.(), 350)
    } catch (err) { setErrorMsg(normalizeError(err?.message)) } finally { setLoading(false) }
  }
  const handleForgot = async () => {
    if (!email.trim()) { setErrorMsg('Enter your email first.'); return }
    setLoading(true); setErrorMsg(''); setSuccessMsg('')
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/login` })
      if (error) { setErrorMsg(normalizeError(error.message)); return }
      setSuccessMsg('Password reset link sent. Check your email.')
    } catch (err) { setErrorMsg(normalizeError(err?.message)) } finally { setLoading(false) }
  }
  const cur = SLIDES[slide]
  return <div style={{position:'relative',minHeight:'100dvh',width:'100%',overflow:'hidden',fontFamily:'Inter,-apple-system,sans-serif'}}>
    {SLIDES.map((s,i)=><div key={s.img} style={{position:'absolute',inset:0,opacity:i===slide?1:0,transition:'opacity 1.2s ease-in-out',zIndex:0}}><img src={s.img} alt="" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transform:'scale(1.05)'}}/></div>)}
    <div style={{position:'absolute',inset:0,zIndex:1,background:'linear-gradient(110deg,rgba(8,28,16,.72) 0%,rgba(8,28,16,.45) 48%,rgba(8,28,16,.28) 100%)'}}/>
    <div style={{position:'relative',zIndex:2,minHeight:'100dvh',display:'grid',gridTemplateColumns:'minmax(0,1fr) min(480px,94vw)',alignItems:'center',gap:32,padding:'clamp(24px,4vw,56px) clamp(16px,4vw,56px)'}}>
      <div style={{color:'rgba(237,255,245,.97)',textShadow:'0 8px 24px rgba(6,42,22,.45)'}}><p style={{margin:0,fontSize:'.85rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(163,230,153,.9)'}}>AgroMart Bangladesh</p><AnimatePresence mode="wait"><motion.div key={slide} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.6}}><h1 style={{margin:'14px 0 0',fontSize:'clamp(2.1rem,4.2vw,4rem)',lineHeight:1.03,letterSpacing:'-.03em',fontWeight:800}}>Banglar matir golpo,<br/><span style={{color:'#a7f3d0'}}>{cur.label}.</span></h1><p style={{margin:'18px 0 0',maxWidth:560,color:'rgba(220,255,237,.88)',fontSize:'clamp(.95rem,1.1vw,1.08rem)',lineHeight:1.7}}>{cur.desc}</p></motion.div></AnimatePresence></div>
      <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.15}}><div style={{background:'rgba(240,255,246,.96)',backdropFilter:'blur(20px)',borderRadius:24,border:'1px solid rgba(255,255,255,.72)',boxShadow:'0 32px 80px rgba(4,18,10,.45)',padding:'32px 36px 36px'}}>
        <div style={{textAlign:'center',marginBottom:24}}><div style={{width:72,height:72,borderRadius:'50%',overflow:'hidden',margin:'0 auto 14px',background:'#efe4c5',border:'3px solid rgba(34,197,94,.3)'}}><img src={logoSrc} alt="AgroMart" onError={()=>setLogoSrc('/logo.webp')} style={{width:'100%',height:'100%',objectFit:'cover',transform:'scale(1.4)'}}/></div><p style={{margin:0,fontSize:'.72rem',fontWeight:700,letterSpacing:'.15em',textTransform:'uppercase',color:'#2a7a4b'}}>🌾 AgroMart</p><h2 style={{margin:'8px 0 4px',fontSize:'1.55rem',fontWeight:800,color:'#0f2d1a'}}>{authMode==='signup'?'Staff Registration':'Welcome Back'}</h2><p style={{margin:0,fontSize:'.85rem',color:'#4a7a5c'}}>{authMode==='signup'?'Request an Admin or Super Admin account':'Sign in to continue your workflow'}</p></div>
        {errorMsg&&<div role="alert" style={{marginBottom:14,padding:'10px 12px',borderRadius:10,background:'#fee2e2',color:'#991b1b',fontSize:13}}>{errorMsg}</div>}{successMsg&&<div role="status" style={{marginBottom:14,padding:'10px 12px',borderRadius:10,background:'#dcfce7',color:'#166534',fontSize:13}}>{successMsg}</div>}
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:14}}>
          {authMode==='signup'&&<><div><label style={{display:'block',fontSize:'.82rem',fontWeight:700,color:'#1e4d30',marginBottom:6}}>Full name</label><input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Your full name" required style={{width:'100%',height:48,borderRadius:12,border:'1.5px solid rgba(34,197,94,.3)',padding:'0 16px',boxSizing:'border-box',color:'#0f2d1a'}}/></div><div><label style={{display:'block',fontSize:'.82rem',fontWeight:700,color:'#1e4d30',marginBottom:6}}>Account type</label><select value={requestedRole} onChange={e=>setRequestedRole(e.target.value)} style={{width:'100%',height:48,borderRadius:12,border:'1.5px solid rgba(34,197,94,.3)',padding:'0 16px',boxSizing:'border-box',color:'#0f2d1a'}}><option value="admin">Admin — operations access</option><option value="superadmin">Super Admin — audit & staff governance</option></select><p style={{fontSize:11,color:'#6b8f76',margin:'6px 0 0'}}>Role requests never grant access automatically. A pending account must be approved.</p></div></>}
          <div><label style={{display:'block',fontSize:'.82rem',fontWeight:700,color:'#1e4d30',marginBottom:6}}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@agromart.com" required style={{width:'100%',height:48,borderRadius:12,border:'1.5px solid rgba(34,197,94,.3)',padding:'0 16px',boxSizing:'border-box',color:'#0f2d1a'}}/></div>
          <div><label style={{display:'block',fontSize:'.82rem',fontWeight:700,color:'#1e4d30',marginBottom:6}}>Password</label><div style={{position:'relative'}}><input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" minLength={6} required style={{width:'100%',height:48,borderRadius:12,border:'1.5px solid rgba(34,197,94,.3)',padding:'0 72px 0 16px',boxSizing:'border-box',color:'#0f2d1a'}}/><button type="button" onClick={()=>setShowPass(p=>!p)} style={{position:'absolute',right:10,top:10,height:28,border:0,background:'transparent',cursor:'pointer',color:'#2a7a4b'}}>{showPass?'Hide':'Show'}</button></div></div>
          {authMode==='signin'&&<button type="button" onClick={handleForgot} disabled={loading} style={{alignSelf:'flex-end',border:0,background:'none',color:'#247a46',fontSize:12,fontWeight:700,cursor:'pointer'}}>Forgot password?</button>}
          <button type="submit" disabled={loading} style={{height:50,border:0,borderRadius:12,background:loading?'#86efac':'#16803d',color:'white',fontWeight:800,cursor:loading?'wait':'pointer'}}>{loading?'Please wait…':authMode==='signup'?'Submit Registration':'Sign In'}</button>
        </form>
        <div style={{textAlign:'center',marginTop:20,fontSize:13,color:'#4a7a5c'}}>{authMode==='signup'?'Already have an account?':'Need a staff account?'} <button type="button" onClick={()=>{setAuthMode(m=>m==='signin'?'signup':'signin');setErrorMsg('');setSuccessMsg('')}} style={{border:0,background:'none',color:'#0f6b34',fontWeight:800,cursor:'pointer'}}>{authMode==='signup'?'Sign In':'Register'}</button></div><p style={{margin:'14px 0 0',textAlign:'center',fontSize:11,color:'#6b8f76'}}>Farmers are business records entered by staff. They do not register or log in.</p>
      </div></motion.div>
    </div>
  </div>
}
