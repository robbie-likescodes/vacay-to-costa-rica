export async function init(){
  const form = document.getElementById('contact-form');
  const status = document.querySelector('.form-status');
  if (!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent = 'Sending…';
    // Replace with your own endpoint if needed
    await new Promise(r=>setTimeout(r,600));
    status.textContent = 'Thanks! We’ll get back to you soon.';
    form.reset();
  });
}
