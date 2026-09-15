import { useEffect, useRef } from 'react';
import './CursorGrid.css';

const curves = {
  linear: (t) => t,
  smooth: (t) => t * t * (3 - 2 * t),
  sharp: (t) => t * t * t,
};

export default function CursorGrid({
  cellSize = 70,
  color = '#E35722',
  radius = 140,
  falloff = 'smooth',
  holdTime = 400,
  fadeDuration = 800,
  lineWidth = 1.2,
  maxOpacity = 1,
  fillOpacity = 0,
  gridOpacity = 0,
  cellRadius = 0,
  clickPulse = true,
  pulseSpeed = 600,
  className = '',
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsRef = useRef({});
  const wakeRef = useRef(() => {});

  optionsRef.current = { cellSize, color, radius, falloff, holdTime, fadeDuration, lineWidth, maxOpacity, fillOpacity, gridOpacity, cellRadius, clickPulse, pulseSpeed };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;
    const context = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0; let height = 0; let cols = 0; let rows = 0; let offsetX = 0; let offsetY = 0;
    let alpha = new Float32Array(0); let touched = new Float64Array(0); let frame = 0; let active = false; let last = 0;
    const pulses = [];

    const resize = () => {
      const options = optionsRef.current;
      width = root.offsetWidth; height = root.offsetHeight;
      canvas.width = Math.max(1, Math.round(width * dpr)); canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / options.cellSize) + 1; rows = Math.ceil(height / options.cellSize) + 1;
      offsetX = (width - cols * options.cellSize) / 2; offsetY = (height - rows * options.cellSize) / 2;
      alpha = new Float32Array(cols * rows); touched = new Float64Array(cols * rows);
    };
    const center = (index) => [offsetX + (index % cols) * optionsRef.current.cellSize + optionsRef.current.cellSize / 2, offsetY + Math.floor(index / cols) * optionsRef.current.cellSize + optionsRef.current.cellSize / 2];
    const wake = () => { if (!active) { active = true; last = performance.now(); frame = requestAnimationFrame(draw); } };
    const energize = (x, y, boost = 1) => {
      const options = optionsRef.current; const radiusPx = Math.max(1, options.radius); const minCol = Math.max(0, Math.floor((x - radiusPx - offsetX) / options.cellSize)); const maxCol = Math.min(cols - 1, Math.floor((x + radiusPx - offsetX) / options.cellSize)); const minRow = Math.max(0, Math.floor((y - radiusPx - offsetY) / options.cellSize)); const maxRow = Math.min(rows - 1, Math.floor((y + radiusPx - offsetY) / options.cellSize)); const ease = curves[options.falloff] || curves.linear; const now = performance.now();
      for (let row = minRow; row <= maxRow; row += 1) for (let col = minCol; col <= maxCol; col += 1) { const index = row * cols + col; const [cx, cy] = center(index); const distance = Math.hypot(cx - x, cy - y); if (distance <= radiusPx) { const level = ease(1 - distance / radiusPx) * options.maxOpacity * boost; if (level > alpha[index]) alpha[index] = level; touched[index] = now; } }
    };
    function draw(now) {
      const options = optionsRef.current; const delta = Math.min(now - last, 50); last = now; context.clearRect(0, 0, width, height); const hex = options.color.replace('#', ''); const number = parseInt(hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex, 16); const red = (number >> 16) & 255; const green = (number >> 8) & 255; const blue = number & 255;
      if (options.gridOpacity > 0) { context.strokeStyle = `rgba(${red},${green},${blue},${options.gridOpacity})`; context.lineWidth = 1; context.beginPath(); for (let col = 0; col <= cols; col += 1) { const x = Math.round(offsetX + col * options.cellSize) + 0.5; context.moveTo(x, 0); context.lineTo(x, height); } for (let row = 0; row <= rows; row += 1) { const y = Math.round(offsetY + row * options.cellSize) + 0.5; context.moveTo(0, y); context.lineTo(width, y); } context.stroke(); }
      for (let pulseIndex = pulses.length - 1; pulseIndex >= 0; pulseIndex -= 1) { const pulse = pulses[pulseIndex]; const ring = ((now - pulse.time) / 1000) * options.pulseSpeed; if (ring > Math.hypot(width, height)) { pulses.splice(pulseIndex, 1); continue; } for (let index = 0; index < alpha.length; index += 1) { const [cx, cy] = center(index); if (Math.abs(Math.hypot(cx - pulse.x, cy - pulse.y) - ring) < options.cellSize / 2) { alpha[index] = options.maxOpacity; touched[index] = now; } } }
      let visible = pulses.length > 0;
      for (let index = 0; index < alpha.length; index += 1) { let level = alpha[index]; if (level <= 0) continue; if (now - touched[index] > options.holdTime) { level = Math.max(0, level - delta / Math.max(options.fadeDuration, 16)); alpha[index] = level; } if (level <= 0) continue; visible = true; const [cx, cy] = center(index); const half = options.cellSize / 2; const gradient = context.createRadialGradient(cx, cy, half * .1, cx, cy, options.cellSize); gradient.addColorStop(0, `rgba(${red},${green},${blue},${level})`); gradient.addColorStop(1, `rgba(${red},${green},${blue},0)`); context.strokeStyle = gradient; context.lineWidth = options.lineWidth; context.strokeRect(cx - half + .5, cy - half + .5, options.cellSize - 1, options.cellSize - 1); if (options.fillOpacity > 0) { context.fillStyle = `rgba(${red},${green},${blue},${level * options.fillOpacity})`; context.fillRect(cx - half + .5, cy - half + .5, options.cellSize - 1, options.cellSize - 1); } }
      if (visible) frame = requestAnimationFrame(draw); else active = false;
    }
    wakeRef.current = wake; resize(); wake(); const observer = new ResizeObserver(() => { resize(); wake(); }); observer.observe(root);
    const localPoint = (event) => { const rect = canvas.getBoundingClientRect(); return [event.clientX - rect.left, event.clientY - rect.top]; };
    const onMove = (event) => { const [x, y] = localPoint(event); energize(x, y); wake(); };
    const onDown = (event) => { if (!optionsRef.current.clickPulse) return; const [x, y] = localPoint(event); pulses.push({ x, y, time: performance.now() }); wake(); };
    root.addEventListener('pointermove', onMove); root.addEventListener('pointerdown', onDown);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerdown', onDown); };
  }, [cellSize]);

  useEffect(() => { wakeRef.current(); }, [color, gridOpacity, lineWidth, maxOpacity, fillOpacity, cellRadius]);
  return <div ref={rootRef} className={`cursor-grid ${className}`}><canvas ref={canvasRef} className="cursor-grid__canvas" /></div>;
}
