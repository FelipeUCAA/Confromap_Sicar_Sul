import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';

// URL do WMS
const wmsUrl = 'https://acervofundiario.incra.gov.br/i3geo/ogc.php?tema=certificada_SICAR_Brasil'; //endpoint WMS

// Camada WMS
const wmsLayer = new TileLayer({
  source: new TileWMS({
    url: wmsUrl,
    params: {
      'LAYERS': 'Sigef_RJ', 
      'TILED': true,
      'VERSION': '1.3.0',
      'FORMAT': 'image/png',
      'TRANSPARENT': true,
    },
    serverType: 'geoserver',
    transition: 0,
  }),
});

// Inicialização do mapa
const map = new Map({
  target: 'map', // id da div
  layers: [wmsLayer],
  view: new View({
    center: fromLonLat([-43.1729, -22.9068]), // Longitude, Latitude 
    zoom: 10,
  }),
});

// Função para forçar atualização do WMS
function atualizarWMS() {
  const source = wmsLayer.getSource();
  const params = source.getParams();
  params.t = Date.now(); // cache buster
  source.updateParams(params);
}

// Atualiza a camada a cada 30 segundos
setInterval(atualizarWMS, 30000);
