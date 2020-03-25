const map = L.map('map').setView(window.START_CENTER, window.START_ZOOM_LEVEL);

L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: 'Données LO <a href="https://www.data.gouv.fr/fr/organizations/ville-de-marseille/" target="_blank">Ville de Marseille</a> | <a id="download" download="carte_imaginaire.geojson">Télécharger</a>'
}).addTo(map);

L.control.scale({
  imperial: false,
  maxWidth: 300,
}).addTo(map);

const SOURCES = {
  'Bases nautiques': 'marseille_bases_nautiques_plages_2018_vsohc0e.csv',
  'Équipements sociaux': 'marseille_equipements_sociaux_2018.csv',
  'Bâtiments institutionnels': 'marseille_batiments_institutionnels_2018.csv',
  'Équipements sportifs': 'marseille_equipements_sportifs_2018.csv',
  'Crèches': 'marseille_creches_ukxm5oz.csv',
  'Lieux culturels': 'marseille_lieux_culturels_2018_jrvozrd.csv',
  'Écoles élémentaires': 'marseille_ecoles_elementaires_2018.csv',
  'Monuments historiques': 'marseille_monuments_historiques_2018.csv',
  'Écoles maternelles': 'marseille_ecoles_maternelles_2018.csv',
  'Parcs et jardins': 'marseille_parcs_jardins_2018.csv',
};

const dataLayerGroup = L.layerGroup();

let layers = {};

Object.keys(SOURCES).forEach(sourceName => {
  layers[sourceName] = omnivore.csv(`data/${SOURCES[sourceName]}`, {
      delimiter: 'auto',
    }, L.geoJson(null, {
      pointToLayer:function(geoJsonPoint, latlng) {
        const linestringCircle = circleToPolygon([ latlng.lng, latlng.lat ], window.CIRCLE_RADIUS);
        return L.geoJSON(linestringCircle);  // not using L.circle to allow for geojson export as polygons rather than points
      }
    })
  );
  dataLayerGroup.addLayer(layers[sourceName]);
});

L.control.layers({}, layers, {
  collapsed: false,
}).addTo(map);


const downloadLink = document.getElementById('download');
downloadLink.addEventListener('click', e => {
  downloadLink.href = window.URL.createObjectURL(new Blob([ JSON.stringify(dataLayerGroup.toGeoJSON()) ], {type: 'application/geo+json'}));
});
