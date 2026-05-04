import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

/* ── Design tokens — Student green theme ── */
const C = {
  accent: '#1a6e2e',
  accentMid: '#3aad55',
  accentLight: '#e6f5ea',
  purple: '#5c3bce',
  purpleLight: '#ede9ff',
  teal: '#2a8c75',
  tealLight: '#e6f7f3',
  pink: '#c44b7d',
  pinkLight: '#fdeef4',
  amber: '#e07b24',
  amberLight: '#fff3e6',
  bg: '#f4f3fb',
  card: 'rgba(255,255,255,0.90)',
  text: '#1a1040',
  textSub: '#64748b',
  border: 'rgba(26,110,46,0.10)',
};

/* ── Sample data ── */
const STUDENT = {
  name: 'Alex Johnson',
  year: '2nd Year',
  avatar: 'https://i.pravatar.cc/150?img=11',
  course: 'Computer Science',
};

const TODAY_CLASS = {
  subject: 'Data Structures',
  status: 'Live in 45 min',
  live: true,
  batch: 'CS-B (3/4)',
  step: '04/12',
  progress: 0.35,
};

const COURSES = [
  { id: 1, name: 'Data Structures',   code: 'CS201', instructor: 'Dr. Meera',  progress: 65, color: C.purple, icon: '🧮' },
  { id: 2, name: 'Operating Systems', code: 'CS301', instructor: 'Prof. Rajan', progress: 42, color: C.teal,   icon: '💻' },
  { id: 3, name: 'Database Systems',  code: 'CS302', instructor: 'Dr. Anita',  progress: 80, color: C.pink,   icon: '🗄️' },
  { id: 4, name: 'Computer Networks', code: 'CS401', instructor: 'Prof. Kumar', progress: 28, color: C.amber,  icon: '🌐' },
];

const INSTRUCTORS = [
  { name: 'Dr. Meera',  subject: 'Data Structures', avatar: 'https://i.pravatar.cc/80?img=47' },
  { name: 'Prof. Rajan',subject: 'OS',              avatar: 'https://i.pravatar.cc/80?img=52' },
  { name: 'Dr. Anita',  subject: 'DBMS',            avatar: 'https://i.pravatar.cc/80?img=32' },
  { name: 'Prof. Kumar',subject: 'Networks',        avatar: 'https://i.pravatar.cc/80?img=60' },
];

const NOTICES = [
  { id: 1, title: 'Mid-semester Exam Schedule',    date: 'May 5, 2026',  tag: 'Exam',       tagColor: C.pink,   body: 'Mid-semester exams will be held from May 12–18. Check your timetable on the portal.' },
  { id: 2, title: 'Assignment Submission Deadline',date: 'May 4, 2026',  tag: 'Assignment', tagColor: C.amber,  body: 'CS201 assignment 3 is due by May 7, 11:59 PM. Late submissions will not be accepted.' },
  { id: 3, title: 'Campus Holiday – May 10',       date: 'May 3, 2026',  tag: 'Holiday',    tagColor: C.teal,   body: 'The campus will remain closed on May 10 for the state foundation day.' },
  { id: 4, title: 'Library Timings Extended',      date: 'May 2, 2026',  tag: 'General',    tagColor: C.accent, body: 'Library will now be open till 9 PM on weekdays during exam season.' },
];

const SCHEDULE = [
  { time: '08:00', subject: 'Data Structures',  room: 'A-101', duration: 60,  color: C.purple },
  { time: '10:00', subject: 'Operating Systems',room: 'B-202', duration: 60,  color: C.teal },
  { time: '12:00', subject: 'DBMS Lab',         room: 'Lab-3', duration: 120, color: C.pink },
  { time: '14:00', subject: 'Comp. Networks',   room: 'A-203', duration: 60,  color: C.amber },
];

/* ── Responsive hook ── */
function useIsDesktop() {
  const [d, setD] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : false);
  useEffect(() => {
    const fn = () => setD(window.innerWidth >= 1024);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return d;
}

/* ─────────────────────────────────────────
   NAV ICONS
───────────────────────────────────────── */
const NavIcons = {
  home: (filled) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    </svg>
  ),
  courses: (filled) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  ),
  notice: (filled) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  profile: (filled) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
};

const NAV_ITEMS = [
  { id: 'home',    label: 'Home',    icon: NavIcons.home },
  { id: 'courses', label: 'Courses', icon: NavIcons.courses },
  { id: 'notice',  label: 'Notice',  icon: NavIcons.notice },
  { id: 'profile', label: 'Profile', icon: NavIcons.profile },
];

