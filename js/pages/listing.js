import { qs, el, getJSON } from '../utils/dom.js';

function getSlug(){ return new URLSearchParams(location.search).get('slug') || 'villa-sol'; }
function section(title, html){
  const card = el('section',{ className:'card', innerHTML:`<h2>${title}</h2>${html}` });
  return card;
}

export async function init(){
  const slug = getSlug();
  const data = await getJSON(`/js/data/listings/${slug}.json`);
  const root = qs('#listing-root');

  // Title + badges
  const header = el('div',{ className:'card' });
  header.innerHTML = `
    <h1>${data.title}</h1>
    <p>${data.location}</p>
    <p>${data.badges.map(b=>`<span class="tag">${b}</span>`).join(' ')}</p>
  `;

  // Gallery
  const gallery = el('div',{ className:'card' });
  gallery.innerHTML = `
    <div class="gallery" id="gallery">
      ${data.gallery.map(src=>`<img src="${src}" alt="${data.title}" loading="lazy"/>`).join('')}
    </div>
  `;

  // Facts
  const facts = el('div',{ className:'card' });
  const c = data.capacity;
  facts.innerHTML = `
    <h2>At a Glance</h2>
    <ul class="checklist">
      <li>Guests: ${c.guests}</li><li>Bedrooms: ${c.bedrooms}</li><li>Baths: ${c.baths}</li>
      <li>Wi‑Fi: ${data.wifi || 'Yes'}</li>
    </ul>
  `;

  // Description sections
  const desc = el('div');
  desc.append(
    section('Overview', `<p>${data.description.overview}</p>`),
    section('The Space', `<p>${data.description.theSpace}</p>`),
    section('Guest Access', `<p>${data.description.guestAccess}</p>`),
    section('Neighborhood', `<p>${data.description.neighborhood}</p>`),
    section('Notes', `<p>${data.description.notes}</p>`)
  );

  // Amenities
  const am = el('section',{ className:'card' });
  am.innerHTML = `<h2>Amenities</h2>${Object.entries(data.amenities).map(([g,items])=>`
    <h3>${g}</h3><p>${items.join(' • ')}</p>
  `).join('')}`;

  root.append(header, gallery, facts, am, desc);

  // Booking CTA links
  const wa = document.getElementById('cta-whatsapp');
  const em = document.getElementById('cta-email');
  if (wa) wa.href = `https://wa.me/${data.contact.whatsapp}?text=Hi! I'm interested in ${encodeURIComponent(data.title)} (${location.href})`;
  if (em) { em.href = `mailto:${data.contact.email}?subject=${encodeURIComponent('Inquiry: '+data.title)}`; em.textContent = `Email ${data.contact.email}`; }
}
