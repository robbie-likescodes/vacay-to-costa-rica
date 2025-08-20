// Leaflet wrapper
export function buildMap(containerId){
  const map = L.map(containerId).setView([9.63,-84.62], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19, attribution:'© OpenStreetMap'
  }).addTo(map);

  let markers = [];
  function update(items){
    markers.forEach(m=>m.remove()); markers = [];
    items.forEach(p=>{
      const m = L.marker([p.lat, p.lng]).addTo(map);
      m.bindPopup(`<strong>${p.name}</strong><br>${p.tip || ''}<br>${p.price || ''}`);
      markers.push(m);
    });
    if(items.length){
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.2));
    }
  }
  return { update };
}
