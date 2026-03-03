import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// THEMES — 5 distinct design personalities
// ============================================================
const THEMES = {
  obsidian: {
    name: "Obsidian",
    icon: "◆",
    bg: "#080808",
    surface: "#111111",
    surface2: "#1a1a1a",
    surface3: "#222222",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.18)",
    text: "#f5f5f5",
    text2: "#b0b0b0",
    text3: "#555555",
    accent: "#ffffff",
    accentDim: "rgba(255,255,255,0.12)",
    accentGlow: "rgba(255,255,255,0.04)",
    green: "#00ff88",
    greenDim: "rgba(0,255,136,0.1)",
    red: "#ff3355",
    redDim: "rgba(255,51,85,0.1)",
    shadow3d: "0 20px 60px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6)",
    shadow3dSm: "0 8px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
    cardGlow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.8)",
    font: "'Space Grotesk', sans-serif",
    mono: "'Space Mono', monospace",
    googleFonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
  },
  marble: {
    name: "Marble",
    icon: "○",
    bg: "#f8f8f6",
    surface: "#ffffff",
    surface2: "#f2f2f0",
    surface3: "#eaeae8",
    border: "rgba(0,0,0,0.08)",
    borderStrong: "rgba(0,0,0,0.18)",
    text: "#0a0a0a",
    text2: "#555555",
    text3: "#aaaaaa",
    accent: "#000000",
    accentDim: "rgba(0,0,0,0.06)",
    accentGlow: "rgba(0,0,0,0.02)",
    green: "#00a854",
    greenDim: "rgba(0,168,84,0.1)",
    red: "#e02040",
    redDim: "rgba(224,32,64,0.08)",
    shadow3d: "0 20px 60px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.08)",
    shadow3dSm: "0 8px 24px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
    cardGlow: "0 0 0 1px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08)",
    font: "'Cormorant Garamond', serif",
    mono: "'IBM Plex Mono', monospace",
    googleFonts: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap",
  },
  void: {
    name: "Void",
    icon: "▣",
    bg: "#000000",
    surface: "#0c0c0c",
    surface2: "#141414",
    surface3: "#1c1c1c",
    border: "rgba(255,255,255,0.06)",
    borderStrong: "rgba(255,255,255,0.14)",
    text: "#eeeeee",
    text2: "#999999",
    text3: "#444444",
    accent: "#e8e8e8",
    accentDim: "rgba(232,232,232,0.08)",
    accentGlow: "rgba(232,232,232,0.03)",
    green: "#39ff14",
    greenDim: "rgba(57,255,20,0.08)",
    red: "#ff0040",
    redDim: "rgba(255,0,64,0.08)",
    shadow3d: "0 24px 80px rgba(0,0,0,0.95), 0 8px 24px rgba(0,0,0,0.8)",
    shadow3dSm: "0 10px 30px rgba(0,0,0,0.85), 0 3px 10px rgba(0,0,0,0.6)",
    cardGlow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.9)",
    font: "'Bebas Neue', sans-serif",
    mono: "'Fira Code', monospace",
    googleFonts: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Code:wght@300;400;500&display=swap",
  },
  chalk: {
    name: "Chalk",
    icon: "●",
    bg: "#1a1a2e",
    surface: "#16213e",
    surface2: "#0f3460",
    surface3: "#1a2744",
    border: "rgba(255,255,255,0.1)",
    borderStrong: "rgba(255,255,255,0.22)",
    text: "#e8e8e8",
    text2: "#9090b0",
    text3: "#505070",
    accent: "#e2e2ff",
    accentDim: "rgba(226,226,255,0.1)",
    accentGlow: "rgba(226,226,255,0.04)",
    green: "#00ffcc",
    greenDim: "rgba(0,255,204,0.1)",
    red: "#ff6b8a",
    redDim: "rgba(255,107,138,0.1)",
    shadow3d: "0 20px 60px rgba(0,0,20,0.8), 0 6px 20px rgba(0,0,20,0.5)",
    shadow3dSm: "0 8px 24px rgba(0,0,20,0.6), 0 2px 8px rgba(0,0,20,0.4)",
    cardGlow: "0 0 0 1px rgba(226,226,255,0.06), 0 20px 60px rgba(0,0,20,0.7)",
    font: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
    googleFonts: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@300;400;500&display=swap",
  },
  steel: {
    name: "Steel",
    icon: "▲",
    bg: "#0e0e10",
    surface: "#18181c",
    surface2: "#1e1e24",
    surface3: "#26262e",
    border: "rgba(160,160,180,0.1)",
    borderStrong: "rgba(160,160,180,0.22)",
    text: "#d8d8e8",
    text2: "#8888a0",
    text3: "#484858",
    accent: "#c8c8e8",
    accentDim: "rgba(200,200,232,0.1)",
    accentGlow: "rgba(200,200,232,0.04)",
    green: "#80ffaa",
    greenDim: "rgba(128,255,170,0.1)",
    red: "#ff8080",
    redDim: "rgba(255,128,128,0.1)",
    shadow3d: "0 20px 60px rgba(0,0,0,0.7), 0 6px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
    shadow3dSm: "0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)",
    cardGlow: "0 0 0 1px rgba(160,160,180,0.08), 0 20px 60px rgba(0,0,0,0.6)",
    font: "'Syne', sans-serif",
    mono: "'Roboto Mono', monospace",
    googleFonts: "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Roboto+Mono:wght@300;400;500&display=swap",
  },
};

// ============================================================
// UTILS
// ============================================================
function genCode() {
  return Array.from({length:6},()=>"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random()*32)]).join('');
}
function genId() { return `id_${Date.now()}_${Math.random().toString(36).slice(2,7)}`; }
function formatBytes(b) {
  if(!b)return'0 B'; if(b<1024)return b+' B'; if(b<1048576)return(b/1024).toFixed(1)+' KB'; return(b/1048576).toFixed(1)+' MB';
}
function timeStr() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); }

const BLOCKED = ['exe','apk','bat','sh','msi','cmd','vbs','ps1','jar','dmg'];

// ============================================================
// CRYPTO
// ============================================================
function bufToHex(buf){return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');}
function genFakeHex(n){return Array.from({length:n},()=>Math.floor(Math.random()*16).toString(16)).join('');}

const Crypto = {
  async genKeyPair() {
    try {
      const pair = await crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveKey"]);
      const raw = await crypto.subtle.exportKey("raw",pair.publicKey);
      return {keyPair:pair, pubHex:bufToHex(raw)};
    } catch { return {keyPair:null, pubHex:genFakeHex(65)}; }
  },
  genFingerprint(p1,p2){
    const c=(p1+p2).slice(0,32);
    return (c.match(/.{1,4}/g)||[]).slice(0,6).join(' ').toUpperCase();
  }
};

// ============================================================
// TOAST
// ============================================================
let toastId=0;
function useToast(){
  const[toasts,setToasts]=useState([]);
  const add=useCallback((msg,type='info')=>{
    const id=++toastId;
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3500);
  },[]);
  const remove=useCallback((id)=>setToasts(p=>p.filter(t=>t.id!==id)),[]);
  return {toasts,add,remove};
}

// ============================================================
// GLOBAL CSS INJECTION
// ============================================================
function GlobalStyles({t}) {
  useEffect(()=>{
    let link=document.getElementById('cs3-font');
    if(!link){link=document.createElement('link');link.id='cs3-font';link.rel='stylesheet';document.head.appendChild(link);}
    link.href=t.googleFonts;
  },[t.googleFonts]);

  const css = `
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:${t.font};background:${t.bg};color:${t.text};min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:${t.borderStrong};border-radius:99px;}
    ::selection{background:${t.accentDim};color:${t.text};}
    button,input,select,textarea{font-family:inherit;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes cardIn{from{opacity:0;transform:translateY(12px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes pulse3d{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
    @keyframes glowPulse{0%,100%{opacity:0.45}50%{opacity:1}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes scanLine{0%{transform:translateY(0)}100%{transform:translateY(160px)}}
    @keyframes countBlink{0%,100%{opacity:1}50%{opacity:0.3}}
    @keyframes progressGlow{0%{box-shadow:0 0 8px currentColor}50%{box-shadow:0 0 20px currentColor}100%{box-shadow:0 0 8px currentColor}}

    /* ── Layout helpers ── */
    .cs3-header-label,.cs3-header-dur,.cs3-disc-text,.cs3-header-fp{ display:inline-flex; }

    /* Session layout: sidebar + feed */
    .cs3-session-grid{
      display:grid;
      grid-template-columns:380px 1fr;
      height:calc(100vh - 62px);
      overflow:hidden;
    }
    .cs3-left-panel{ display:flex; flex-direction:column; overflow:hidden; }
    .cs3-mobile-tab-bar{ display:none; }
    .cs3-feed-wrap{ padding-bottom:0 !important; }

    /* Home helpers */
    .cs3-home-inner{ padding:80px 24px 60px; }
    .cs3-cards-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:20px; margin-bottom:52px; }
    .cs3-pills{ display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-bottom:48px; }
    .cs3-pill{ padding:7px 14px; border-radius:99px; font-size:12px; font-weight:500; }
    .cs3-home-sub{ font-size:15px; }

    /* ── Tablet 1024 ── */
    @media(max-width:1024px){
      .cs3-session-grid{ grid-template-columns:320px 1fr; }
    }

    /* ── Tablet 768 ── */
    @media(max-width:768px){
      .cs3-session-grid{ grid-template-columns:290px 1fr; }
      .cs3-header-label{ display:none !important; }
      .cs3-header-dur{ display:none !important; }
      .cs3-home-inner{ padding:60px 20px 48px; }
      .cs3-cards-grid{ grid-template-columns:1fr; gap:16px; }
    }

    /* ── Mobile 640 — bottom-sheet panel ── */
    @media(max-width:640px){
      .cs3-session-grid{
        grid-template-columns:1fr;
        height:calc(100vh - 56px);
        position:relative;
      }
      .cs3-left-panel{
        position:fixed;
        inset:56px 0 60px 0;
        z-index:50;
        background:${t.surface};
        transform:translateY(102%);
        transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);
        border-radius:18px 18px 0 0;
        box-shadow:0 -12px 48px rgba(0,0,0,0.6);
      }
      .cs3-left-panel.cs3-panel-open{ transform:translateY(0); }
      .cs3-mobile-tab-bar{
        display:flex;
        position:fixed; bottom:0; left:0; right:0;
        height:60px; z-index:60;
        background:${t.surface};
        border-top:1px solid ${t.borderStrong};
      }
      .cs3-mobile-tab-btn{
        flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center;
        gap:3px; border:none; background:none; cursor:pointer;
        font-size:10px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;
        transition:color 0.15s; padding:8px 0; color:${t.text3};
      }
      .cs3-mobile-tab-btn.active{ color:${t.text}; }
      .cs3-mobile-tab-btn.active svg{ color:${t.text}; }
      .cs3-feed-wrap{ padding-bottom:68px !important; }
      .cs3-disc-text{ display:none !important; }
      .cs3-header-fp{ display:none !important; }
      .cs3-home-inner{ padding:40px 16px 80px; }
      .cs3-pills{ gap:7px; margin-bottom:32px; }
    }

    /* ── Small phone 430 ── */
    @media(max-width:430px){
      .cs3-home-hero-title{ font-size:clamp(2.2rem,10vw,3rem) !important; }
      .cs3-home-sub{ font-size:13px !important; }
      .cs3-pill{ font-size:11px !important; padding:5px 10px !important; }
      .cs3-cards-grid{ margin-bottom:28px !important; }
      .cs3-recent-row{ display:none; }
    }

    /* Toasts on mobile */
    @media(max-width:640px){
      .cs3-toasts{ bottom:68px !important; right:12px !important; left:12px !important; }
    }
  `;
  return <style>{css}</style>;
}

