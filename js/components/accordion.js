// Hook up any <details> to animate open/close (optional enhancement)
document.addEventListener('toggle', (e)=>{
  if (e.target.tagName !== 'DETAILS') return;
  // Can add smooth height animations here if you want—kept simple for now
}, true);
