import { getJSON, qs, el } from '../utils/dom.js';
import { buildMap } from '../components/map-favorites.js';

export async function init(){
  const [restaurants, beaches] = await Promise.all([
    getJSON('/js/data/favorites/restaurants.json'),
    getJSON('/js/data/favorites/beaches.json')
  ]);

  const all = [...restaurants, ...beaches];
  const categories = [...new Set(all.map(p=>p.category))];

  // chips
  const chipbar = qs('#fav-filters');
  const chipAll = el('button',{ className:'btn', textContent:'All' });
  chipbar.append(chipAll, ...categories.map(cat=>{
    const b = el('button',{ className:'btn-ghost', textContent:cat[0].toUpperCase()+cat.slice(1) });
    b.dataset.cat = cat;
    return b;
  }));

  const map = buildMap('map');
  let current = all;

  function renderList(items){
    const list = qs('#fav-list'); list.innerHTML = '';
    items.forEach(p=>{
      const card = el('div',{ className:'card' });
      card.innerHTML = `
        <img src="${p.photo}" alt="${p.name}" loading="lazy"/>
        <h3>${p.name}</h3>
        <p>${p.tip || ''}</p>
        <small>${p.price || ''}</small>
      `;
      list.appendChild(card);
    });
  }

  function filterBy(cat){
    current = cat ? all.filter(p=>p.category===cat) : all;
    map.update(current);
    renderList(current);
  }

  chipAll.addEventListener('click',()=>filterBy(null));
  chipbar.querySelectorAll('button[data-cat]').forEach(b=>b.addEventListener('click',()=>filterBy(b.dataset.cat)));

  map.update(current);
  renderList(current);
}