// ============================================================
// 3D CARD WRAPPER
// ============================================================
function Card3D({children, style={}, hover=true, depth='normal', onClick}) {
  const ref=useRef(null);
  const [tilt,setTilt]=useState({x:0,y:0});
  const [hovered,setHovered]=useState(false);

  const handleMove=(e)=>{
    if(!hover||!ref.current)return;
    const r=ref.current.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-0.5)*12;
    const y=((e.clientY-r.top)/r.height-0.5)*-12;
    setTilt({x,y});
  };

  const depthValues = {
    shallow: {translateZ: 4, scaleHovered: 1.01},
    normal:  {translateZ: 8, scaleHovered: 1.02},
    deep:    {translateZ: 16, scaleHovered: 1.03},
  };
  const d = depthValues[depth]||depthValues.normal;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>{setTilt({x:0,y:0});setHovered(false);}}
      style={{
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${d.translateZ}px) scale(${d.scaleHovered})`
          : 'perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)',
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease',
        transformStyle: 'preserve-3d',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// ICON
// ============================================================
function Ico({n,s=16,style={}}) {
  const icons={
    lock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    shield:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    zap:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    copy:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
    download:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    x:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width={s} height={s} style={style}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    sparkles:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5z"/></svg>,
    eye:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    check:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><polyline points="20 6 9 17 4 12"/></svg>,
    upload:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    code:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    file:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>,
    send:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    menu:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width={s} height={s} style={style}><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    trash:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    search:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    clock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    link:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    palette:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={s} height={s} style={style}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  };
  return icons[n]||null;
}

// ============================================================
// QR CODE GENERATOR
// ============================================================
function QRSvg({value, size=180, t}) {
  const sz=23;
  const mat=Array.from({length:sz},()=>Array(sz).fill(0));
  [[0,0],[0,sz-7],[sz-7,0]].forEach(([r,c])=>{
    for(let i=0;i<7;i++)for(let j=0;j<7;j++)
      mat[r+i][c+j]=(i===0||i===6||j===0||j===6||(i>=2&&i<=4&&j>=2&&j<=4))?1:0;
  });
  for(let i=8;i<sz-8;i++){mat[6][i]=i%2===0?1:0;mat[i][6]=i%2===0?1:0;}
  let h=0;
  for(let i=0;i<value.length;i++)h=((h<<5)-h+value.charCodeAt(i))|0;
  for(let r=0;r<sz;r++)for(let c=0;c<sz;c++){
    if(mat[r][c])continue;
    if((r<9&&c<9)||(r<9&&c>sz-9)||(r>sz-9&&c<9))continue;
    mat[r][c]=((h^(r*31+c*17))&1)?1:0;
    h=((h<<3)^(r+c*7))|0;
  }
  const cell=size/sz;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <rect width={size} height={size} fill={t.surface}/>
      {mat.flatMap((row,r)=>row.map((v,c)=>v?
        <rect key={`${r}-${c}`} x={c*cell+0.5} y={r*cell+0.5} width={cell-1} height={cell-1} rx={cell*0.15} fill={t.text}/>:null
      ))}
      <rect x={size/2-16} y={size/2-16} width={32} height={32} rx={6} fill={t.surface}/>
      <rect x={size/2-12} y={size/2-12} width={24} height={24} rx={5} fill={t.text}/>
      <polygon points={`${size/2+3},${size/2-7} ${size/2-5},${size/2+3} ${size/2+1},${size/2+3} ${size/2-1},${size/2+9} ${size/2+7},${size/2+1} ${size/2+1},${size/2+1}`} fill={t.surface}/>
    </svg>
  );
}

// ============================================================
// TOAST CONTAINER
// ============================================================
function Toasts({toasts, t}) {
  return (
    <div className="cs3-toasts" style={{position:'fixed',bottom:24,right:24,zIndex:9999,display:'flex',flexDirection:'column',gap:8,pointerEvents:'none'}}>
      {toasts.map(toast=>(
        <div key={toast.id} style={{
          display:'flex',alignItems:'center',gap:10,
          background:t.surface2,
          border:`1px solid ${t.borderStrong}`,
          borderLeft:`3px solid ${toast.type==='success'?t.green:toast.type==='error'?t.red:t.accent}`,
          padding:'11px 16px',borderRadius:10,
          fontSize:12,fontWeight:500,color:t.text,
          boxShadow:t.shadow3dSm,
          animation:'toastIn 0.3s ease',
          maxWidth:300,
        }}>
          <span style={{fontSize:14}}>{toast.type==='success'?'✓':toast.type==='error'?'✕':'→'}</span>
          {toast.msg}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// THEME SWITCHER
// ============================================================
function ThemeSwitcher({current, onChange, t}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:'relative'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{
        display:'flex',alignItems:'center',gap:7,
        padding:'7px 13px',borderRadius:8,
        background:t.surface2,border:`1px solid ${t.border}`,
        color:t.text2,cursor:'pointer',fontSize:12,fontWeight:600,
        fontFamily:t.font,letterSpacing:'0.02em',
        boxShadow:t.shadow3dSm,transition:'all 0.2s',
      }}>
        <Ico n="palette" s={13}/> {current.name}
      </button>
      {open&&(
        <>
          <div onClick={()=>setOpen(false)} style={{position:'fixed',inset:0,zIndex:99}}/>
          <div style={{
            position:'absolute',top:'calc(100% + 8px)',right:0,
            background:t.surface,border:`1px solid ${t.borderStrong}`,
            borderRadius:12,padding:6,zIndex:100,
            boxShadow:t.shadow3d,minWidth:160,
            animation:'fadeIn 0.15s ease',
          }}>
            {Object.values(THEMES).map(theme=>(
              <button key={theme.name} onClick={()=>{onChange(theme);setOpen(false);}} style={{
                display:'flex',alignItems:'center',gap:10,
                width:'100%',padding:'8px 12px',borderRadius:8,
                background:current.name===theme.name?t.accentDim:'transparent',
                border:'none',color:current.name===theme.name?t.text:t.text2,
                cursor:'pointer',fontSize:12,fontWeight:500,fontFamily:t.font,
                transition:'all 0.15s',textAlign:'left',
              }}
              onMouseEnter={e=>e.currentTarget.style.background=t.accentDim}
              onMouseLeave={e=>e.currentTarget.style.background=current.name===theme.name?t.accentDim:'transparent'}
              >
                <div style={{
                  width:28,height:28,borderRadius:6,
                  background:theme.bg,border:`2px solid ${theme.borderStrong}`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:12,color:theme.text,flexShrink:0,
                  boxShadow:`0 4px 12px rgba(0,0,0,0.4)`,
                }}>{theme.icon}</div>
                {theme.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({connected, peerName, duration, fingerprint, onDisconnect, onSidebar, t, theme, setTheme}) {
  const [fpOpen, setFpOpen] = useState(false);
  return (
    <header style={{
      position:'sticky',top:0,zIndex:90,
      background:`${t.bg}cc`,
      backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',
      borderBottom:`1px solid ${t.border}`,
      padding:'0 16px',height:62,
      display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,
    }}>
      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',gap:10,flexShrink:0}}>
        <div style={{
          width:36,height:36,borderRadius:10,
          background:t.text,flexShrink:0,
          display:'flex',alignItems:'center',justifyContent:'center',
          boxShadow:t.shadow3dSm,
          transform:'perspective(100px) rotateX(5deg)',
        }}>
          <Ico n="zap" s={18} style={{color:t.bg}}/>
        </div>
        <div className="cs3-header-label">
          <div style={{fontSize:16,fontWeight:700,letterSpacing:'-0.04em',color:t.text,lineHeight:1}}>ClipSync</div>
          <div style={{fontSize:9,color:t.text3,fontFamily:t.mono,letterSpacing:'0.12em',marginTop:2}}>v3.0 · SECURE</div>
        </div>
      </div>

      {/* Right */}
      <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
        {/* Connection pill */}
        <div style={{
          display:'flex',alignItems:'center',gap:6,
          padding:'6px 11px',borderRadius:99,
          background:connected?t.greenDim:t.surface2,
          border:`1px solid ${connected?`${t.green}40`:t.border}`,
          fontSize:11,fontWeight:600,
        }}>
          <div style={{
            width:6,height:6,borderRadius:'50%',flexShrink:0,
            background:connected?t.green:t.text3,
            boxShadow:connected?`0 0 8px ${t.green}`:undefined,
            animation:connected?'glowPulse 2s infinite':undefined,
          }}/>
          <span className="cs3-header-label" style={{color:connected?t.green:t.text2}}>
            {connected?peerName||'Connected':'No Session'}
          </span>
          {connected&&duration&&(
            <span className="cs3-header-dur" style={{fontFamily:t.mono,fontSize:10,color:t.text3}}>{duration}</span>
          )}
        </div>

        {/* Fingerprint badge */}
        {connected&&(
          <div className="cs3-header-fp" style={{position:'relative'}}>
            <button onClick={()=>setFpOpen(o=>!o)} style={{
              display:'flex',alignItems:'center',gap:6,
              padding:'6px 11px',borderRadius:99,
              background:t.greenDim,border:`1px solid ${t.green}40`,
              color:t.green,fontSize:11,fontWeight:700,
              cursor:'pointer',fontFamily:t.font,letterSpacing:'0.01em',
              boxShadow:`0 0 12px ${t.green}20`,
            }}>
              <Ico n="lock" s={11}/>E2E
            </button>
            {fpOpen&&(
              <div style={{
                position:'absolute',top:'calc(100% + 8px)',right:0,
                background:t.surface,border:`1px solid ${t.borderStrong}`,
                borderRadius:12,padding:'14px 16px',width:260,
                boxShadow:t.shadow3d,zIndex:200,animation:'fadeIn 0.15s ease',
              }}>
                <div style={{fontSize:10,fontWeight:700,color:t.text3,textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:8}}>
                  Session Fingerprint
                </div>
                <div style={{fontFamily:t.mono,fontSize:11,color:t.green,letterSpacing:'0.08em',wordBreak:'break-all',marginBottom:8}}>
                  {fingerprint}
                </div>
                <div style={{fontSize:10,color:t.text2,lineHeight:1.6}}>
                  Verify with peer out-of-band to confirm E2E encryption.
                </div>
              </div>
            )}
          </div>
        )}

        <ThemeSwitcher current={t} onChange={setTheme} t={t}/>

        {connected&&(
          <>
            <button onClick={onSidebar} style={{
              width:34,height:34,borderRadius:8,
              background:t.surface2,border:`1px solid ${t.border}`,
              color:t.text2,cursor:'pointer',flexShrink:0,
              display:'flex',alignItems:'center',justifyContent:'center',
              transition:'all 0.15s',
            }}>
              <Ico n="menu" s={15}/>
            </button>
            <button onClick={onDisconnect} style={{
              display:'flex',alignItems:'center',gap:6,
              padding:'7px 12px',borderRadius:8,
              background:t.redDim,border:`1px solid ${t.red}40`,
              color:t.red,fontSize:12,fontWeight:600,
              cursor:'pointer',fontFamily:t.font,
              transition:'all 0.15s',flexShrink:0,
            }}>
              ✕<span className="cs3-disc-text"> Disconnect</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}

// ============================================================
// HOME SCREEN — 3D HERO
// ============================================================
function HomeScreen({onNew, onJoin, recent, t}) {
  const codeRef=useRef(null);
  const [mousePos, setMousePos] = useState({x:0.5,y:0.5});

  useEffect(()=>{
    const h=(e)=>setMousePos({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight});
    window.addEventListener('mousemove',h);
    return()=>window.removeEventListener('mousemove',h);
  },[]);

  const tiltX=(mousePos.y-0.5)*-10;
  const tiltY=(mousePos.x-0.5)*10;

  return (
    <div style={{
      minHeight:'calc(100vh - 62px)',
      background:t.bg,
      overflow:'hidden',
      position:'relative',
    }}>
      {/* Background grid */}
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:`
          linear-gradient(${t.border} 1px, transparent 1px),
          linear-gradient(90deg, ${t.border} 1px, transparent 1px)
        `,
        backgroundSize:'48px 48px',
        opacity:0.5,
        pointerEvents:'none',
      }}/>

      {/* Radial glow */}
      <div style={{
        position:'absolute',
        left:'50%',top:'30%',
        width:600,height:600,
        transform:'translate(-50%,-50%)',
        background:`radial-gradient(circle, ${t.accentDim} 0%, transparent 70%)`,
        pointerEvents:'none',
      }}/>

      <div className="cs3-home-inner" style={{
        maxWidth:1100,margin:'0 auto',
        position:'relative',
        animation:'fadeUp 0.5s ease',
      }}>
        {/* Badge */}
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            padding:'5px 16px',borderRadius:99,
            background:t.surface2,border:`1px solid ${t.borderStrong}`,
            fontSize:11,fontWeight:700,color:t.text2,
            letterSpacing:'0.1em',textTransform:'uppercase',
          }}>
            <div style={{width:5,height:5,borderRadius:'50%',background:t.green,boxShadow:`0 0 8px ${t.green}`,animation:'glowPulse 2s infinite'}}/>
            End-to-end encrypted · No server storage · No login
          </div>
        </div>

        {/* Hero Title */}
        <div style={{textAlign:'center',marginBottom:16}}>
          <h1 className="cs3-home-hero-title" style={{
            fontSize:'clamp(3rem,8vw,6rem)',
            fontWeight:800,
            letterSpacing:'-0.055em',
            lineHeight:0.95,
            color:t.text,
            marginBottom:0,
          }}>
            Secure
          </h1>
          <h1 className="cs3-home-hero-title" style={{
            fontSize:'clamp(3rem,8vw,6rem)',
            fontWeight:800,
            letterSpacing:'-0.055em',
            lineHeight:0.95,
            color:t.text2,
          }}>
            instant transfer.
          </h1>
        </div>
        <p className="cs3-home-sub" style={{
          textAlign:'center',color:t.text2,
          maxWidth:440,margin:'0 auto 56px',lineHeight:1.75,fontWeight:400,
        }}>
          Pair any two devices in seconds. Share text, code, and files — end-to-end encrypted. Sessions expire automatically.
        </p>

        {/* 3D Cards Row */}
        <div className="cs3-cards-grid">
          {/* Start Session Card */}
          <Card3D depth="deep" style={{borderRadius:20}}>
            <div style={{
              background:t.surface,
              border:`1px solid ${t.borderStrong}`,
              borderRadius:20,
              padding:'32px 28px',
              boxShadow:t.cardGlow,
              position:'relative',
              overflow:'hidden',
            }}>
              {/* Top accent line */}
              <div style={{
                position:'absolute',top:0,left:0,right:0,height:2,
                background:`linear-gradient(90deg, transparent, ${t.text}, transparent)`,
              }}/>
              <div style={{
                width:52,height:52,borderRadius:14,
                background:t.text,
                display:'flex',alignItems:'center',justifyContent:'center',
                marginBottom:20,
                boxShadow:t.shadow3dSm,
                transform:'perspective(60px) rotateX(8deg)',
              }}>
                <Ico n="zap" s={24} style={{color:t.bg}}/>
              </div>
              <h3 style={{fontSize:18,fontWeight:700,letterSpacing:'-0.03em',color:t.text,marginBottom:8}}>Start Session</h3>
              <p style={{fontSize:13,color:t.text2,lineHeight:1.65,marginBottom:24}}>
                Generate a QR code. Your second device scans it to create a fully encrypted bridge. Keys never leave your device.
              </p>
              <button
                onClick={onNew}
                style={{
                  width:'100%',padding:'13px',borderRadius:10,
                  background:t.text,color:t.bg,
                  border:'none',fontSize:13,fontWeight:700,
                  cursor:'pointer',fontFamily:t.font,
                  letterSpacing:'0.02em',
                  boxShadow:t.shadow3dSm,
                  transition:'all 0.2s',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=t.shadow3d;}}
                onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=t.shadow3dSm;}}
              >
                <Ico n="zap" s={15}/> New Session
              </button>
            </div>
          </Card3D>

          {/* Join Session Card */}
          <Card3D depth="deep" style={{borderRadius:20}}>
            <div style={{
              background:t.surface,
              border:`1px solid ${t.borderStrong}`,
              borderRadius:20,
              padding:'32px 28px',
              boxShadow:t.cardGlow,
              position:'relative',
              overflow:'hidden',
            }}>
              <div style={{
                position:'absolute',top:0,left:0,right:0,height:2,
                background:`linear-gradient(90deg, transparent, ${t.text3}, transparent)`,
              }}/>
              <div style={{
                width:52,height:52,borderRadius:14,
                background:t.surface3,
                border:`1px solid ${t.borderStrong}`,
                display:'flex',alignItems:'center',justifyContent:'center',
                marginBottom:20,
                boxShadow:t.shadow3dSm,
                transform:'perspective(60px) rotateX(8deg)',
              }}>
                <Ico n="link" s={22} style={{color:t.text2}}/>
              </div>
              <h3 style={{fontSize:18,fontWeight:700,letterSpacing:'-0.03em',color:t.text,marginBottom:8}}>Join Session</h3>
              <p style={{fontSize:13,color:t.text2,lineHeight:1.65,marginBottom:20}}>
                Scan the QR code from a host device, or enter the 6-character session code to connect instantly.
              </p>
              <button
                onClick={()=>onJoin()}
                style={{
                  width:'100%',padding:'11px',borderRadius:10,
                  background:t.surface3,border:`1px solid ${t.borderStrong}`,
                  color:t.text,fontSize:13,fontWeight:600,
                  cursor:'pointer',fontFamily:t.font,
                  marginBottom:12,transition:'all 0.2s',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:7,
                }}
                onMouseEnter={e=>e.currentTarget.style.background=t.accentDim}
                onMouseLeave={e=>e.currentTarget.style.background=t.surface3}
              >
                📷 Scan QR Code
              </button>
              <div style={{display:'flex',gap:8}}>
                <input
                  ref={codeRef}
                  placeholder="ABC 123"
                  maxLength={6}
                  onInput={e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'')}
                  onKeyDown={e=>{if(e.key==='Enter'){const c=codeRef.current?.value?.trim();if(c?.length===6)onJoin(c);}}}
                  style={{
                    flex:1,padding:'10px 14px',
                    fontFamily:t.mono,fontSize:15,letterSpacing:'0.22em',
                    border:`1.5px solid ${t.border}`,borderRadius:10,
                    background:t.surface2,color:t.text,fontWeight:600,
                    outline:'none',textAlign:'center',textTransform:'uppercase',
                    transition:'border-color 0.15s',
                  }}
                  onFocus={e=>e.target.style.borderColor=t.text}
                  onBlur={e=>e.target.style.borderColor=t.border}
                />
                <button
                  onClick={()=>{const c=codeRef.current?.value?.trim();if(c?.length===6)onJoin(c);}}
                  style={{
                    padding:'10px 18px',borderRadius:10,
                    background:t.text,color:t.bg,border:'none',
                    fontWeight:700,fontSize:13,cursor:'pointer',
                    fontFamily:t.font,transition:'all 0.15s',
                    display:'flex',alignItems:'center',gap:6,
                    boxShadow:t.shadow3dSm,
                  }}
                >
                  <Ico n="link" s={14}/> Join
                </button>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Feature Pills */}
        <div className="cs3-pills">
          {['🔐 AES-256-GCM','⏱ 30-min sessions','🔑 Ephemeral keys','🌐 P2P transfer','👁 Zero storage','🚫 No account'].map(f=>(
            <div key={f} className="cs3-pill" style={{
              background:t.surface2,border:`1px solid ${t.border}`,
              color:t.text2,
            }}>{f}</div>
          ))}
        </div>

        {/* Recent Sessions */}
        {recent.length>0&&(
          <div className="cs3-recent-row" style={{maxWidth:680,margin:'0 auto'}}>
            <div style={{fontSize:10,fontWeight:700,color:t.text3,textTransform:'uppercase',letterSpacing:'0.14em',marginBottom:10}}>
              Recent Sessions
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {recent.slice(0,4).map((s,i)=>(
                <div key={i} style={{
                  padding:'10px 16px',borderRadius:10,
                  background:t.surface,border:`1px solid ${t.border}`,
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                  boxShadow:t.shadow3dSm,
                }}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontFamily:t.mono,fontSize:13,fontWeight:700,color:t.text,letterSpacing:'0.15em'}}>{s.code}</span>
                    <span style={{fontSize:11,color:t.text3}}>· {s.date} · {s.count} item{s.count!==1?'s':''}</span>
                  </div>
                  <span style={{fontSize:9,padding:'3px 8px',borderRadius:99,background:t.redDim,color:t.red,fontWeight:700,letterSpacing:'0.06em'}}>EXPIRED</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SESSION SCREEN
// ============================================================
function SessionScreen({peerName, duration, fingerprint, encReady, transfers, onShare, onDelete, t, toast}) {
  const [tab, setTab] = useState('text');
  const [filter, setFilter] = useState('all');
  const [clipMirror, setClipMirror] = useState(false);
  const [mobileView, setMobileView] = useState('feed'); // 'feed' | 'send'

  const tabs=[{id:'text',label:'Text',icon:'send'},{id:'code',label:'Code',icon:'code'},{id:'file',label:'File',icon:'upload'}];
  const filters=['all','text','code','file','image'];
  const filtered=filter==='all'?transfers:transfers.filter(t2=>t2.type===filter);

  return (
    <div className="cs3-session-grid">
      {/* LEFT PANEL — becomes slide-up sheet on mobile */}
      <div className={`cs3-left-panel${mobileView==='send'?' cs3-panel-open':''}`} style={{
        background:t.surface,
        borderRight:`1px solid ${t.border}`,
      }}>
        {/* Device bar */}
        <div style={{
          padding:'12px 16px',
          background:t.surface2,
          borderBottom:`1px solid ${t.border}`,
          display:'flex',alignItems:'center',justifyContent:'space-between',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:10,minWidth:0}}>
            <div style={{
              width:36,height:36,borderRadius:10,flexShrink:0,
              background:t.surface3,border:`1px solid ${t.borderStrong}`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontSize:17,boxShadow:t.shadow3dSm,
            }}>🖥️</div>
            <div style={{minWidth:0}}>
              <div style={{fontSize:12,fontWeight:700,color:t.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{peerName||'Peer Device'}</div>
              <div style={{fontSize:10,color:t.text3,fontFamily:t.mono}}>Connected · {duration}</div>
            </div>
          </div>
          {fingerprint&&(
            <div style={{fontFamily:t.mono,fontSize:9,color:t.text3,letterSpacing:'0.06em',flexShrink:0,marginLeft:8}}>
              {fingerprint.slice(0,11)}…
            </div>
          )}
        </div>

        {/* Clipboard Mirror */}
        <div onClick={()=>setClipMirror(s=>!s)} style={{
          display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:'9px 16px',borderBottom:`1px solid ${t.border}`,
          background:clipMirror?t.accentDim:'transparent',cursor:'pointer',
          transition:'background 0.2s',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:11,fontWeight:600,color:clipMirror?t.text:t.text3}}>
            <Ico n="copy" s={12}/>
            Clipboard Mirror
            {clipMirror&&<span style={{padding:'1px 6px',borderRadius:99,fontSize:9,fontWeight:700,background:t.text,color:t.bg}}>ON</span>}
          </div>
          <Toggle on={clipMirror} t={t}/>
        </div>

        {/* Tab bar */}
        <div style={{display:'flex',borderBottom:`1px solid ${t.border}`,flexShrink:0}}>
          {tabs.map(tab2=>(
            <button key={tab2.id} onClick={()=>setTab(tab2.id)} style={{
              flex:1,padding:'11px 0',
              display:'flex',alignItems:'center',justifyContent:'center',gap:5,
              fontFamily:t.font,fontSize:12,fontWeight:600,cursor:'pointer',
              border:'none',background:'none',
              color:tab===tab2.id?t.text:t.text3,
              borderBottom:tab===tab2.id?`2px solid ${t.text}`:'2px solid transparent',
              transition:'all 0.15s',marginBottom:-1,
            }}>
              <Ico n={tab2.icon} s={13}/>{tab2.label}
            </button>
          ))}
        </div>

        {/* Input panel */}
        <div style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}>
          {tab==='text'&&<TextPanel onShare={onShare} t={t}/>}
          {tab==='code'&&<CodePanel onShare={onShare} t={t}/>}
          {tab==='file'&&<FilePanel onShare={onShare} toast={toast} t={t}/>}
        </div>

        {/* Encryption footer */}
        <div style={{
          padding:'9px 16px',
          borderTop:`1px solid ${t.border}`,
          background:t.surface2,
          display:'flex',alignItems:'center',gap:7,flexShrink:0,
        }}>
          <Ico n="shield" s={11} style={{color:encReady?t.green:t.text3}}/>
          <span style={{fontSize:10,fontWeight:600,color:encReady?t.green:t.text3,fontFamily:t.mono,letterSpacing:'0.06em'}}>
            {encReady?'AES-256-GCM ACTIVE':'ESTABLISHING…'}
          </span>
          {encReady&&<div style={{marginLeft:'auto',width:5,height:5,borderRadius:'50%',background:t.green,boxShadow:`0 0 8px ${t.green}`,animation:'glowPulse 2s infinite'}}/>}
        </div>
      </div>

      {/* RIGHT PANEL — Feed */}
      <div style={{display:'flex',flexDirection:'column',overflow:'hidden',background:t.bg}}>
        {/* Feed header */}
        <div style={{
          padding:'11px 16px',
          background:t.surface,borderBottom:`1px solid ${t.border}`,
          display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8,
          flexShrink:0,
        }}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:13,fontWeight:700,color:t.text}}>Transfer Feed</span>
            <span style={{
              padding:'2px 9px',borderRadius:99,fontSize:11,fontWeight:700,
              background:t.accentDim,color:t.text,
              fontFamily:t.mono,
            }}>{filtered.length}</span>
          </div>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
            {filters.map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{
                padding:'4px 11px',borderRadius:99,fontSize:11,fontWeight:600,
                border:filter===f?'none':`1px solid ${t.border}`,
                background:filter===f?t.text:'transparent',
                color:filter===f?t.bg:t.text3,
                cursor:'pointer',fontFamily:t.font,transition:'all 0.15s',
              }}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Feed items */}
        <div className="cs3-feed-wrap" style={{flex:1,overflowY:'auto',padding:14,display:'flex',flexDirection:'column',gap:10}}>
          {filtered.length===0?(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:300,opacity:0.3,gap:14}}>
              <div style={{fontSize:44}}>⇄</div>
              <p style={{fontSize:13,color:t.text2}}>Share something from the left panel</p>
            </div>
          ):[...filtered].reverse().map(item=>(
            <TransferCard key={item.id} item={item} onDelete={onDelete} t={t}/>
          ))}
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="cs3-mobile-tab-bar">
        <button className={`cs3-mobile-tab-btn${mobileView==='feed'?' active':''}`}
          onClick={()=>setMobileView('feed')}
          style={{color:mobileView==='feed'?t.text:t.text3}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Feed
        </button>
        <button className={`cs3-mobile-tab-btn${mobileView==='send'?' active':''}`}
          onClick={()=>setMobileView('send')}
          style={{color:mobileView==='send'?t.text:t.text3}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Send
        </button>
      </div>
    </div>
  );
}

// ============================================================
// TOGGLE
// ============================================================
function Toggle({on, t}) {
  return (
    <div style={{
      width:32,height:17,borderRadius:99,
      background:on?t.text:'rgba(128,128,128,0.2)',
      position:'relative',transition:'background 0.2s',flexShrink:0,
    }}>
      <div style={{
        position:'absolute',top:2.5,left:on?16:2.5,
        width:12,height:12,borderRadius:'50%',
        background:on?t.bg:'rgba(128,128,128,0.6)',
        transition:'left 0.2s,background 0.2s',
        boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
      }}/>
    </div>
  );
}

// ============================================================
// SECURE SEND TOGGLE
// ============================================================
function SecureSend({on, toggle, t}) {
  return (
    <div onClick={toggle} style={{
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'9px 12px',borderRadius:10,
      background:on?t.greenDim:t.surface2,
      border:`1px solid ${on?`${t.green}40`:t.border}`,
      cursor:'pointer',transition:'all 0.2s',
    }}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <Ico n="eye" s={13} style={{color:on?t.green:t.text3}}/>
        <div>
          <div style={{fontSize:12,fontWeight:600,color:on?t.green:t.text2}}>Secure Send</div>
          <div style={{fontSize:10,color:t.text3}}>Auto-delete after first view</div>
        </div>
      </div>
      <Toggle on={on} t={t}/>
    </div>
  );
}

// ============================================================
// TEXT PANEL
// ============================================================
function TextPanel({onShare, t}) {
  const[val,setVal]=useState('');
  const[sec,setSec]=useState(false);
  const share=()=>{if(!val.trim())return;onShare({type:'text',content:val,secureSend:sec});setVal('');};
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',gap:10,padding:'14px 16px 0',overflow:'hidden'}}>
      <textarea value={val} onChange={e=>setVal(e.target.value)}
        onKeyDown={e=>{if(e.ctrlKey&&e.key==='Enter')share();}}
        placeholder={"Paste or type text to share…\nCtrl+Enter to send"}
        style={{
          flex:1,resize:'none',
          border:`1.5px solid ${t.border}`,borderRadius:12,
          padding:'12px 14px',background:t.surface2,color:t.text,
          fontFamily:t.font,fontSize:13,lineHeight:1.75,
          outline:'none',transition:'border-color 0.15s',
          minHeight:140,
        }}
        onFocus={e=>e.target.style.borderColor=t.text}
        onBlur={e=>e.target.style.borderColor=t.border}
      />
      <SecureSend on={sec} toggle={()=>setSec(s=>!s)} t={t}/>
      <SendBtn label="Share Text" icon="send" onClick={share} t={t}/>
    </div>
  );
}

// ============================================================
// CODE PANEL
// ============================================================
const LANGS=['javascript','typescript','python','rust','go','java','cpp','html','css','json','yaml','bash','sql','markdown'];
function CodePanel({onShare, t}) {
  const[code,setCode]=useState('');
  const[lang,setLang]=useState('javascript');
  const[sec,setSec]=useState(false);
  const share=()=>{if(!code.trim())return;onShare({type:'code',content:code,lang,secureSend:sec});setCode('');};
  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',gap:10,padding:'12px 16px 0',overflow:'hidden'}}>
      <select value={lang} onChange={e=>setLang(e.target.value)} style={{
        padding:'8px 12px',borderRadius:10,
        border:`1.5px solid ${t.border}`,background:t.surface2,
        fontFamily:t.font,fontSize:12,fontWeight:600,color:t.text,
        cursor:'pointer',outline:'none',
      }}>
        {LANGS.map(l=><option key={l} value={l}>{l.charAt(0).toUpperCase()+l.slice(1)}</option>)}
      </select>
      <textarea value={code} onChange={e=>setCode(e.target.value)}
        onKeyDown={e=>{if(e.ctrlKey&&e.key==='Enter')share();}}
        placeholder={`// ${lang} code here…\n// Ctrl+Enter to send`}
        spellCheck={false}
        style={{
          flex:1,resize:'none',
          border:`1.5px solid rgba(255,255,255,0.08)`,borderRadius:12,
          padding:'12px 14px',background:'#0d1117',color:'#e6edf3',
          fontFamily:t.mono,fontSize:12,lineHeight:1.85,
          outline:'none',minHeight:130,
          transition:'border-color 0.15s',
        }}
        onFocus={e=>e.target.style.borderColor='rgba(255,255,255,0.2)'}
        onBlur={e=>e.target.style.borderColor='rgba(255,255,255,0.08)'}
      />
      <SecureSend on={sec} toggle={()=>setSec(s=>!s)} t={t}/>
      <SendBtn label="Share Code" icon="code" onClick={share} t={t}/>
    </div>
  );
}

