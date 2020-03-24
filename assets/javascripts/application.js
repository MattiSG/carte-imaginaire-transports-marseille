mapboxgl.accessToken = window.ACCESS_TOKEN;

const map = new mapboxgl.Map({
  center: window.START_CENTER,
  container: 'map',
  style: 'mapbox://styles/mattisg/ck5o499g36a751iofydcb4t3l?optimize=true',  // `optimize` option doesn't download unused features and layers
  zoom: window.START_ZOOM_LEVEL,
  attributionControl: false,
}).addControl(new mapboxgl.AttributionControl({
  customAttribution: 'Données LO <a href="https://www.data.gouv.fr/fr/organizations/ville-de-marseille/" target="_blank">Ville de Marseille</a>',
}));
