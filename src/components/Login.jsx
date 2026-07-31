import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL      || 'https://qhkckodhjvnuoablpfwq.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoa2Nrb2RoanZudW9hYmxwZndxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMjAwNzcsImV4cCI6MjA5MjU5NjA3N30.ifETbDHuaqlSUOl20SFLCAFzzuBbaqhc_bglCCa1LrU'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true }
})

// 4 background images + matching labels
const SLIDES = [
  { img: '/images/delivery.png',  label: 'Seamless Delivery Tracking',    desc: 'Real-time vehicle & cold-chain monitoring across Bangladesh.' },
  { img: '/images/market.png',    label: 'Farm-to-Market Intelligence',   desc: 'Price audit, spoilage alerts and provenance in one platform.' },
  { img: '/images/login.png',     label: 'Live Agro Supply Chain',        desc: 'Track every shipment from farm to warehouse to buyer.' },
  { img: '/images/weather.png',   label: 'Weather-Smart Agriculture',     desc: 'Auto-delay & price adjustment based on live weather events.' },
]

function normalizeError(msg = '') {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'Incorrect email or password.'
  if (m.includes('email not confirmed')) return 'Please verify your email first.'
  if (m.includes('network') || m.includes('fetch')) return 'Network error. Check your connection.'
  return msg || 'Login failed. Please try again.'
}