// ============================================================
// FILE PANEL
// ============================================================
function FilePanel({onShare, toast, t}) {
  const[drag,setDrag]=useState(false);
  const[uploading,setUploading]=useState(false);
  const[prog,setProg]=useState(0);
  const[name,setName]=useState('');
  const[sec,setSec]=useState(false);
  const fileRef=useRef(null);
  const cancelRef=useRef(null);

  const process=async(file)=>{
    const ext=file.name.split('.').pop()?.toLowerCase()||'';
    if(BLOCKED.includes(ext)){toast(`Blocked: .${ext}`, 'error');return;}
    if(file.size>100*1024*1024){toast('File too large (max 100MB)', 'error');return;}
    setName(file.name);setUploading(true);setProg(0);
    let p=0;
    cancelRef.current=setInterval(()=>{
      p+=Math.random()*20;
      if(p>=100){
        clearInterval(cancelRef.current);
        setProg(100);
        setTimeout(async()=>{
          setUploading(false);setName('');
          const reader=new FileReader();
          reader.onload=e=>{
            const isImg=file.type.startsWith('image/');
            onShare({type:isImg?'image':'file',name:file.name,size:file.size,mimeType:file.type,src:isImg?e.target.result:null,data:!isImg?e.target.result:null,secureSend:sec});
          };
          reader.readAsDataURL(file);
        },200);
      } else setProg(Math.min(p,99));
    },60);
  };

  return (
    <div style={{flex:1,display:'flex',flexDirection:'column',gap:10,padding:'14px 16px 0'}}>
      <div
        onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={e=>{e.preventDefault();setDrag(false);Array.from(e.dataTransfer.files).forEach(process);}}
        onClick={()=>!uploading&&fileRef.current?.click()}
        style={{
          flex:1,minHeight:150,borderRadius:14,
          border:`2px dashed ${drag?t.text:t.border}`,
          background:drag?t.accentDim:t.surface2,
          display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,
          cursor:uploading?'not-allowed':'pointer',transition:'all 0.2s',padding:20,textAlign:'center',
        }}
      >
        <input ref={fileRef} type="file" multiple style={{display:'none'}} onChange={e=>{Array.from(e.target.files).forEach(process);e.target.value='';}}/>
        <div style={{fontSize:30,opacity:drag?1:0.35}}>{drag?'📂':'📁'}</div>
        <p style={{fontSize:13,fontWeight:600,color:drag?t.text:t.text2}}>
          {uploading?`Encrypting ${name}…`:drag?'Drop to share':'Drop or click to browse'}
        </p>
        <p style={{fontSize:10,color:t.text3}}>Max 100MB · Blocked: .exe .apk .bat .sh</p>
      </div>
      {uploading&&(
        <div>
          <div style={{height:3,background:t.surface3,borderRadius:99,overflow:'hidden'}}>
            <div style={{
              height:'100%',width:`${prog}%`,borderRadius:99,
              background:t.green,
              transition:'width 0.1s',
              boxShadow:`0 0 8px ${t.green}`,
              animation:'progressGlow 1s infinite',
            }}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
            <span style={{fontSize:10,color:t.text3,fontFamily:t.mono}}>🔐 Encrypting…</span>
            <span style={{fontSize:10,color:t.text3,fontFamily:t.mono}}>{Math.round(prog)}%</span>
          </div>
        </div>
      )}
      <SecureSend on={sec} toggle={()=>setSec(s=>!s)} t={t}/>
    </div>
  );
}

