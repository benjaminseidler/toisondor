let map, planOverlay, gpsMarker, gpsWatchId;
const stationMarkers = {};

function initMap() {
  // bearing:90 rotates viewport corners outside the geographic bounds;
  // padding compensates so the user cannot pan off the plan image.
  const maxBounds = L.latLngBounds(CAMPSITE_BOUNDS).pad(0.4);

  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 17,
    maxZoom: 19,
    maxBounds: maxBounds,
    maxBoundsViscosity: 1.0,
    rotate: true,
    bearing: MAP_BEARING,
    rotateControl: false,
    touchRotate: false,
    shiftKeyRotate: false
  }).setView(CAMPSITE_CENTER, CAMPSITE_ZOOM);

  // Official campsite plan overlay (north-up; view rotated via bearing)
  planOverlay = L.imageOverlay(PLAN_IMAGE, CAMPSITE_BOUNDS, {
    opacity: 1.0,
    interactive: false,
    zIndex: 200
  }).addTo(map);

  // Zoom control (repositioned)
  L.control.zoom({ position: 'topright' }).addTo(map);

  addStationMarkers();
}

function addStationMarkers() {
  const progress = loadProgress();

  STATIONS.forEach(station => {
    const done = progress.completedStations.includes(station.id);
    const marker = createMarker(station, done);
    stationMarkers[station.id] = marker;
    marker.addTo(map);

    marker.on('click', () => openStation(station.id));
  });
}

function createMarker(station, done) {
  const label = done ? '✓' : station.id;
  const bg = done ? '#6BCB77' : station.color;
  const icon = L.divIcon({
    className: '',
    html: `<div class="station-marker ${done ? 'done' : ''}"
                style="background:${bg}; width:44px; height:44px;"
                data-id="${station.id}">
             ${done ? '' : label}
           </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
  return L.marker(station.position, { icon, zIndexOffset: 500 });
}

function updateMarker(stationId) {
  const station = STATIONS.find(s => s.id === stationId);
  if (!station) return;
  if (stationMarkers[stationId]) {
    stationMarkers[stationId].remove();
  }
  const done = loadProgress().completedStations.includes(stationId);
  const marker = createMarker(station, done);
  stationMarkers[stationId] = marker;
  marker.addTo(map);
  marker.on('click', () => openStation(stationId));
}

function startGPS() {
  if (!navigator.geolocation) {
    showToast('GPS nicht verfügbar auf diesem Gerät');
    return;
  }
  gpsWatchId = navigator.geolocation.watchPosition(
    pos => {
      const latlng = [pos.coords.latitude, pos.coords.longitude];
      if (!gpsMarker) {
        const icon = L.divIcon({
          className: '',
          html: '<div class="gps-marker"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });
        gpsMarker = L.marker(latlng, { icon, zIndexOffset: 1000 }).addTo(map);
      } else {
        gpsMarker.setLatLng(latlng);
      }
    },
    err => {
      if (err.code === 1) showToast('GPS-Zugriff verweigert');
    },
    { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
  );
}

function panToGPS() {
  if (gpsMarker) {
    map.flyTo(gpsMarker.getLatLng(), CAMPSITE_ZOOM, { duration: 1 });
  } else {
    showToast('GPS wird gesucht… 📡');
    startGPS();
  }
}

function panToStation(stationId) {
  const station = STATIONS.find(s => s.id === stationId);
  if (station) {
    map.flyTo(station.position, 18, { duration: 0.8 });
  }
}