/* ─────────────────────────────────────────
   TOP HEADER — visible on ALL screen sizes
───────────────────────────────────────── */
function TopHeader({ isDesktop }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(244,243,251,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
      padding: isDesktop ? '12px 48px' : '10px 18px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxSizing: 'border-box',
    }}>
      {/* Logo */}
      <span style={{ fontSize: isDesktop ? 20 : 17, fontWeight: 800, color: C.text, letterSpacing: '-0.3px', flexShrink: 0 }}>
        Planet<span style={{ color: C.accent }}>X</span>
      </span>

      {/* Student info — always visible */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: isDesktop ? 13 : 12, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.3 }}>{STUDENT.name}</p>
          <p style={{ fontSize: isDesktop ? 11 : 10, color: C.textSub, margin: 0 }}>{STUDENT.year}</p>
        </div>
        <img
          src={STUDENT.avatar}
          alt="Avatar"
          style={{
            width: isDesktop ? 38 : 34,
            height: isDesktop ? 38 : 34,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${C.accent}`,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   BOTTOM NAV — only nav, no top duplicate
───────────────────────────────────────── */
function BottomNav({ active, onNavigate }) {
  return (
    <div style={{
      position: 'fixed', bottom: 16, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex', alignItems: 'center',
      background: 'rgba(26,16,64,0.93)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 999,
      padding: '7px 8px',
      gap: 4,
      boxShadow: '0 8px 32px rgba(26,110,46,0.20), 0 2px 8px rgba(0,0,0,0.20)',
      border: '1px solid rgba(255,255,255,0.08)',
      whiteSpace: 'nowrap',
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            whileTap={{ scale: 0.91 }}
            style={{
              display: 'flex', alignItems: 'center',
              gap: isActive ? 7 : 0,
              padding: isActive ? '9px 18px' : '9px 14px',
              borderRadius: 999, border: 'none', cursor: 'pointer',
              background: isActive ? C.accent : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.48)',
              fontSize: 13, fontWeight: 700,
              transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
              overflow: 'hidden',
            }}
          >
            {item.icon(isActive)}
            <motion.span
              initial={false}
              animate={{ width: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ overflow: 'hidden', display: 'block' }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────── */
function SectionHeader({ title, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, margin: 0 }}>{title}</h3>
      {action && (
        <button style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: C.accent, cursor: 'pointer', padding: 0 }}>
          {action}
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
function HomePage({ isDesktop }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        style={{
          borderRadius: 20,
          padding: isDesktop ? '28px 32px' : '22px 20px',
          background: 'linear-gradient(135deg, #1a6e2e 0%, #3aad55 60%, #5dd879 100%)',
          position: 'relative', overflow: 'hidden',
          boxShadow: `0 8px 28px ${C.accent}44`,
        }}
      >
        <div style={{ position: 'absolute', top: -30, right: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -40, right: 60, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, margin: '0 0 4px', fontWeight: 500 }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h2 style={{ color: '#fff', fontSize: isDesktop ? 26 : 20, fontWeight: 800, margin: '0 0 5px', letterSpacing: '-0.4px' }}>
              Welcome back, {STUDENT.name.split(' ')[0]}! 👋
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13, margin: '0 0 14px' }}>
              {STUDENT.course} · {STUDENT.year}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[{ label: '4 Courses', icon: '📚' }, { label: '2 Pending', icon: '⏳' }].map(tag => (
                <span key={tag.label} style={{
                  background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: 12, fontWeight: 600,
                  padding: '5px 12px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.22)',
                }}>
                  {tag.icon} {tag.label}
                </span>
              ))}
            </div>
          </div>
          <img src={STUDENT.avatar} alt="Avatar" style={{
            width: isDesktop ? 68 : 56, height: isDesktop ? 68 : 56,
            borderRadius: '50%', border: '3px solid rgba(255,255,255,0.4)',
            objectFit: 'cover', flexShrink: 0,
          }} />
        </div>
      </motion.div>

      {/* Today's Class */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.07 }}>
        <SectionHeader title="Today's Class" />
        <div style={{
          borderRadius: 20, padding: '20px 22px',
          background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
          border: '1px solid rgba(42,140,117,0.18)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -16, right: -8, fontSize: 72, opacity: 0.10 }}>🧮</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>{TODAY_CLASS.status}</span>
          </div>
          <h3 style={{ fontSize: isDesktop ? 20 : 17, fontWeight: 800, color: C.text, margin: '0 0 4px', textAlign: 'center' }}>{TODAY_CLASS.subject}</h3>
          <p style={{ fontSize: 13, color: C.textSub, margin: '0 0 4px', textAlign: 'center' }}>{TODAY_CLASS.batch}</p>
          <p style={{ fontSize: 12, color: C.textSub, margin: '0 0 8px', textAlign: 'center' }}>Step {TODAY_CLASS.step}</p>
          <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 999, marginBottom: 14 }}>
            <div style={{ width: `${TODAY_CLASS.progress * 100}%`, height: '100%', background: C.accent, borderRadius: 999 }} />
          </div>
          <button style={{
            background: C.text, color: '#fff', border: 'none',
            borderRadius: '50%', width: 42, height: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', fontSize: 16,
          }}>▶</button>
        </div>
      </motion.div>

      {/* Enrolled Courses */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.13 }}>
        <SectionHeader title="Enrolled Courses" action="See all" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: isDesktop ? 'repeat(4,1fr)' : 'repeat(2,1fr)',
          gap: 12,
        }}>
          {COURSES.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}
              whileHover={{ y: -4, boxShadow: `0 8px 20px ${c.color}28` }}
              style={{
                borderRadius: 16, padding: '16px 14px',
                background: C.card, border: `1px solid ${C.border}`,
                cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
              <p style={{ fontSize: 11, fontWeight: 700, color: c.color, margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.code}</p>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 4px', lineHeight: 1.3 }}>{c.name}</h4>
              <p style={{ fontSize: 11, color: C.textSub, margin: '0 0 10px' }}>{c.instructor}</p>
              <div style={{ height: 4, background: '#f1f5f9', borderRadius: 999 }}>
                <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: 999 }} />
              </div>
              <p style={{ fontSize: 10, color: C.textSub, margin: '4px 0 0', textAlign: 'right' }}>{c.progress}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Course Instructors */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.18 }}>
        <SectionHeader title="Course Instructors" />
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {INSTRUCTORS.map((ins, i) => (
            <motion.div
              key={ins.name}
              initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.20 + i * 0.06 }}
              style={{
                flexShrink: 0, width: isDesktop ? 130 : 108,
                borderRadius: 16, padding: '16px 12px',
                background: C.card, border: `1px solid ${C.border}`,
                textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <img src={ins.avatar} alt={ins.name} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, border: `2px solid ${C.accentLight}` }} />
              <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{ins.name}</p>
              <p style={{ fontSize: 11, color: C.textSub, margin: 0 }}>{ins.subject}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}

/* ─────────────────────────────────────────
   COURSES PAGE
───────────────────────────────────────── */
function CoursesPage({ isDesktop }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: isDesktop ? 24 : 20, fontWeight: 800, color: C.text, margin: 0 }}>
        My Courses
      </motion.h2>

      {COURSES.map((c, i) => (
        <motion.div key={c.id}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          style={{
            borderRadius: 18, padding: '18px 18px',
            background: C.card, border: `1px solid ${C.border}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              {c.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{c.code}</span>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: '2px 0 2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</h3>
                  <p style={{ fontSize: 12, color: C.textSub, margin: 0 }}>{c.instructor}</p>
                </div>
                <span style={{ background: `${c.color}18`, color: c.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, flexShrink: 0 }}>
                  {c.progress}%
                </span>
              </div>
              <div style={{ marginTop: 10, height: 5, background: '#f1f5f9', borderRadius: 999 }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  style={{ height: '100%', background: c.color, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <SectionHeader title="Today's Schedule" />
        {SCHEDULE.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.textSub, fontWeight: 600, width: 42, flexShrink: 0 }}>{s.time}</span>
            <div style={{
              flex: 1, borderRadius: 12, padding: '11px 14px',
              background: `${s.color}12`, border: `1px solid ${s.color}28`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 2px' }}>{s.subject}</p>
                <p style={{ fontSize: 11, color: C.textSub, margin: 0 }}>{s.room} · {s.duration} min</p>
              </div>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   NOTICE PAGE
───────────────────────────────────────── */
function NoticePage({ isDesktop }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: isDesktop ? 24 : 20, fontWeight: 800, color: C.text, margin: 0 }}>
        Notices & Alerts
      </motion.h2>
      {NOTICES.map((n, i) => (
        <motion.div key={n.id}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
          style={{
            borderRadius: 18, padding: '16px 18px',
            background: C.card, border: `1px solid ${C.border}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            borderLeft: `4px solid ${n.tagColor}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 10 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0, flex: 1 }}>{n.title}</h3>
            <span style={{ background: `${n.tagColor}18`, color: n.tagColor, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
              {n.tag}
            </span>
          </div>
          <p style={{ fontSize: 13, color: C.textSub, margin: '0 0 8px', lineHeight: 1.55 }}>{n.body}</p>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{n.date}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   PROFILE PAGE
───────────────────────────────────────── */
function ProfilePage({ isDesktop, onLogout }) {
  const stats = [
    { label: 'Courses',   value: '4', color: C.accent },
    { label: 'Completed', value: '1', color: C.teal },
    { label: 'Pending',   value: '2', color: C.amber },
    { label: 'Notices',   value: '4', color: C.pink },
  ];
  const menuItems = [
    { icon: '📋', label: 'Academic Records' },
    { icon: '📅', label: 'Attendance' },
    { icon: '💳', label: 'Fee Status' },
    { icon: '🔔', label: 'Notification Settings' },
    { icon: '🔒', label: 'Change Password' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        style={{
          borderRadius: 20, padding: '26px 22px', textAlign: 'center',
          background: 'linear-gradient(135deg, #1a6e2e 0%, #3aad55 100%)',
          boxShadow: `0 8px 24px ${C.accent}44`,
        }}
      >
        <img src={STUDENT.avatar} alt="Student" style={{ width: 76, height: 76, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.4)', objectFit: 'cover', marginBottom: 12 }} />
        <h2 style={{ color: '#fff', fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>{STUDENT.name}</h2>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13, margin: '0 0 2px' }}>{STUDENT.course}</p>
        <p style={{ color: 'rgba(255,255,255,0.60)', fontSize: 12, margin: 0 }}>{STUDENT.year} · College Code: KRUP-104</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}
            style={{ borderRadius: 14, padding: '14px 8px', background: C.card, border: `1px solid ${C.border}`, textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: '0 0 2px' }}>{s.value}</p>
            <p style={{ fontSize: 11, color: C.textSub, margin: 0 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {menuItems.map((item, i) => (
          <motion.button key={item.label} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              background: C.card, border: `1px solid ${C.border}`,
              cursor: 'pointer', width: '100%', textAlign: 'left',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.text }}>{item.label}</span>
            <span style={{ color: '#cbd5e1', fontSize: 16 }}>›</span>
          </motion.button>
        ))}
      </div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        onClick={onLogout}
        style={{
          padding: '13px', borderRadius: 14, border: '1.5px solid #fca5a5',
          background: '#fff5f5', color: '#ef4444', fontSize: 14, fontWeight: 700,
          cursor: 'pointer', width: '100%',
        }}
      >
        🚪 Log Out
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────
   ROOT — navigation history stack
───────────────────────────────────────── */
const StudentDashboard = () => {
  /* 
    navStack stores page history.
    Current page = navStack[navStack.length - 1]
    Back = pop the stack
    Navigate = push to stack (unless same page)
  */
  const [navStack, setNavStack] = useState(['home']);
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const activePage = navStack[navStack.length - 1];
  const canGoBack = navStack.length > 1;

  /* Push to stack when user taps a nav item */
  const handleNavigation = (pageId) => {
    if (pageId === activePage) return; // already here
    setNavStack(prev => [...prev, pageId]);
  };

  /* Pop from stack — never leaves the dashboard */
  const handleBack = () => {
    if (canGoBack) {
      setNavStack(prev => prev.slice(0, -1));
    }
  };

  /* Browser back button also pops the stack */
  useEffect(() => {
    const onPopState = (e) => {
      e.preventDefault();
      if (canGoBack) {
        setNavStack(prev => prev.slice(0, -1));
        // Push a dummy state so we stay in control
        window.history.pushState(null, '', window.location.href);
      }
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [canGoBack]);

  const pages = {
    home:    (props) => <HomePage    {...props} />,
    courses: (props) => <CoursesPage {...props} />,
    notice:  (props) => <NoticePage  {...props} />,
    profile: (props) => <ProfilePage {...props} onLogout={() => navigate('/')} />,
  };

  const ActivePage = pages[activePage];

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      backgroundColor: C.bg,
      backgroundImage: 'radial-gradient(ellipse at 20% 10%, rgba(26,110,46,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(26,110,46,0.05) 0%, transparent 50%)',
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      boxSizing: 'border-box',
    }}>

      {/* Top header — always visible on ALL screen sizes */}
      <TopHeader isDesktop={isDesktop} />

      {/* Page content */}
      <div style={{
        maxWidth: isDesktop ? 1100 : '100%',
        margin: '0 auto',
        padding: isDesktop
          ? '80px 48px 60px'
          : '70px 16px 100px',
        boxSizing: 'border-box',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ActivePage isDesktop={isDesktop} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Single bottom nav — no top nav duplicate */}
      <BottomNav active={activePage} onNavigate={handleNavigation} />
    </div>
  );
};

export default StudentDashboard;