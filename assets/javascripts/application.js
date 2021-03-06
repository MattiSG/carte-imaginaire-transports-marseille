const map = L.map('map').setView(window.START_CENTER, window.START_ZOOM_LEVEL);

L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: 'Données LO <a href="https://www.data.gouv.fr/fr/organizations/ville-de-marseille/" target="_blank">Ville de Marseille</a> | <a id="download" download="carte_imaginaire.geojson">Télécharger</a>'
}).addTo(map);

L.control.scale({
  imperial: false,
  maxWidth: 300,
}).addTo(map);

const SOURCES = {
  '🏥 Équipements sociaux': 'marseille_equipements_sociaux_2018.csv',
  '🏛 Bâtiments institutionnels': 'marseille_batiments_institutionnels_2018.csv',
  '🏊‍♀️ Bases nautiques': 'marseille_bases_nautiques_plages_2018_vsohc0e.csv',
  '🌳 Parcs et jardins': 'marseille_parcs_jardins_2018.csv',
  '🏟 Équipements sportifs': 'marseille_equipements_sportifs_2018.csv',
  '👶 Crèches': 'marseille_creches_ukxm5oz.csv',
  '👦 Écoles élémentaires': 'marseille_ecoles_elementaires_2018.csv',
  '🧒 Écoles maternelles': 'marseille_ecoles_maternelles_2018.csv',
  '🏨 Résidences CROUS': 'crous-marseille.csv',
  '🎭 Lieux culturels': 'marseille_lieux_culturels_2018_jrvozrd.csv',
  '⛪️ Monuments historiques': 'marseille_monuments_historiques_2018.csv',
};

let layers = {};

Object.keys(SOURCES).forEach(sourceName => {
  const points = [];

  layers[`${sourceName} — isodistances`] = omnivore.csv(`data/${SOURCES[sourceName]}`, {
      delimiter: 'auto',
    }, L.geoJson(null, {
      pointToLayer:function(geoJsonPoint, latlng) {
        points.push(latlng);

        const linestringCircle = circleToPolygon([ latlng.lng, latlng.lat ], window.CIRCLE_RADIUS);

        return L.geoJSON(linestringCircle);  // not using L.circle to allow for geojson export as polygons rather than points
      }
    })
  );

  layers[`${sourceName} — isochrones`] = L.layerGroup().once('add', function() {
    points.map(getIsochrone)
      .forEach(promise => promise.then(geojsonLayer => geojsonLayer.addTo(this)))
  });
});

L.control.layers({}, layers, {
  collapsed: false,
}).addTo(map);


const downloadLink = document.getElementById('download');
downloadLink.addEventListener('click', e => {
  const activeLayers = L.layerGroup();

  Object.keys(layers)
    .map(id => layers[id])
    .filter(map.hasLayer.bind(map))
    .forEach(activeLayers.addLayer.bind(activeLayers));

  downloadLink.href = window.URL.createObjectURL(new Blob(
    [ JSON.stringify(activeLayers.toGeoJSON()) ],
    { type: 'application/geo+json' }
  ));
});


function getIsochrone(latlng) {
  return fetch(`https://itineraire.ign.fr/simple/1.0.0/isochrone?resource=bduni-idf-pgr&profile=pedestrian&costType=time&costValue=${window.MAX_DURATION}&direction=departure&point=${latlng.lng},${latlng.lat}&geometryFormat=geojson`)
    .then(data => data.json())
    .then(data => data.geometry)
    .then(geometry => L.geoJSON(geometry));
}
