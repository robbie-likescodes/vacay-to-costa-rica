import { qs, el, getJSON } from '../utils/dom.js';
export async function init(){
  const root = qs('#listing-cards');
  const listings = await Promise.all([
    getJSON('/js/data/listings/villa-sol.json'),
    getJSON('/js/data/listings/pacifico.json')
  ]);
  listings.forEach(L=>{
    const a = el('a',{ href:`/html/listing.html?slug=${L.slug}`, className:'card' });
    a.innerHTML = `
      <img src="${L.gallery[0]}" alt="${L.title}" loading="lazy"/>
      <h3>${L.title}</h3>
      <p>${L.summary}</p>
      <small>👤 ${L.capacity.guests} • 🛏 ${L.capacity.bedrooms} • 🛁 ${L.capacity.baths}</small>
    `;
    root.appendChild(a);
  });
}