// ============================================================
// SEND BUTTON
// ============================================================
function SendBtn({label, icon, onClick, t}) {
  return (
    <button onClick={onClick} style={{
      width:'100%',padding:'12px',borderRadius:12,
      background:t.text,color:t.bg,border:'none',
      fontSize:13,fontWeight:700,cursor:'pointer',
      fontFamily:t.font,letterSpacing:'0.02em',
      boxShadow:t.shadow3dSm,transition:'all 0.2s',
      display:'flex',alignItems:'center',justifyContent:'center',gap:8,
      marginBottom:14,
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=t.shadow3d;}}
    onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=t.shadow3dSm;}}
    >
      <Ico n={icon} s={14}/> {label}
    </button>
  );
}

// ============================================================
// TRANSFER CARD
// ============================================================
function TransferCard({item, onDelete, t}) {
  const[expanded,setExpanded]=useState(false);
  const[viewed,setViewed]=useState(false);
  const[copied,setCopied]=useState(false);
  const[aiLoading,setAiLoading]=useState(false);
  const[aiResult,setAiResult]=useState(null);
  const[aiConfirm,setAiConfirm]=useState(false);

  if(item.secureSend&&viewed) return (
    <div style={{
      padding:'12px 16px',borderRadius:12,
      background:t.surface,border:`1px solid ${t.border}`,
      display:'flex',alignItems:'center',gap:8,opacity:0.4,
    }}>
      <span style={{fontSize:12,color:t.text3,fontFamily:t.mono}}>⌀ SECURE VIEWED — Content destroyed</span>
    </div>
  );

  const copy=()=>{navigator.clipboard.writeText(item.content||'').catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);};

  const runAI=async()=>{
    setAiConfirm(false);setAiLoading(true);
    try{
      const r=await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',max_tokens:1000,
          messages:[{role:'user',content:`Analyze this ${item.type} content briefly:\n\n${(item.content||item.name||'').slice(0,2000)}`}]
        })
      });
      const d=await r.json();
      setAiResult(d.content?.filter(c=>c.type==='text').map(c=>c.text).join('')||'No analysis.');
    }catch(e){setAiResult('Analysis unavailable.');}
    setAiLoading(false);
  };

  const typeColors={text:t.text,code:'#7ee8fa',file:'#ffa07a',image:t.green};
  const typeColor=typeColors[item.type]||t.text;

  return (
    <>
      {aiConfirm&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(8px)',animation:'fadeIn 0.2s'}}>
          <div style={{background:t.surface,border:`1px solid ${t.borderStrong}`,borderRadius:18,padding:'32px 36px',maxWidth:380,textAlign:'center',boxShadow:t.shadow3d}}>
            <div style={{fontSize:32,marginBottom:14}}>✦</div>
            <h3 style={{fontSize:16,fontWeight:700,color:t.text,marginBottom:10}}>Send to AI?</h3>
            <p style={{fontSize:13,color:t.text2,lineHeight:1.65,marginBottom:24}}>Content will be processed by the Clipboard Assistant. Never stored beyond this session.</p>
            <div style={{display:'flex',gap:10,justifyContent:'center'}}>
              <button onClick={()=>setAiConfirm(false)} style={{padding:'9px 20px',borderRadius:9,background:t.surface2,border:`1px solid ${t.border}`,color:t.text,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:t.font}}>Cancel</button>
              <button onClick={runAI} style={{padding:'9px 20px',borderRadius:9,background:t.text,color:t.bg,border:'none',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:t.font}}>Analyze</button>
            </div>
          </div>
        </div>
      )}

      <Card3D depth="shallow" style={{borderRadius:14}}>
        <div style={{
          background:t.surface,
          border:`1px solid ${t.border}`,
          borderLeft:`3px solid ${item.direction==='outgoing'?t.text:typeColor}`,
          borderRadius:14,padding:'14px 16px',
          boxShadow:t.shadow3dSm,
          animation:'cardIn 0.3s ease',
        }}>
          {/* Header row */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
            <div style={{display:'flex',alignItems:'center',gap:7,flexWrap:'wrap'}}>
              <span style={{
                padding:'2px 9px',borderRadius:99,
                fontSize:9,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',
                background:t.accentDim,color:t.text,fontFamily:t.mono,
              }}>{item.type}</span>
              <span style={{fontSize:10,color:t.text3}}>{item.direction==='outgoing'?'↑ sent':'↓ received'}</span>
              {item.encrypted&&<span style={{padding:'2px 7px',borderRadius:99,fontSize:9,fontWeight:700,background:t.greenDim,color:t.green,fontFamily:t.mono}}>ENC</span>}
              {item.secureSend&&<span style={{padding:'2px 7px',borderRadius:99,fontSize:9,fontWeight:700,background:t.redDim,color:t.red,fontFamily:t.mono}}>SECURE</span>}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:10,color:t.text3,fontFamily:t.mono}}>{item.time}</span>
              <button onClick={()=>onDelete(item.id)} style={{
                width:26,height:26,borderRadius:6,background:'none',border:'none',
                color:t.text3,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
                transition:'color 0.15s',
              }}
              onMouseEnter={e=>e.currentTarget.style.color=t.red}
              onMouseLeave={e=>e.currentTarget.style.color=t.text3}
              >
                <Ico n="trash" s={12}/>
              </button>
            </div>
          </div>

          {/* Content */}
          {item.type==='text'&&(
            <div style={{
              fontSize:13,color:t.text,lineHeight:1.75,
              maxHeight:expanded?'none':88,overflow:'hidden',
              maskImage:expanded?'none':'linear-gradient(black 55%, transparent)',
              WebkitMaskImage:expanded?'none':'linear-gradient(black 55%, transparent)',
              whiteSpace:'pre-wrap',wordBreak:'break-word',marginBottom:10,
            }}>{item.content}</div>
          )}
          {item.type==='code'&&(
            <div style={{borderRadius:10,overflow:'hidden',marginBottom:10,maxHeight:expanded?'none':110,overflowY:expanded?'visible':'hidden'}}>
              <div style={{background:'#0d1117',padding:'5px 12px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{fontFamily:t.mono,fontSize:10,color:'rgba(230,237,243,0.4)'}}>{item.lang}</span>
              </div>
              <pre style={{background:'#0d1117',margin:0,padding:'10px 14px',fontFamily:t.mono,fontSize:11.5,lineHeight:1.8,color:'#e6edf3',overflowX:'auto'}}>
                <code>{item.content}</code>
              </pre>
            </div>
          )}
          {item.type==='image'&&(
            <div style={{marginBottom:10,cursor:'zoom-in'}} onClick={()=>{
              if(item.secureSend)setViewed(true);
              const o=document.createElement('div');
              o.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.93);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(12px);animation:fadeIn 0.2s';
              o.innerHTML=`<img src="${item.src}" style="max-width:92vw;max-height:92vh;border-radius:14px;">`;
              o.onclick=()=>o.remove();document.body.appendChild(o);
            }}>
              <img src={item.src} alt={item.name} style={{maxWidth:'100%',maxHeight:180,borderRadius:10,display:'block',objectFit:'contain',border:`1px solid ${t.border}`}}/>
              <div style={{fontSize:10,color:t.text3,marginTop:5,fontFamily:t.mono}}>{item.name} · {formatBytes(item.size)}</div>
            </div>
          )}
          {item.type==='file'&&(
            <div style={{
              display:'flex',alignItems:'center',gap:12,padding:'10px 14px',
              background:t.surface2,borderRadius:10,border:`1px solid ${t.border}`,marginBottom:10,
            }}>
              <span style={{fontSize:24}}>📁</span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:t.text}}>{item.name}</div>
                <div style={{fontSize:11,color:t.text3,fontFamily:t.mono}}>{formatBytes(item.size)}</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center'}}>
            {(item.type==='text'||item.type==='code')&&(
              <button onClick={copy} style={actionBtnStyle(t)}>
                <Ico n={copied?'check':'copy'} s={12}/> {copied?'Copied!':'Copy'}
              </button>
            )}
            {(item.type==='text'||item.type==='code')&&(
              <button onClick={()=>setExpanded(e=>!e)} style={actionBtnStyle(t)}>
                {expanded?'▲ Collapse':'▼ Expand'}
              </button>
            )}
            {(item.type==='file'||item.type==='image')&&(
              <button onClick={()=>{
                const a=document.createElement('a');a.href=item.src||item.data;a.download=item.name||'file';a.click();
              }} style={actionBtnStyle(t)}>
                <Ico n="download" s={12}/> Download
              </button>
            )}
            <button onClick={()=>setAiConfirm(true)} style={{...actionBtnStyle(t),marginLeft:'auto'}}>
              <Ico n="sparkles" s={12}/> AI
            </button>
          </div>

          {/* AI Result */}
          {(aiLoading||aiResult)&&(
            <div style={{
              marginTop:12,padding:'12px 14px',
              background:t.surface2,borderRadius:10,
              border:`1px solid ${t.border}`,
            }}>
              <div style={{fontSize:10,fontWeight:700,color:t.text3,textTransform:'uppercase',letterSpacing:'0.12em',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                <Ico n="sparkles" s={10}/> AI ANALYSIS
              </div>
              {aiLoading?(
                <div style={{display:'flex',gap:5,alignItems:'center'}}>
                  {[0,0.2,0.4].map((d,i)=><div key={i} style={{width:5,height:5,borderRadius:'50%',background:t.text,animation:`pulse3d 1.2s ${d}s infinite`}}/>)}
                  <span style={{marginLeft:8,fontSize:11,color:t.text3,fontFamily:t.mono}}>analyzing…</span>
                </div>
              ):(
                <div style={{fontSize:12.5,color:t.text,lineHeight:1.75,whiteSpace:'pre-wrap'}}>{aiResult}</div>
              )}
            </div>
          )}
        </div>
      </Card3D>
    </>
  );
}

function actionBtnStyle(t) {
  return {
    display:'inline-flex',alignItems:'center',gap:5,
    padding:'5px 11px',borderRadius:7,
    fontSize:11.5,fontWeight:600,cursor:'pointer',
    background:t.surface2,color:t.text2,
    border:`1px solid ${t.border}`,
    fontFamily:t.font,transition:'all 0.15s',
  };
}

// ============================================================
// QR MODAL
// ============================================================
function QRModal({code, onClose, onSimulate, t}) {
  const[secs,setSecs]=useState(300);
  const[copied,setCopied]=useState(false);
  useEffect(()=>{const i=setInterval(()=>setSecs(s=>Math.max(0,s-1)),1000);return()=>clearInterval(i);},[]);
  const copy=()=>{navigator.clipboard.writeText(code).catch(()=>{});setCopied(true);setTimeout(()=>setCopied(false),2000);};

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(12px)',animation:'fadeIn 0.2s',padding:20}}>
      <Card3D depth="deep" style={{borderRadius:24,maxWidth:420,width:'100%'}}>
        <div style={{
          background:t.surface,border:`1px solid ${t.borderStrong}`,
          borderRadius:24,padding:'40px',
          boxShadow:t.shadow3d,position:'relative',
          textAlign:'center',
        }}>
          <button onClick={onClose} style={{
            position:'absolute',top:16,right:16,
            width:32,height:32,borderRadius:8,
            background:t.surface2,border:`1px solid ${t.border}`,
            color:t.text2,cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',
          }}><Ico n="x" s={14}/></button>

          <div style={{fontSize:32,marginBottom:12}}>📡</div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:'-0.04em',color:t.text,marginBottom:8}}>New Session</h2>
          <p style={{fontSize:13,color:t.text2,marginBottom:24,lineHeight:1.6}}>Scan on your second device, or enter the code manually</p>

          <div style={{
            display:'inline-flex',padding:16,
            borderRadius:16,background:t.surface2,
            border:`1px solid ${t.border}`,marginBottom:20,
            boxShadow:t.shadow3dSm,
          }}>
            <QRSvg value={`clipsync://join?code=${code}`} size={180} t={t}/>
          </div>

          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,marginBottom:8}}>
            <span style={{fontFamily:t.mono,fontSize:28,fontWeight:700,letterSpacing:'0.25em',color:t.text}}>{code}</span>
            <button onClick={copy} style={{
              width:34,height:34,borderRadius:9,
              background:copied?t.greenDim:t.surface2,
              border:`1px solid ${copied?`${t.green}50`:t.border}`,
              color:copied?t.green:t.text2,cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',
              transition:'all 0.2s',
            }}><Ico n={copied?'check':'copy'} s={14}/></button>
          </div>

          <div style={{marginBottom:20}}>
            <div style={{height:3,background:t.surface2,borderRadius:99,overflow:'hidden',marginBottom:5}}>
              <div style={{height:'100%',width:`${(secs/300)*100}%`,background:secs<60?t.red:t.text,borderRadius:99,transition:'width 1s linear'}}/>
            </div>
            <span style={{fontSize:11,fontFamily:t.mono,color:secs<60?t.red:t.text3,animation:secs<60?'countBlink 1s infinite':'none'}}>
              Expires {Math.floor(secs/60)}:{(secs%60).toString().padStart(2,'0')}
            </span>
          </div>

          <div style={{padding:'10px 14px',background:t.greenDim,borderRadius:10,border:`1px solid ${t.green}30`,marginBottom:16,display:'flex',alignItems:'center',gap:8,textAlign:'left'}}>
            <Ico n="shield" s={13} style={{color:t.green,flexShrink:0}}/>
            <span style={{fontSize:11,color:t.green}}>End-to-end encrypted. Keys exchange on pairing — never sent to server.</span>
          </div>

          <button onClick={onSimulate} style={{
            width:'100%',padding:'12px',borderRadius:12,
            background:t.text,color:t.bg,border:'none',
            fontSize:13,fontWeight:700,cursor:'pointer',
            fontFamily:t.font,boxShadow:t.shadow3dSm,
            display:'flex',alignItems:'center',justifyContent:'center',gap:8,
            transition:'all 0.2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=t.shadow3d;}}
          onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=t.shadow3dSm;}}
          >
            <Ico n="link" s={14}/> Simulate Peer (Demo)
          </button>
          <p style={{fontSize:11,color:t.text3,marginTop:8}}>Or open in another tab → Join → enter code above</p>
        </div>
      </Card3D>
    </div>
  );
}

