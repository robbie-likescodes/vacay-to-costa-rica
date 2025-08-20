import { qs, qsa } from './utils/dom.js';

// 1) Include partials
async function includePartials(){
  const slots = qsa('[data-include]');
  await Promise.all(slots.map(async slot=>{
    const url = slot.getAttribute('data-include');
    const html = await (await fetch(url)).text();
    slot.outerHTML = html;
  }));
}
function mobileNav(){
  const toggle = qs('.nav-toggle');
  const nav = qs('#site-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', ()=>{
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
function footerYear(){
  const y = qs('#year'); if (y) y.textContent = new Date().getFullYear();
}

(async function boot(){
  await includePartials();
  mobileNav();
  footerYear();

  // 2) Page-specific entry
  const page = document.body.dataset.page;
  if(page){
    try {
      const mod = await import(`/js/pages/${page}.js`);
      if (mod && typeof mod.init === 'function') await mod.init();
    } catch(e){ console.warn('No page module for', page, e); }
  }
})();