export default function Login({ onSuccess }) {
  const [slide,      setSlide]      = useState(0)
  const [prevSlide,  setPrevSlide]  = useState(null)
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [authMode,   setAuthMode]   = useState('signin')
  const [loading,    setLoading]    = useState(false)
  const [errorMsg,   setErrorMsg]   = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [logoSrc,    setLogoSrc]    = useState('/logo1.png')
  const timerRef = useRef(null)

  // ── Auto-slideshow every 4.5s ─────────────────────────────────
  const goTo = (i) => {
    setPrevSlide(slide)
    setSlide(i)
  }
  const goNext = () => {
    const next = (slide + 1) % SLIDES.length
    setPrevSlide(slide)
    setSlide(next)
  }

  useEffect(() => {
    timerRef.current = setInterval(goNext, 4500)
    return () => clearInterval(timerRef.current)
  }, [slide])

  // ── Auth ─────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(''); setSuccessMsg('')
    setLoading(true)
    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password })
        if (error) { setErrorMsg(normalizeError(error.message)); return }
        setSuccessMsg('Account created! Check your email to confirm.')
        setAuthMode('signin'); return
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
      if (error) { setErrorMsg(normalizeError(error.message)); return }
      if (!data?.session) { setErrorMsg('No session returned. Try again.'); return }
      sessionStorage.setItem('agromart_user',  JSON.stringify(data.user))
      sessionStorage.setItem('agromart_token', data.session.access_token)
      setSuccessMsg('Login successful! Opening dashboard…')
      setTimeout(() => { if (typeof onSuccess === 'function') onSuccess(); else window.location.href = '/' }, 600)
    } catch (err) {
      setErrorMsg(normalizeError(err?.message))
    } finally { setLoading(false) }
  }

  const handleForgot = async () => {
    if (!email.trim()) { setErrorMsg('Enter your email first.'); return }
    setLoading(true); setErrorMsg(''); setSuccessMsg('')
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/`
      })
      if (error) { setErrorMsg(normalizeError(error.message)); return }
      setSuccessMsg('Password reset link sent! Check your email.')
    } catch (err) { setErrorMsg(normalizeError(err?.message)) }
    finally { setLoading(false) }
  }

  const cur = SLIDES[slide]

  return (
    <div style={{
      position: 'relative',
      minHeight: '100dvh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, sans-serif',
    }}>

      {/* ── Full-screen background images (crossfade) ── */}
      {SLIDES.map((s, i) => (
        <div key={s.img} style={{
          position: 'absolute', inset: 0,
          opacity: i === slide ? 1 : 0,
          transition: 'opacity 1.2s ease-in-out',
          zIndex: 0,
        }}>
          <img src={s.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', transform:'scale(1.05)' }}/>
        </div>
      ))}

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(110deg, rgba(8,28,16,0.72) 0%, rgba(8,28,16,0.45) 48%, rgba(8,28,16,0.28) 100%)',
      }}/>
      {/* Bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.3) 0%, transparent 70%)',
      }}/>

      {/* ── 2-Column Layout ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        minHeight: '100dvh',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) min(480px, 94vw)',
        alignItems: 'center',
        gap: '32px',
        padding: 'clamp(24px,4vw,56px) clamp(16px,4vw,56px)',
      }}>

        {/* ── LEFT: Cinematic Text ── */}
        <div style={{ color: 'rgba(237,255,245,0.97)', textShadow: '0 8px 24px rgba(6,42,22,0.45)' }}>
          <motion.p
            key={slide + '-kicker'}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            style={{ margin:0, fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(163,230,153,0.9)' }}>
            AgroMart Bangladesh
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={slide + '-h1'}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
              transition={{ duration:0.65, delay:0.1 }}
              style={{ margin:'14px 0 0', fontSize:'clamp(2.1rem,4.2vw,4rem)', lineHeight:1.03, letterSpacing:'-0.03em', fontWeight:800 }}>
              <span style={{ display:'block' }}>Banglar matir golpo,</span>
              <span style={{ display:'block', color:'#a7f3d0' }}>{cur.label}.</span>
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide + '-desc'}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
              transition={{ duration:0.6, delay:0.25 }}
              style={{ margin:'18px 0 0', maxWidth:'560px', color:'rgba(220,255,237,0.88)', fontSize:'clamp(0.95rem,1.1vw,1.08rem)', lineHeight:1.7 }}>
              {cur.desc}
            </motion.p>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginTop:'32px' }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{
                border: 'none', cursor: 'pointer', padding: 0,
                borderRadius: '999px', transition: 'all 0.35s ease',
                width: i === slide ? '28px' : '8px',
                height: '8px',
                background: i === slide ? '#4ade80' : 'rgba(255,255,255,0.38)',
              }}/>
            ))}
            <span style={{ marginLeft:'4px', fontSize:'0.78rem', color:'rgba(200,240,215,0.7)', fontWeight:600 }}>
              {slide + 1} / {SLIDES.length}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Login Card (light bg, DARK text) ── */}
        <motion.div
          initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.15 }}>
          <div style={{
            background: 'rgba(240,255,246,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.72)',
            boxShadow: '0 32px 80px rgba(4,18,10,0.45), 0 2px 0 rgba(255,255,255,0.6) inset',
            padding: '32px 36px 36px',
          }}>

            {/* Card header */}
            <div style={{ textAlign:'center', marginBottom:'24px' }}>
              <div style={{
                width:'72px', height:'72px', borderRadius:'50%',
                overflow:'hidden', margin:'0 auto 14px',
                background:'#efe4c5',
                border:'3px solid rgba(34,197,94,0.3)',
                boxShadow:'0 8px 24px rgba(0,0,0,0.15)',
              }}>
                <img src={logoSrc} alt="AgroMart" onError={() => setLogoSrc('/logo.png')}
                  style={{ width:'100%', height:'100%', objectFit:'cover', transform:'scale(1.4)' }}/>
              </div>
              <p style={{ margin:0, fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'#2a7a4b' }}>
                🌾 AgroMart
              </p>
              <h2 style={{ margin:'8px 0 4px', fontSize:'1.55rem', fontWeight:800, color:'#0f2d1a', letterSpacing:'-0.02em' }}>
                {authMode === 'signup' ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p style={{ margin:0, fontSize:'0.85rem', color:'#4a7a5c' }}>
                {authMode === 'signup' ? 'Join AgroMart to get started' : 'Sign in to continue your workflow'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

              {/* Email field */}
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:700, color:'#1e4d30', marginBottom:'6px' }}>
                  Email
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#4a7a5c', fontSize:'15px' }}>✉</span>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="name@agromart.com" required
                    style={{
                      width:'100%', height:'48px', borderRadius:'12px',
                      border:'1.5px solid rgba(34,197,94,0.3)',
                      background:'rgba(252,255,252,0.92)',
                      color:'#0f2d1a', fontSize:'0.93rem',
                      padding:'0 16px 0 40px', outline:'none',
                      boxSizing:'border-box',
                      transition:'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor='#1e9449'; e.target.style.boxShadow='0 0 0 3px rgba(30,148,73,0.18)' }}
                    onBlur={e => { e.target.style.borderColor='rgba(34,197,94,0.3)'; e.target.style.boxShadow='none' }}
                  />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label style={{ display:'block', fontSize:'0.82rem', fontWeight:700, color:'#1e4d30', marginBottom:'6px' }}>
                  Password
                </label>
                <div style={{ position:'relative' }}>
                  <span style={{ position:'absolute', left:'14px', top:'50%', transform:'translateY(-50%)', color:'#4a7a5c', fontSize:'15px' }}>🔒</span>
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password" required
                    style={{
                      width:'100%', height:'48px', borderRadius:'12px',
                      border:'1.5px solid rgba(34,197,94,0.3)',
                      background:'rgba(252,255,252,0.92)',
                      color:'#0f2d1a', fontSize:'0.93rem',
                      padding:'0 72px 0 40px', outline:'none',
                      boxSizing:'border-box',
                      transition:'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor='#1e9449'; e.target.style.boxShadow='0 0 0 3px rgba(30,148,73,0.18)' }}
                    onBlur={e => { e.target.style.borderColor='rgba(34,197,94,0.3)'; e.target.style.boxShadow='none' }}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} style={{
                    position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)',
                    border:'none', background:'transparent', cursor:'pointer',
                    color:'#1c7b43', fontSize:'0.78rem', fontWeight:700, padding:'4px 6px', borderRadius:'6px',
                  }}>
                    {showPass ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Form meta */}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'-4px' }}>
                <label style={{ display:'flex', alignItems:'center', gap:'7px', cursor:'pointer', fontSize:'0.84rem', color:'#2d5a3d', fontWeight:500 }}>
                  <input type="checkbox" style={{ accentColor:'#1e9449', width:'15px', height:'15px' }}/>
                  Remember Me
                </label>
                <button type="button" onClick={handleForgot}
                  style={{ border:'none', background:'none', cursor:'pointer', fontSize:'0.84rem', fontWeight:700, color:'#1c7b43', padding:0 }}>
                  Forgot Password?
                </button>
              </div>

              {/* Submit button */}
              <button type="submit" disabled={loading} style={{
                width:'100%', height:'50px', borderRadius:'12px', border:'none',
                background: loading ? '#6db88a' : 'linear-gradient(120deg,#146d36,#1e9449 56%,#27a051)',
                color:'#fff', fontSize:'0.95rem', fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                boxShadow: '0 10px 24px rgba(18,94,50,0.3)',
                transition:'transform 0.15s, box-shadow 0.15s',
                marginTop:'4px',
              }}
                onMouseEnter={e => { if(!loading){ e.target.style.transform='scale(1.015)'; e.target.style.boxShadow='0 16px 32px rgba(18,94,50,0.38)' }}}
                onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.boxShadow='0 10px 24px rgba(18,94,50,0.3)' }}
              >
                {loading
                  ? <><span style={{ width:'16px',height:'16px',borderRadius:'50%',border:'2px solid rgba(255,255,255,0.4)',borderTopColor:'#fff',display:'inline-block',animation:'spin 0.7s linear infinite' }}/> {authMode==='signup'?'Creating…':'Signing in…'}</>
                  : authMode==='signup' ? 'Create Account' : 'Login to Dashboard'
                }
              </button>
            </form>

            {/* Error / Success messages */}
            {errorMsg && (
              <div style={{ marginTop:'14px', padding:'10px 14px', borderRadius:'10px', background:'rgba(201,58,58,0.1)', border:'1px solid rgba(201,58,58,0.25)', color:'#8b1a1a', fontSize:'0.85rem', fontWeight:500 }}>
                ⚠ {errorMsg}
              </div>
            )}
            {successMsg && (
              <div style={{ marginTop:'14px', padding:'10px 14px', borderRadius:'10px', background:'rgba(30,148,73,0.1)', border:'1px solid rgba(30,148,73,0.25)', color:'#0f4d22', fontSize:'0.85rem', fontWeight:500 }}>
                ✓ {successMsg}
              </div>
            )}

            {/* Toggle auth mode */}
            <p style={{ margin:'18px 0 0', textAlign:'center', color:'#567562', fontSize:'0.87rem' }}>
              {authMode === 'signup' ? 'Already have an account? ' : 'New to AgroMart? '}
              <button type="button" onClick={() => { setAuthMode(m => m==='signin'?'signup':'signin'); setErrorMsg(''); setSuccessMsg('') }}
                style={{ border:'none', background:'none', cursor:'pointer', color:'#156e3a', fontWeight:800, fontSize:'0.87rem', padding:0 }}>
                {authMode === 'signup' ? 'Back to Login' : 'Create Account'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Spin keyframe ── */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 860px) {
          .login-grid { grid-template-columns: 1fr !important; }
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  )
}