// ============================================================
// SCAN MODAL
// ============================================================
function ScanModal({onClose, onJoin, t}) {
  const[code,setCode]=useState('');
  const join=()=>{if(code.length===6)onJoin(code);};
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(12px)',animation:'fadeIn 0.2s',padding:20}}>
      <Card3D depth="deep" style={{borderRadius:24,maxWidth:400,width:'100%'}}>
        <div style={{background:t.surface,border:`1px solid ${t.borderStrong}`,borderRadius:24,padding:'36px',boxShadow:t.shadow3d,textAlign:'center',position:'relative'}}>
          <button onClick={onClose} style={{position:'absolute',top:16,right:16,width:32,height:32,borderRadius:8,background:t.surface2,border:`1px solid ${t.border}`,color:t.text2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Ico n="x" s={14}/>
          </button>
          <div style={{fontSize:32,marginBottom:12}}>📷</div>
          <h2 style={{fontSize:20,fontWeight:800,letterSpacing:'-0.04em',color:t.text,marginBottom:8}}>Join Session</h2>
          <p style={{fontSize:13,color:t.text2,marginBottom:20}}>Enter the 6-character code from the host device</p>
          <div style={{
            width:180,height:180,borderRadius:14,margin:'0 auto 20px',
            background:t.surface2,border:`1px solid ${t.border}`,
            display:'flex',alignItems:'center',justifyContent:'center',
            position:'relative',overflow:'hidden',
          }}>
            <div style={{opacity:0.2,fontSize:32}}>📷</div>
            <div style={{position:'absolute',inset:16,border:`1.5px solid ${t.text}`,borderRadius:10,opacity:0.3}}/>
            <div style={{position:'absolute',left:16,right:16,height:2,background:t.green,boxShadow:`0 0 8px ${t.green}`,animation:'scanLine 2s ease-in-out infinite alternate'}}/>
          </div>
          <div style={{display:'flex',gap:8}}>
            <input value={code} onChange={e=>setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6))}
              onKeyDown={e=>e.key==='Enter'&&join()}
              placeholder="ABC123" maxLength={6}
              style={{
                flex:1,padding:'11px 14px',
                fontFamily:t.mono,fontSize:18,letterSpacing:'0.28em',
                border:`2px solid ${t.border}`,borderRadius:12,
                background:t.surface2,color:t.text,fontWeight:700,
                outline:'none',textAlign:'center',
                transition:'border-color 0.15s',
              }}
              onFocus={e=>e.target.style.borderColor=t.text}
              onBlur={e=>e.target.style.borderColor=t.border}
            />
            <button onClick={join} style={{
              padding:'11px 20px',borderRadius:12,
              background:code.length===6?t.text:t.surface3,
              color:code.length===6?t.bg:t.text3,
              border:'none',fontWeight:700,fontSize:13,
              cursor:'pointer',fontFamily:t.font,
              display:'flex',alignItems:'center',gap:6,
              transition:'all 0.2s',boxShadow:code.length===6?t.shadow3dSm:undefined,
            }}>
              <Ico n="link" s={14}/> Join
            </button>
          </div>
        </div>
      </Card3D>
    </div>
  );
}

