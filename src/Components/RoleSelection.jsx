import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LOGO_PATH = "/Logo.png";

const roles = [
  {
    id: 'management',
    title: 'Management',
    features: 'Features: attendance, school management, etc.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500&h=700',
    color: '#5c3bce',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    features: 'Features: attendance, class management, etc.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=500&h=700',
    color: '#2a8c75',
  },
  {
    id: 'student',
    title: 'Student',
    features: 'Features: attendance, class management, etc.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500&h=700',
    color: '#1a5c4e',
  },
  {
    id: 'parents',
    title: 'Parents',
    features: 'Features: progress report, academic grades, attendance, etc.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500&h=700',
    color: '#c44b7d',
  },
];

const leftCards  = roles.filter((_, i) => i % 2 === 0);
const rightCards = roles.filter((_, i) => i % 2 === 1);

/* ── Responsive hook ── */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 1024);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isDesktop;
}

/* ── Single card ── */
function RoleCard({ role, delay, aspectRatio = '3 / 4' }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      whileHover={{ y: -8, scale: 1.025 }}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        borderRadius: 22,
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: '#111',
        boxShadow: hovered
          ? '0 18px 44px rgba(0,0,0,0.28)'
          : '0 6px 22px rgba(0,0,0,0.15)',
        transition: 'box-shadow 0.3s ease',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Photo */}
      <img
        src={role.imageUrl}
        alt={role.title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(15%)',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.65s ease',
        }}
      />

      {/* Colour wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: role.color,
          mixBlendMode: 'multiply',
          opacity: 0.85,
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 52%)',
        }}
      />

      {/* Text + button */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '0 12px 18px',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontSize: 'clamp(14px, 2.2vw, 20px)',
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 5px',
            textShadow: '0 1px 5px rgba(0,0,0,0.4)',
          }}
        >
          {role.title}
        </h3>

        <p
          style={{
            fontSize: 'clamp(9px, 1.1vw, 12px)',
            color: 'rgba(255,255,255,0.82)',
            margin: '0 0 13px',
            lineHeight: 1.45,
          }}
        >
          {role.features}
        </p>

        <button
          onClick={() => navigate(`/login/${role.id}`)}
          style={{
            background: hovered ? '#4dab3e' : '#5abf4a',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '9px 0',
            width: '84%',
            maxWidth: 180,
            fontSize: 'clamp(10px, 1.1vw, 13px)',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.22)',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.2s, background 0.2s',
          }}
        >
          Select Role
        </button>
      </div>
    </motion.div>
  );
}

/* ── PlanetX logo (top-left) ── */
function PlanetXLogo() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {!imgFailed && (
        <img
          src={LOGO_PATH}
          alt="PlanetX"
          onError={() => setImgFailed(true)}
          style={{ height: 32, width: 'auto', objectFit: 'contain' }}
        />
      )}
      {imgFailed && (
        /* Fallback: orbit icon + wordmark */
        <>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#5c3bce',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="white" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="white" strokeWidth="1.5" fill="none" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" stroke="white" strokeWidth="1.5" fill="none"
                transform="rotate(60 12 12)" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#1e1248',
              letterSpacing: '-0.4px',
            }}
          >
            Planet<span style={{ color: '#5c3bce' }}>X</span>
          </span>
        </>
      )}
    </div>
  );
}

/* ── Root component ── */
const RoleSelection = () => {
  const isDesktop = useIsDesktop();

  /* ── Desktop: 4-column masonry ── */
  const DesktopGrid = () => (
    <div
      style={{
        display: 'flex',
        gap: 'clamp(12px, 1.8vw, 22px)',
        alignItems: 'flex-start',
        width: '100%',
        overflow: 'visible',
        paddingBottom: 40,
        paddingTop: 8,
      }}
    >
      {roles.map((role, i) => {
        /* Odd columns (Teacher=1, Parents=3) are offset downward */
        const isOffset = i % 2 === 1;
        return (
          <div
            key={role.id}
            style={{
              flex: 1,
              marginTop: isOffset ? 'clamp(40px, 5vw, 64px)' : 0,
            }}
          >
            <RoleCard role={role} delay={i * 0.1} aspectRatio="3 / 4.2" />
          </div>
        );
      })}
    </div>
  );

  /* ── Mobile / tablet: 2-column masonry ── */
  const MobileGrid = () => {
    const leftCards  = roles.filter((_, i) => i % 2 === 0);
    const rightCards = roles.filter((_, i) => i % 2 === 1);

    return (
      <div
        style={{
          display: 'flex',
          gap: 'clamp(10px, 3vw, 14px)',
          alignItems: 'flex-start',
          overflow: 'visible',
          paddingBottom: 32,
          paddingTop: 8,
        }}
      >
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 3vw, 14px)' }}>
          {leftCards.map((role, i) => (
            <RoleCard key={role.id} role={role} delay={i * 0.13} />
          ))}
        </div>

        {/* Right column — offset for stagger */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(10px, 3vw, 14px)',
            marginTop: 'clamp(44px, 11vw, 68px)',
          }}
        >
          {rightCards.map((role, i) => (
            <RoleCard key={role.id} role={role} delay={0.1 + i * 0.13} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f3f3f8',
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: isDesktop ? 1280 : 500,
          margin: '0 auto',
          padding: isDesktop
            ? 'clamp(20px, 3vw, 36px) clamp(32px, 5vw, 64px)'
            : 'clamp(16px, 5vw, 32px) clamp(16px, 5vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          boxSizing: 'border-box',
          transition: 'max-width 0.3s ease, padding 0.3s ease',
        }}
      >

        {/* ── Header ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isDesktop
              ? 'clamp(28px, 4vw, 52px)'
              : 'clamp(22px, 6vw, 40px)',
          }}
        >
          {/* Top-left: PlanetX logo */}
          <PlanetXLogo />

          {/* Top-right: PlanetX text */}
          <span
            style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: 800,
              color: '#1e1248',
              letterSpacing: '-0.4px',
              flexShrink: 0,
            }}
          >
            Planet<span style={{ color: '#5c3bce' }}>X</span>
          </span>
        </div>

        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: isDesktop
              ? 'clamp(16px, 3vw, 32px)'
              : 'clamp(18px, 5vw, 32px)',
          }}
        >
          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(28px, 3.5vw, 48px)'
                : 'clamp(24px, 7.5vw, 36px)',
              fontWeight: 800,
              color: '#1e1248',
              margin: '0 0 10px',
              lineHeight: 1.12,
              letterSpacing: '-0.5px',
            }}
          >
            Choose your role
          </h1>
          <p
            style={{
              fontSize: isDesktop
                ? 'clamp(14px, 1.2vw, 18px)'
                : 'clamp(13px, 3.5vw, 15px)',
              color: '#64748b',
              margin: 0,
              lineHeight: 1.55,
            }}
          >
            Each role has its own supporting features.
          </p>
        </motion.div>

        {/* ── Masonry grid (responsive) ── */}
        {isDesktop ? <DesktopGrid /> : <MobileGrid />}

      </div>
    </div>
  );
};

export default RoleSelection;