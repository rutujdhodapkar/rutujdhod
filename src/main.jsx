import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ExternalLink, ChevronRight } from 'lucide-react';
import './styles.css';
import CursorGrid from './CursorGrid';

const profile = {
  name: 'Rutuj Dhodapkar',
  label: 'AI / ML · Builder · CS Student',
  intro: 'Building AI to help humanity — and not just to hype.',
  about: [
    'I’m a student deeply focused on Artificial Intelligence, Machine Learning, and Deep Learning — with a commitment to contributing to the theoretical and algorithmic foundations of intelligent systems.',
    'I see AI as one of the most important scientific frontiers of our time. I’m driven by a desire to ask foundational questions, build rigorous solutions, and contribute to research that shapes the future of intelligence itself.'
  ],
  socials: {
    github: 'https://github.com/rutujdhodapkar',
    linkedin: 'https://linkedin.com/in/rutujdhodapkar/',
    x: 'https://x.com/rutujdhodapkar/',
    email: 'mailto:rutuj@fennark.xyz',
    gmail: 'mailto:rutujdhodapkar@gmail.com',
    resume: 'mailto:resume@fennark.xyz'
  }
};

const projects = [
  { no: '01', title: 'Emotion Detection Using AI', type: 'Deep Learning', year: '2024', desc: 'A deep learning system that detects emotions from input text with a high-parameter ANN model.', tags: ['Python', 'ANN', 'NLP'], link: 'https://rutujproject1-czzltsg8apdmaxpiz4xgzj.streamlit.app/' },
  { no: '02', title: 'Real-Time Chess Review', type: 'Artificial Intelligence', year: '2024', desc: 'A real-time chess review system that classifies moves and recommends the best next play.', tags: ['Python', 'CNN', 'AI'], link: 'https://rutujprojectnotdeployed.netlify.app/' },
  { no: '03', title: 'Diabetes Detection', type: 'Deep Learning', year: '2025', desc: 'A PyTorch model that predicts diabetes from medical data, prioritising performance and accuracy.', tags: ['Python', 'PyTorch', 'DNN'], link: 'https://diabetes-prediction-main-600million.streamlit.app/' },
  { no: '04', title: 'Object Detection', type: 'Computer Vision', year: '2025', desc: 'A camera-ready object detection model that identifies categories in images and real-time video.', tags: ['Python', 'CNN', 'Vision'], link: 'https://object-detection-basic-vhs0.onrender.com/' },
  { no: '05', title: 'Image Hosting', type: 'Cloud Computing', year: '2025', desc: 'A public cloud image host for fast, direct image URLs without keeping assets in local development storage.', tags: ['Python', 'Cloud', 'Hosting'], link: 'https://image-hosting-rutujdhodapkar.streamlit.app/' }
];

const developmentProjects = [
  { no: 'D1', title: 'Everything AI', type: 'Artificial Intelligence', year: 'UNDER DEVELOPMENT', desc: 'A long-range exploration of AI systems that can execute useful tasks across a computer.', tags: ['Python', 'Java', 'LLMs'], link: 'https://rutujprojectunderdevelopment.netlify.app/' },
  { no: 'D2', title: 'Text to Website AI', type: 'Generative AI', year: 'UNDER DEVELOPMENT', desc: 'An experiment that turns one small prompt into a complete dynamic website.', tags: ['AI', 'LLMs', 'JavaScript'], link: 'https://rutujprojectunderdevelopment.netlify.app/' },
  { no: 'D3', title: 'Cloud Storage', type: 'Cloud Computing', year: 'UNDER DEVELOPMENT', desc: 'A lightweight, accessible and encrypted cloud storage concept designed to stay cost effective.', tags: ['Python', 'Cloud', 'Security'], link: 'https://rutujprojectnotdeployed.netlify.app/' },
  { no: 'D4', title: 'Chess Bot', type: 'Deep Learning', year: 'UNDER DEVELOPMENT', desc: 'A mathematical game-playing system exploring strong chess decisions and high-ELO strategy.', tags: ['Python', 'Algorithms', 'Chess'], link: 'https://chessbot1.netlify.app/' },
  { no: 'D5', title: 'Research & Writing', type: 'Web Development', year: 'UNDER DEVELOPMENT', desc: 'A home for notes, research and ideas about intelligence, technology and the systems around us.', tags: ['Writing', 'Research', 'Web'], link: 'https://hashnode.com/@rutujdhodapkar' }
];