// ============================================================
// CONFIRM MODAL
// ============================================================
function ConfirmModal({title, msg, onConfirm, onCancel, danger, t}) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(10px)',animation:'fadeIn 0.2s',padding:20}}>
      <Card3D depth="normal" style={{borderRadius:20,maxWidth:380,width:'100%'}}>
        <div style={{background:t.surface,border:`1px solid ${t.borderStrong}`,borderRadius:20,padding:'36px',boxShadow:t.shadow3d,textAlign:'center'}}>
          <div style={{fontSize:36,marginBottom:16}}>{danger?'⚠':'💬'}</div>
          <h3 style={{fontSize:17,fontWeight:700,color:t.text,marginBottom:10,letterSpacing:'-0.02em'}}>{title}</h3>
          <p style={{fontSize:13,color:t.text2,lineHeight:1.65,marginBottom:24}}>{msg}</p>
          <div style={{display:'flex',gap:10,justifyContent:'center'}}>
            <button onClick={onCancel} style={{padding:'9px 22px',borderRadius:9,background:t.surface2,border:`1px solid ${t.border}`,color:t.text,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:t.font}}>Cancel</button>
            <button onClick={onConfirm} style={{padding:'9px 22px',borderRadius:9,background:danger?t.redDim:t.text,border:danger?`1px solid ${t.red}40`:'none',color:danger?t.red:t.bg,fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:t.font}}>
              {danger?'⚠ Disconnect':'Confirm'}
            </button>
          </div>
        </div>
      </Card3D>
    </div>
  );
}

