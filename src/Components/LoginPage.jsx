import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Role configuration
   NOTE: both 'employee' and 'student' are
   handled so either id in the URL works.
───────────────────────────────────────────── */
const roleConfig = {
  management: {
    label: 'Management',
    title: 'Welcome, Management 👋',
    subtitle: 'Sign in to oversee your institute operations, analytics, and staff infrastructure.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Operations Dashboard',
    accent: '#321c6b',
    accentHover: '#251455',
    accentLight: '#ede9ff',
    gradient: 'linear-gradient(135deg, #321c6b 0%, #5c3bce 100%)',
    overlayGradient: 'linear-gradient(to top, rgba(50,28,107,0.72) 0%, transparent 60%)',
    font: "'Georgia', 'Times New Roman', serif",
  },
  teacher: {
    label: 'Teacher',
    title: 'Welcome Back, Educator 👋',
    subtitle: 'Sign in to manage your classes, share resources, and track student progress.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Classroom Hub',
    accent: '#2a8c75',
    accentHover: '#1f6e5b',
    accentLight: '#e6f7f3',
    gradient: 'linear-gradient(135deg, #1a5c4e 0%, #2a8c75 100%)',
    overlayGradient: 'linear-gradient(to top, rgba(26,92,78,0.72) 0%, transparent 60%)',
    font: "'Trebuchet MS', 'Gill Sans', sans-serif",
  },
  // 'student' and 'employee' both resolve to the same config
  student: {
    label: 'Student',
    title: 'Welcome, Student 👋',
    subtitle: 'Sign in to access your courses, assignments, notes and AI study assistant.',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Student Learning Hub',
    accent: '#1a6e2e',
    accentHover: '#145523',
    accentLight: '#e6f5ea',
    gradient: 'linear-gradient(135deg, #1a6e2e 0%, #3aad55 100%)',
    overlayGradient: 'linear-gradient(to top, rgba(26,110,46,0.72) 0%, transparent 60%)',
    font: "'Trebuchet MS', sans-serif",
  },
  employee: {
    label: 'Employee',
    title: 'Good to See You 👋',
    subtitle: 'Sign in to view your schedule, payroll, attendance records and team updates.',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Employee Portal',
    accent: '#1a4a6e',
    accentHover: '#123552',
    accentLight: '#e6eef7',
    gradient: 'linear-gradient(135deg, #1a4a6e 0%, #2e6fa3 100%)',
    overlayGradient: 'linear-gradient(to top, rgba(26,74,110,0.72) 0%, transparent 60%)',
    font: "'Verdana', 'Geneva', sans-serif",
  },
  parents: {
    label: 'Parents',
    title: 'Welcome, Parents 👋',
    subtitle: "Sign in to securely view your child's academic progress, grades and attendance.",
    image: 'https://images.unsplash.com/photo-1484665754804-74b091211472?auto=format&fit=crop&q=80&w=1200',
    imageCaption: 'Family Dashboard',
    accent: '#b5305e',
    accentHover: '#8f2249',
    accentLight: '#fdeef4',
    gradient: 'linear-gradient(135deg, #8f2249 0%, #c44b7d 100%)',
    overlayGradient: 'linear-gradient(to top, rgba(143,34,73,0.72) 0%, transparent 60%)',
    font: "'Palatino Linotype', 'Palatino', serif",
  },
};

/* ── Compact input ── */
function FormInput({ label, type = 'text', placeholder, accent, accentLight }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', textAlign: 'left' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 10,
          border: focused ? `2px solid ${accent}` : '1.5px solid #e5e7eb',
          backgroundColor: focused ? '#fff' : 'rgba(249,250,251,0.8)',
          fontSize: 13,
          color: '#111827',
          outline: 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box',
          boxShadow: focused ? `0 0 0 3px ${accentLight}` : 'none',
        }}
      />
    </div>
  );
}

/* ── Social button ── */
function SocialBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        padding: '9px 0',
        borderRadius: 10,
        border: '1.5px solid rgba(229,231,235,0.8)',
        backgroundColor: hov ? 'rgba(243,244,246,0.9)' : 'rgba(255,255,255,0.7)',
        cursor: 'pointer',
        transition: 'background 0.2s',
        backdropFilter: 'blur(4px)',
      }}
    >
      <img src={icon} alt={label} style={{ width: 17, height: 17 }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{label}</span>
    </button>
  );
}

