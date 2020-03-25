const map = L.map('map').setView(window.START_CENTER, window.START_ZOOM_LEVEL);

L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  attribution: 'Données LO <a href="https://www.data.gouv.fr/fr/organizations/ville-de-marseille/" target="_blank">Ville de Marseille</a>'
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

let layers = {};

Object.keys(SOURCES).forEach(sourceName => {
  layers[sourceName] = omnivore.csv(`data/${SOURCES[sourceName]}`, {
      delimiter: 'auto',
    }, L.geoJson(null, {
      pointToLayer:function(geoJsonPoint, latlng) {
        return L.circle(latlng, { radius: 200 });
      }
    })
  );
  layers[sourceName].addTo(map);
});

L.control.layers({}, layers, {
  collapsed: false,
}).addTo(map);