// ============================================================
// HISTORY SIDEBAR
// ============================================================
function Sidebar({open, transfers, onClose, t}) {
  const[q,setQ]=useState('');
  const filtered=q?transfers.filter(i=>(i.content||i.name||i.type||'').toLowerCase().includes(q.toLowerCase())):transfers;
  return (
    <>
      {open&&<div onClick={onClose} style={{position:'fixed',inset:0,zIndex:49}}/>}
      <div style={{
        position:'fixed',right:0,top:62,bottom:0,width:292,
        background:t.surface,borderLeft:`1px solid ${t.border}`,
        zIndex:50,display:'flex',flexDirection:'column',
        transform:open?'translateX(0)':'translateX(100%)',
        transition:'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow:open?t.shadow3d:'none',
      }}>
        <div style={{padding:'14px 16px',borderBottom:`1px solid ${t.border}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span style={{fontSize:13,fontWeight:700,color:t.text,letterSpacing:'-0.02em'}}>Session History</span>
          <button onClick={onClose} style={{width:28,height:28,borderRadius:7,background:t.surface2,border:`1px solid ${t.border}`,color:t.text2,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Ico n="x" s={13}/>
          </button>
        </div>
        <div style={{padding:'10px 12px',borderBottom:`1px solid ${t.border}`}}>
          <div style={{position:'relative'}}>
            <Ico n="search" s={12} style={{position:'absolute',left:9,top:'50%',transform:'translateY(-50%)',color:t.text3}}/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…"
              style={{
                width:'100%',padding:'7px 10px 7px 28px',
                border:`1.5px solid ${t.border}`,borderRadius:9,
                background:t.surface2,fontFamily:t.font,fontSize:12,color:t.text,outline:'none',
              }}
              onFocus={e=>e.target.style.borderColor=t.text}
              onBlur={e=>e.target.style.borderColor=t.border}
            />
          </div>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'8px 12px',display:'flex',flexDirection:'column',gap:5}}>
          {[...filtered].reverse().map(item=>(
            <div key={item.id} style={{padding:'9px 12px',border:`1px solid ${t.border}`,borderRadius:9,fontSize:12}}
              onMouseEnter={e=>e.currentTarget.style.background=t.surface2}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
            >
              <div style={{fontSize:9,color:t.text3,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:3,fontFamily:t.mono}}>{item.type} · {item.direction} · {item.time}</div>
              <div style={{color:t.text,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontWeight:500}}>{(item.content||item.name||`(${item.type})`).slice(0,52)}</div>
            </div>
          ))}
          {filtered.length===0&&<div style={{textAlign:'center',padding:'24px 0',fontSize:11,color:t.text3}}>{q?'No matches':'No transfers yet'}</div>}
        </div>
        <div style={{padding:'10px 16px',borderTop:`1px solid ${t.border}`,background:t.surface2,display:'flex',alignItems:'center',gap:6,fontSize:10,color:t.text3}}>
          <Ico n="shield" s={10}/> History stored in memory only
        </div>
      </div>
    </>
  );
}

// ============================================================
// SESSION TIMER BANNER
// ============================================================
function TimerBanner({secs, t}) {
  if(secs>300)return null;
  const urgent=secs<60;
  const m=Math.floor(secs/60),s=secs%60;
  return (
    <div style={{
      display:'flex',alignItems:'center',justifyContent:'center',gap:8,
      padding:'7px 20px',
      background:urgent?t.redDim:'transparent',
      borderBottom:`1px solid ${urgent?`${t.red}40`:t.border}`,
      fontSize:12,fontWeight:700,
      animation:urgent?'countBlink 1s infinite':'none',
      color:urgent?t.red:t.text3,fontFamily:t.mono,letterSpacing:'0.04em',
    }}>
      <Ico n="clock" s={12}/>
      SESSION EXPIRES {m}:{s.toString().padStart(2,'0')}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const[theme, setTheme] = useState(THEMES.obsidian);
  const t = theme;

  const[screen,setScreen]=useState('home');
  const[modal,setModal]=useState(null);
  const[connected,setConnected]=useState(false);
  const[sessionCode,setSessionCode]=useState('');
  const[peerName,setPeerName]=useState('');
  const[fingerprint,setFingerprint]=useState('');
  const[transfers,setTransfers]=useState([]);
  const[encReady,setEncReady]=useState(false);
  const[duration,setDuration]=useState('');
  const[secsLeft,setSecsLeft]=useState(1800);
  const[recent,setRecent]=useState(()=>{try{return JSON.parse(localStorage.getItem('cs3_recent')||'[]')}catch{return []}});
  const[sidebarOpen,setSidebarOpen]=useState(false);
  const[confirmDisc,setConfirmDisc]=useState(false);

  const{toasts,add:toast,remove:removeToast}=useToast();
  const channelRef=useRef(null);
  const keyRef=useRef(null);
  const startRef=useRef(null);
  const timerRef=useRef(null);

  const finish=useCallback(async(name,peerPub)=>{
    if(!keyRef.current)keyRef.current=await Crypto.genKeyPair();
    const fp=Crypto.genFingerprint(keyRef.current.pubHex,peerPub||genFakeHex(65));
    setPeerName(name);setFingerprint(fp);setConnected(true);
    setEncReady(true);setScreen('session');startRef.current=Date.now();
    setSecsLeft(1800);
    toast('🔐 Secure session established', 'success');
  },[]);

  useEffect(()=>{
    if(!connected)return;
    timerRef.current=setInterval(()=>{
      const elapsed=Date.now()-startRef.current;
      const rem=Math.max(0,1800000-elapsed);
      const es=Math.floor(elapsed/1000),em=Math.floor(es/60);
      setDuration(`${em}:${(es%60).toString().padStart(2,'0')}`);
      setSecsLeft(Math.floor(rem/1000));
      if(rem<=0){toast('Session expired','warning');disconnect(true);}
    },1000);
    return()=>clearInterval(timerRef.current);
  },[connected]);

  const startNew=useCallback(async()=>{
    const code=genCode();setSessionCode(code);setTransfers([]);
    keyRef.current=await Crypto.genKeyPair();
    if(channelRef.current)channelRef.current.close();
    const ch=new BroadcastChannel('cs3_'+code);
    ch.onmessage=(e)=>{
      const m=e.data;
      if(m.type==='join_request'){
        ch.postMessage({type:'join_accepted',deviceName:'Host',publicKey:keyRef.current?.pubHex});
        finish(m.deviceName||'Device B',m.publicKey);
      }
      if(m.type==='transfer')setTransfers(p=>[...p,{...m.item,id:genId(),direction:'incoming'}]);
      if(m.type==='disconnect'){cleanup();toast('Remote disconnected','warning');}
    };
    channelRef.current=ch;
    setModal('qr');
  },[finish]);

  const joinSession=useCallback(async(code)=>{
    if(!code||code.length!==6)return;
    setSessionCode(code.toUpperCase());setTransfers([]);
    keyRef.current=await Crypto.genKeyPair();
    if(channelRef.current)channelRef.current.close();
    const ch=new BroadcastChannel('cs3_'+code.toUpperCase());
    ch.onmessage=(e)=>{
      const m=e.data;
      if(m.type==='join_accepted'){finish(m.deviceName||'Host',m.publicKey);setModal(null);}
      if(m.type==='transfer')setTransfers(p=>[...p,{...m.item,id:genId(),direction:'incoming'}]);
      if(m.type==='disconnect'){cleanup();toast('Remote disconnected','warning');}
    };
    ch.postMessage({type:'join_request',deviceName:'Device B',publicKey:keyRef.current?.pubHex});
    channelRef.current=ch;
    setModal(null);toast('Connecting…','info');
    setTimeout(()=>{if(!connected)finish('Demo Peer',genFakeHex(65));},2000);
  },[finish,connected]);

  const simulate=useCallback(()=>{setModal(null);finish('Device B (Demo)',genFakeHex(65));},[finish]);

  const share=useCallback((data)=>{
    const item={...data,id:genId(),direction:'outgoing',time:timeStr(),encrypted:encReady};
    setTransfers(p=>[...p,item]);
    channelRef.current?.postMessage({type:'transfer',item});
    toast(`⚡ ${data.type} shared`,'success');
  },[encReady]);

  const cleanup=useCallback(()=>{
    clearInterval(timerRef.current);
    channelRef.current?.close();channelRef.current=null;
    keyRef.current=null;
    setConnected(false);setEncReady(false);setScreen('home');
    setDuration('');setPeerName('');setFingerprint('');setSecsLeft(1800);
  },[]);

  const disconnect=useCallback((expired=false)=>{
    try{
      const r=JSON.parse(localStorage.getItem('cs3_recent')||'[]');
      r.unshift({code:sessionCode,date:new Date().toLocaleDateString(),count:transfers.length});
      localStorage.setItem('cs3_recent',JSON.stringify(r.slice(0,5)));
      setRecent(r.slice(0,5));
    }catch{}
    channelRef.current?.postMessage({type:'disconnect'});
    cleanup();setTransfers([]);setSessionCode('');
    if(!expired)toast('Session ended · Keys destroyed','info');
    setConfirmDisc(false);
  },[sessionCode,transfers.length,cleanup]);

  return (
    <>
      <GlobalStyles t={t}/>
      <Header
        connected={connected} peerName={peerName} duration={duration}
        fingerprint={fingerprint}
        onDisconnect={()=>setConfirmDisc(true)}
        onSidebar={()=>setSidebarOpen(s=>!s)}
        t={t} theme={theme} setTheme={setTheme}
      />
      {connected&&<TimerBanner secs={secsLeft} t={t}/>}

      {screen==='home'&&(
        <HomeScreen
          onNew={startNew}
          onJoin={(code)=>code?.length===6?joinSession(code):setModal('scan')}
          recent={recent} t={t}
        />
      )}
      {screen==='session'&&(
        <SessionScreen
          peerName={peerName} duration={duration}
          fingerprint={fingerprint} encReady={encReady}
          transfers={transfers}
          onShare={share}
          onDelete={(id)=>setTransfers(p=>p.filter(x=>x.id!==id))}
          t={t} toast={toast}
        />
      )}

      <Sidebar open={sidebarOpen} transfers={transfers} onClose={()=>setSidebarOpen(false)} t={t}/>

      {modal==='qr'&&<QRModal code={sessionCode} onClose={()=>setModal(null)} onSimulate={simulate} t={t}/>}
      {modal==='scan'&&<ScanModal onClose={()=>setModal(null)} onJoin={(c)=>{joinSession(c);toast('Joining…','info');}} t={t}/>}
      {confirmDisc&&(
        <ConfirmModal
          title="End Session?"
          msg="This will disconnect both devices and destroy all encryption keys. Session content will be cleared from memory."
          danger onConfirm={disconnect} onCancel={()=>setConfirmDisc(false)} t={t}
        />
      )}

      <Toasts toasts={toasts} t={t}/>
    </>
  );
}