const skills = ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'Python', 'JavaScript', 'Cloud Computing', 'Big Data Analytics'];
const certificates = [];
const railMessages = [
  'EMAIL: RUTUJ@FENNARK.XYZ',
  'BUILD A THING',
  'RESEARCH · AI · SYSTEMS',
  'OPEN TO GOOD QUESTIONS',
  'PUNE · INDIA · 2026',
  'SAY HELLO'
];
const ANALYTICS_URL = 'https://freelancing-ffae0-default-rtdb.firebaseio.com/portfolioAnalytics/visits';
const VISITOR_ID_KEY = 'rutuj-portfolio-visitor-id';
const LAST_VISIT_KEY = 'rutuj-portfolio-last-visit';

function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return 'session-only';
  }
}

function getDeviceCategory() {
  if (window.matchMedia('(pointer: coarse)').matches) return 'touch';
  return window.innerWidth < 900 ? 'small-screen' : 'desktop';
}

function getBrowserFamily() {
  const agent = navigator.userAgent;
  if (/Edg\//.test(agent)) return 'edge';
  if (/Firefox\//.test(agent)) return 'firefox';
  if (/Chrome\//.test(agent)) return 'chrome';
  if (/Safari\//.test(agent)) return 'safari';
  return 'other';
}

function getScreenClass() {
  if (window.innerWidth < 600) return 'phone';
  if (window.innerWidth < 1100) return 'tablet-small';
  return 'desktop';
}

function VisitCounter() {
  const [count, setCount] = React.useState(null);
  useEffect(() => {
    let active = true;
    const recordVisit = async () => {
      try {
        const lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY) || 0);
        if (Date.now() - lastVisit >= 10 * 60 * 1000) {
          await fetch(`${ANALYTICS_URL}.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              at: { '.sv': 'timestamp' },
              visitorId: getVisitorId(),
              device: getDeviceCategory(),
              browser: getBrowserFamily(),
              screen: getScreenClass(),
              language: navigator.language || 'unknown'
            })
          });
          localStorage.setItem(LAST_VISIT_KEY, String(Date.now()));
        }
        const response = await fetch(`${ANALYTICS_URL}.json?shallow=true`);
        const visits = await response.json();
        if (active) setCount(visits && typeof visits === 'object' ? Object.keys(visits).length : 0);
      } catch {
        if (active) setCount(null);
      }
    };
    recordVisit();
    return () => { active = false; };
  }, []);
  return <span className="visit-count" aria-label="Anonymous portfolio visit count">{count === null ? 'VISITS' : `${count} VISITS`}</span>;
}

function AdminDashboard() {
  const [key, setKey] = React.useState('');
  const [records, setRecords] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const loadAnalytics = async (event, accessKey = key) => {
    event?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin-analytics', { headers: { 'x-admin-key': accessKey } });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to load analytics.');
      setRecords(body.visits || {});
      sessionStorage.setItem('rutuj-admin-key', accessKey);
    } catch (requestError) {
      setError(requestError.message);
      setRecords(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = sessionStorage.getItem('rutuj-admin-key');
    if (savedKey) { setKey(savedKey); loadAnalytics({ preventDefault() {} }, savedKey); }
  }, []);

  const rows = records ? Object.entries(records).map(([id, visit]) => ({ id, ...visit })).sort((a, b) => Number(b.at || 0) - Number(a.at || 0)) : [];
  const visitorTotals = rows.reduce((totals, row) => {
    const visitor = row.visitorId || 'legacy-visitor';
    totals[visitor] = (totals[visitor] || 0) + 1;
    return totals;
  }, {});
  const uniqueVisitors = Object.keys(visitorTotals).length;
  const totalVisits = rows.length;
  const averageVisits = uniqueVisitors ? (totalVisits / uniqueVisitors).toFixed(1) : '0.0';

  return <main className="admin-page"><div className="admin-shell"><header className="admin-header"><a className="admin-brand" href="/">RD<span>.</span></a><div><div className="admin-kicker">PRIVATE ANALYTICS</div><h1>Visitor dashboard</h1></div><a className="admin-back" href="/">BACK TO SITE ↗</a></header><section className="admin-intro"><p>Anonymous, coarse analytics only. No IP address, precise location, network identity, or fingerprint is collected.</p><form className="admin-login" onSubmit={loadAnalytics}><input type="password" value={key} onChange={event => setKey(event.target.value)} placeholder="Admin access key" aria-label="Admin access key"/><button type="submit" disabled={loading}>{loading ? 'LOADING…' : 'OPEN DASHBOARD'}</button></form>{error && <p className="admin-error">{error}</p>}</section>{records && <><section className="admin-summary"><div><span>TOTAL VISITS</span><strong>{totalVisits}</strong></div><div><span>UNIQUE VISITORS</span><strong>{uniqueVisitors}</strong></div><div><span>VISITS / VISITOR</span><strong>{averageVisits}</strong></div></section><section className="admin-table-wrap"><table><thead><tr><th>TIME</th><th>VISITOR</th><th>DEVICE</th><th>BROWSER</th><th>SCREEN</th><th>LANGUAGE</th><th>VISITS</th></tr></thead><tbody>{rows.map(row => <tr key={row.id}><td>{row.at ? new Date(Number(row.at)).toLocaleString() : '—'}</td><td className="admin-visitor">{(row.visitorId || 'legacy-visitor').slice(0, 12)}…</td><td>{row.device || '—'}</td><td>{row.browser || '—'}</td><td>{row.screen || '—'}</td><td>{row.language || '—'}</td><td>{visitorTotals[row.visitorId || 'legacy-visitor']}</td></tr>)}</tbody></table>{rows.length === 0 && <div className="admin-empty">No visits recorded yet.</div>}</section></>}</div></main>;
}

function BrandIcon({ name }) {
  const paths = {
    github: <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.22.7-3.9-1.55-3.9-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.05-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.29-5.27-5.75 0-1.27.45-2.3 1.2-3.1-.12-.3-.52-1.47.11-3.06 0 0 .98-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.06.75.8 1.2 1.83 1.2 3.1 0 4.47-2.7 5.46-5.28 5.75.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>,
    linkedin: <path d="M5.06 8.9H1.3V21h3.76V8.9ZM3.18 3A2.18 2.18 0 1 0 3.2 7.36 2.18 2.18 0 0 0 3.18 3ZM21 14.07c0-3.64-1.94-5.34-4.53-5.34-2.09 0-3.02 1.15-3.54 1.95V8.9H9.17V21h3.76v-5.99c0-1.58.3-3.1 2.25-3.1 1.92 0 1.94 1.8 1.94 3.2V21H21v-6.93Z"/>,
    x: <path d="M4 3h4.6l3.56 4.72L16.1 3H20l-6.03 6.8L20.5 21h-4.6l-3.97-5.25L7.1 21H3.2l6.35-7.17L4 3Zm3.1 1.8H6.1l8.8 14.4h1l-8.8-14.4Z"/>,
    email: <path d="M3.75 5.25 3 6v12l.75.75h16.5L21 18V6l-.75-.75H3.75ZM4.5 7.7v9.55h15V7.7L12 14.51 4.5 7.7ZM18.31 6.75H5.69L12 12.49l6.31-5.74Z"/>
  };
  return <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Socials() {
  return <div className="socials">
    <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><BrandIcon name="github"/></a>
    <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BrandIcon name="linkedin"/></a>
    <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X"><BrandIcon name="x"/></a>
    <a href={profile.socials.email} aria-label="Email"><BrandIcon name="email"/></a>
    <a href={profile.socials.gmail} aria-label="Gmail"><BrandIcon name="email"/></a>
    <a href={profile.socials.resume} aria-label="Resume email"><span className="resume-mark">CV</span></a>
  </div>;
}

function VerticalRail() {
  return <aside className="vertical-rail" aria-label="Contact ticker"><div className="rail-kicker">CONTACT / 01</div><div className="vertical-rail-track">{[...railMessages, ...railMessages].map((message, index) => <span key={`${message}-${index}`}>{message} <b>✦</b></span>)}</div></aside>;
}

function ProjectCard({ project }) {
  return <article className="project-card">
    <div className="project-card-top"><span className="project-no">{project.no}</span><span className="project-year">{project.year}</span><a className="project-link" href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><ArrowUpRight size={19}/></a></div>
    <div className="project-copy"><div className="eyebrow">{project.type}</div><h3>{project.title}</h3><p>{project.desc}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-footer"><span>VIEW CASE</span><ChevronRight size={14}/></div></div>
  </article>;
}

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = React.useState(7);
  const [leaving, setLeaving] = React.useState(false);
  const [pointer, setPointer] = React.useState({ x: 50, y: 50 });

  useEffect(() => {
    let active = true;
    let exitTimer;
    let removeTimer;
    const finishWhenReady = async () => {
      try { await document.fonts?.ready; } catch { /* Font loading is non-critical. */ }
      if (!active) return;
      const finish = () => {
        setProgress(100);
        exitTimer = window.setTimeout(() => setLeaving(true), 1000);
        removeTimer = window.setTimeout(onComplete, 1500);
      };
      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', finish, { once: true });
    };
    const progressTimer = window.setInterval(() => setProgress(value => Math.min(value + 2, 92)), 70);
    finishWhenReady();
    return () => {
      active = false;
      window.clearInterval(progressTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return <div className={`loading-screen${leaving ? ' is-leaving' : ''}`} style={{ '--loader-x': `${pointer.x}%`, '--loader-y': `${pointer.y}%` }} onPointerMove={event => setPointer({ x: event.clientX / window.innerWidth * 100, y: event.clientY / window.innerHeight * 100 })} role="status" aria-live="polite" aria-label="Loading portfolio">
    <div className="loader-grid" />
    <div className="loader-orbit loader-orbit-one" />
    <div className="loader-orbit loader-orbit-two" />
    <div className="loader-topline"><span>RD<span className="loader-accent">.</span></span><span>PORTFOLIO / 2026</span></div>
    <div className="loader-center"><div className="loader-kicker">INITIALIZING SYSTEMS</div><div className="loader-logo">R<span>D</span></div><div className="loader-message">A THOUGHTFUL INTERFACE<br/>IS COMING ONLINE</div></div>
    <div className="loader-bottomline"><div className="loader-progress"><span style={{ width: `${progress}%` }} /></div><span className="loader-percent">{String(progress).padStart(3, '0')}%</span><span className="loader-status">LOADING / READYING THE WORK</span></div>
  </div>;
}

function App() {
  const [loading, setLoading] = React.useState(true);
  const jump = (id) => {
    const section = document.getElementById(id);
    const scroller = document.querySelector('.site-shell');
    if (!section || !scroller) return;
    if (window.innerWidth < 900) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    scroller.scrollTo({ left: section.offsetLeft, behavior: 'smooth' });
  };
  useEffect(() => {
    const scroller = document.querySelector('.site-shell');
    let target = scroller?.scrollLeft || 0;
    let frame = 0;
    const easeToTarget = () => {
      if (!scroller) return;
      const distance = target - scroller.scrollLeft;
      if (Math.abs(distance) < 0.5) { scroller.scrollLeft = target; frame = 0; return; }
      scroller.scrollLeft += distance * 0.2;
      frame = requestAnimationFrame(easeToTarget);
    };
    const moveSideways = (event) => {
      if (window.innerWidth < 900 || !scroller) return;
      const cardList = event.target.closest('.project-grid');
      if (cardList) {
        cardList.scrollLeft += (event.deltaY + event.deltaX) * 0.85;
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        const max = scroller.scrollWidth - scroller.clientWidth;
        target = Math.max(0, Math.min(max, target + event.deltaY * 0.92 + event.deltaX));
        if (!frame) frame = requestAnimationFrame(easeToTarget);
        event.preventDefault();
      }
    };
    window.addEventListener('wheel', moveSideways, { passive: false });
    return () => { window.removeEventListener('wheel', moveSideways); cancelAnimationFrame(frame); };
  }, []);
  return <>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}<main className="site-shell" aria-hidden={loading}>
    <nav className="topbar" aria-label="Primary navigation"><button className="brand" onClick={() => jump('home')} aria-label="Go to homepage">RD<span>.</span></button><div className="nav-links"><button onClick={() => jump('work')}>WORK</button><button onClick={() => jump('about')}>ABOUT</button><button onClick={() => jump('lab')}>LAB</button><button onClick={() => jump('contact')}>CONTACT</button></div><div className="header-actions"><a className="header-resume" href="https://resume.rutujdhodapkar.tech" target="_blank" rel="noreferrer">RESUME</a><a className="header-email" href={profile.socials.email}>rutuj@fennark.xyz</a></div></nav>
    <div className="deck">
      <section id="home" className="panel hero-panel">
        <CursorGrid cellSize={70} color="#ff6800" radius={140} falloff="smooth" holdTime={400} fadeDuration={800} lineWidth={1.2} maxOpacity={0.9} fillOpacity={0} gridOpacity={0} cellRadius={0} clickPulse pulseSpeed={600}/>
        <VerticalRail />
        <div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        <div className="hero-content"><div className="eyebrow accent">01 — HELLO, WORLD</div><h1>Rutuj<br/><em>Dhodapkar</em></h1><p className="hero-line">{profile.intro}</p><div className="hero-actions"><button className="primary" onClick={() => jump('work')}>Explore work <ArrowUpRight size={16}/></button><a className="text-link" href={profile.socials.email}>Let’s talk <ChevronRight size={15}/></a></div></div>
        <div className="hero-side-label">2026<br/>OPEN TO IDEAS</div>
      </section>

      <section id="work" className="panel work-panel"><VerticalRail /><div className="section-heading"><div><div className="eyebrow accent">02 — SELECTED WORK</div><h2>Ideas into<br/><em>intelligence.</em></h2></div><p className="section-note">High-signal builds at the intersection of code, cognition and useful systems.</p></div><div className="project-grid">{projects.map(project => <ProjectCard key={project.no} project={project}/>)}</div><div className="scroll-guide"><span>PROJECTS</span><div><i/><i/><i/><i/><i/></div><span>SCROLL SIDEWAYS TO EXPLORE</span></div></section>

      <section id="about" className="panel about-panel"><div className="eyebrow accent">03 — THE SHORT VERSION</div><div className="about-grid"><div><h2>Research-minded.<br/><em>Human - led.</em></h2><p className="big-copy">{profile.about[0]}</p></div><div className="about-right"><p>{profile.about[1]}</p><div className="skill-cloud">{skills.map((skill, i) => <span className={i % 3 === 0 ? 'hot' : ''} key={skill}>{skill}</span>)}</div></div></div><div className="signal-grid"><div><strong>01</strong><span>Ask better<br/>questions</span></div><div><strong>02</strong><span>Build with<br/>precision</span></div><div><strong>03</strong><span>Keep it<br/>human</span></div><div className="signal-note">CURRENTLY EXPLORING<br/><em>AGENTS · VISION · REASONING</em></div></div><div className="credential-strip">{certificates.map(cert => <a href={cert.link} target="_blank" rel="noreferrer" key={cert.title}><div className="credential-mark">AWS</div><div><strong>{cert.title}</strong><span>{cert.subtitle} · {cert.year}</span></div><ExternalLink size={15}/></a>)}</div></section>

      <section id="lab" className="panel lab-panel"><VerticalRail /><div className="section-heading"><div><div className="eyebrow accent">04 — IN THE LAB</div><h2>Still<br/><em>becoming.</em></h2></div><p className="section-note">Some ideas are still under development. They stay here as signals of what I’m exploring next.</p></div><div className="project-grid development-grid">{developmentProjects.map(project => <ProjectCard key={project.no} project={project}/>)}</div><div className="scroll-guide"><span>DEVELOPMENT</span><div><i/><i/><i/><i/><i/></div><span>OPEN A CARD TO EXPLORE</span></div></section>

      <section id="contact" className="panel contact-panel"><div className="contact-glow"/><div className="eyebrow accent">05 — MAKE SOMETHING REAL</div><h2>Let’s make the<br/><em>next thing.</em></h2><p>Have a problem worth thinking deeply about? I’m always open to interesting conversations, collaborations and ambitious builds.</p><a className="contact-button" href={profile.socials.email}>rutujdhodapkar@gmail.com <ArrowUpRight size={18}/></a><div className="contact-links"><a href={profile.socials.github} target="_blank" rel="noreferrer"><span>GITHUB</span><b>rutujdhodapkar</b><ArrowUpRight size={16}/></a><a href={profile.socials.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span><b>rutujdhodapkar</b><ArrowUpRight size={16}/></a><a href={profile.socials.x} target="_blank" rel="noreferrer"><span>X / TWITTER</span><b>@rutujdhodapkar</b><ArrowUpRight size={16}/></a></div><div className="contact-footer"><Socials/><VisitCounter/><span>© {new Date().getFullYear()} RUTUJ DHODAPKAR</span><span>BUILT WITH CURIOSITY</span></div></section>
    </div>
  </main></>;
}

const isAdminPage = window.location.pathname.replace(/\/+$/, '') === '/admin';
createRoot(document.getElementById('root')).render(isAdminPage ? <AdminDashboard /> : <App />);
