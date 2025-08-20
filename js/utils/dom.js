export function qs(sel, root=document){ return root.querySelector(sel); }
export function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }
export function el(tag, props={}){ const n=document.createElement(tag); Object.assign(n, props); return n; }
export function fmtDistance(mins){ return mins<60 ? `${mins} min` : `${Math.round(mins/60)} hr`; }
export async function getJSON(path){ const r = await fetch(path); if(!r.ok) throw new Error(`Fetch ${path} failed`); return r.json(); }