/* ── Main component ── */
const LoginPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const currentRole = roleConfig[role] || roleConfig.student;

  // Handles 'student', 'employee', 'management', 'teacher', 'parents'
  const cfg = roleConfig[role] || roleConfig.management;

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 1024);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const [btnHov, setBtnHov] = useState(false);

  return (
    /* Light background — same feel as RoleSelection */
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f0f0f6',
        backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(92,59,206,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(92,59,206,0.05) 0%, transparent 55%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px 18px' : '28px 20px',
        /* on mobile allow card to scroll naturally instead of forcing it into viewport */
        alignItems: isMobile ? 'flex-start' : 'center',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      }}
    >
      <motion.div
        key={role}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          /* Glassmorphic Apple-style card */
          background: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.55)',
          boxShadow: '0 8px 32px rgba(92,59,206,0.10), 0 2px 8px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.8)',
          width: '100%',
          maxWidth: isMobile ? 480 : 1080,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          overflow: 'hidden',
        }}
      >

        {/* ── LEFT: Compact form ── */}
        <div
          style={{
            width: isMobile ? '100%' : '46%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isMobile ? '20px 20px 18px' : '36px 40px',
            boxSizing: 'border-box',
            order: isMobile ? 2 : 1,
          }}
        >
          {/* Top row: Back + Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 14 : 20 }}>
            <button
              onClick={() => navigate('/roles')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 600, color: '#6b7280', padding: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <span
              style={{
                background: cfg.gradient, color: '#fff',
                fontSize: 10, fontWeight: 700,
                padding: '4px 11px', borderRadius: 999,
                letterSpacing: '0.6px', textTransform: 'uppercase',
              }}
            >
              {cfg.label} Portal
            </span>
          </div>

          {/* Title */}
          <div style={{ marginBottom: isMobile ? 12 : 18, textAlign: 'left' }}>
            <h1
              style={{
                fontSize: isMobile ? 'clamp(20px, 5.5vw, 26px)' : 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 800, color: '#111827',
                margin: '0 0 7px', lineHeight: 1.2,
                letterSpacing: '-0.4px', fontFamily: cfg.font,
                textAlign: 'left',
              }}
            >
              {cfg.title}
            </h1>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6, maxWidth: 340, textAlign: 'left' }}>
              {cfg.subtitle}
            </p>
          </div>

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 11 }}>
            <FormInput label="College Code" placeholder="e.g. KRUP-104" accent={cfg.accent} accentLight={cfg.accentLight} />
            <FormInput label="Email" type="email" placeholder="example@email.com" accent={cfg.accent} accentLight={cfg.accentLight} />
            <FormInput label="Password" type="password" placeholder="At least 8 characters" accent={cfg.accent} accentLight={cfg.accentLight} />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: 12, fontWeight: 600, color: cfg.accent, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}>
                Forgot Password?
              </a>
            </div>

            <button
              onClick={() => navigate(`/dashboard/${role}`)} // <--- ADD THIS EXACT LINE HERE
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 12, border: 'none',
                background: btnHov ? cfg.accentHover : cfg.accent,
                color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                letterSpacing: '0.3px',
                boxShadow: `0 4px 18px ${cfg.accent}44`,
                transform: btnHov ? 'translateY(-1px)' : 'translateY(0)',
                transition: 'all 0.2s ease',
              }}
            >
              Sign In
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: isMobile ? '12px 0' : '16px 0' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(229,231,235,0.8)' }} />
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>Or sign in with</span>
            <div style={{ flex: 1, height: 1, backgroundColor: 'rgba(229,231,235,0.8)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn icon="https://www.svgrepo.com/show/475656/google-color.svg" label="Google" />
            <SocialBtn icon="https://www.svgrepo.com/show/475647/facebook-color.svg" label="Facebook" />
          </div>

          {/* Footer */}
          <div style={{ marginTop: isMobile ? 12 : 16, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px' }}>
              Don't have an account?{' '}
              <a href="#" style={{ color: cfg.accent, fontWeight: 700, textDecoration: 'none' }}>Sign up</a>
            </p>
            <p style={{ fontSize: 10, color: '#d1d5db', margin: 0 }}>© 2026 PlanetX. All rights reserved.</p>
          </div>
        </div>

        {/* ── RIGHT: Image panel ── */}
        <div
          style={{
            width: isMobile ? '100%' : '54%',
            height: isMobile ? 160 : 'auto',
            position: 'relative',
            order: isMobile ? 1 : 2,
            flexShrink: 0,
            minHeight: isMobile ? 160 : 540,
          }}
        >
          <img
            src={cfg.image}
            alt={cfg.label}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: cfg.overlayGradient }} />

          {/* Caption */}
          <div
            style={{
              position: 'absolute', bottom: 20, left: 20,
              background: 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(12px)',
              borderRadius: 10, padding: '8px 14px',
              border: '1px solid rgba(255,255,255,0.22)',
            }}
          >
            <p style={{ color: '#fff', fontSize: 12, fontWeight: 600, margin: 0 }}>{cfg.imageCaption}</p>
          </div>

          {/* PlanetX watermark */}
          <div style={{ position: 'absolute', top: 20, right: 20 }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 800, letterSpacing: '-0.3px', textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
              Planet<span style={{ opacity: 0.7 }}>X</span>
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;