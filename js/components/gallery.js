// Minimal lightbox-ish zoom
document.addEventListener('click',(e)=>{
  const img = e.target.closest('.gallery img'); if(!img) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;z-index:9999;cursor:zoom-out';
  const big = new Image(); big.src = img.src; big.alt = img.alt; big.style.maxWidth = '95%'; big.style.maxHeight = '95%';
  overlay.appendChild(big);
  overlay.addEventListener('click', ()=>overlay.remove());
  document.body.appendChild(overlay);
});
