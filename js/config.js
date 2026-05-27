// Campsite map bounds: [[south, west], [north, east]]
// GPS reference from official plan: 43°14'14"N / 6°39'40"E = 43.23722N, 6.66111E
// Image (img/campsite-map.jpg) is 3308x2363px, rotated 90° CCW from the original
// PDF plan so it is NORTH-UP: the plan's north arrow pointed right, beach (Plage de
// Pampelonne) is to the EAST. No crop – full official plan used.
// MAP_BEARING then rotates the on-screen view so the beach appears at the bottom.
// Bounds derived from on-site calibration of the cropped sub-region, then
// extrapolated to the full image dimensions.
const CAMPSITE_BOUNDS = [
  [43.23523, 6.65688],
  [43.23918, 6.66455]
];

const CAMPSITE_CENTER = [43.23720, 6.66115];
const CAMPSITE_ZOOM = 17;
// Screen rotation (degrees). Plan is north-up; beach is east. Rotating the view
// puts east (beach) at the bottom, matching the printed plan's orientation.
const MAP_BEARING = 90;
const PLAN_IMAGE = 'img/campsite-map.jpg';

// Colors by task type:
// question → #FF6B6B  count → #4D96FF  move → #6BCB77  find → #FFD93D  finish → #9B59B6

// Station positions: adjust on-site with GPS / calibrate.html if needed.
const STATIONS = [
  {
    id: 1,
    name: 'Kinderspielplatz',
    emoji: '🧗',
    color: '#4D96FF',
    position: [43.237344, 6.660632],
    task: 'Wie viele Stufen hat der Kletterturm bis ganz oben?\nZählt laut zusammen!',
    type: 'count'
  },
  {
    id: 2,
    name: 'Wasserspielplatz',
    emoji: '💦',
    color: '#6BCB77',
    position: [43.23735, 6.660262],
    task: 'Einmal außen um den Wasserspielplatz herum!\nJedes Tier dabei berühren – ohne nass zu werden! 🐬',
    type: 'move'
  },
  {
    id: 3,
    name: 'Hüpfburg',
    emoji: '🏰',
    color: '#4D96FF',
    position: [43.237164, 6.660343],
    task: 'Wie viele verschiedene Farben hat die Hüpfburg?',
    type: 'count'
  },
  {
    id: 4,
    name: 'Neptunbild',
    emoji: '🔱',
    color: '#FF6B6B',
    position: [43.237439, 6.660855],
    task: 'Was ist alles auf dem Neptunbild abgebildet?\nNennt so viele Dinge wie möglich!',
    type: 'question'
  },
  {
    id: 5,
    name: 'Beachvolleyball',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.238066, 6.660793],
    task: '3 Mal ums Beachvolleyball-Feld laufen!\nAlle zusammen – los! 🏃',
    type: 'move'
  },
  {
    id: 6,
    name: 'Fitness-Spielplatz',
    emoji: '🏋️',
    color: '#6BCB77',
    position: [43.238106, 6.660545],
    task: 'Einmal den ganzen Parcours durchmachen!\nJedes Gerät mindestens einmal benutzen! 💪',
    type: 'move'
  },
  {
    id: 7,
    name: 'Lounge',
    emoji: '⛱️',
    color: '#4D96FF',
    position: [43.238032, 6.660299],
    task: 'Wie viele Sonnensegel gibt es hier?\n⭐ Bonus: Gruppenfoto im Bilderrahmen machen!',
    type: 'count'
  },
  {
    id: 8,
    name: 'Pump-Track',
    emoji: '🚲',
    color: '#6BCB77',
    position: [43.238342, 6.660734],
    task: '3 Runden um den Pump-Track laufen!\nAlle zusammen im Gänsemarsch! 🦆',
    type: 'move'
  },
  {
    id: 9,
    name: 'Concierge',
    emoji: '🗝️',
    color: '#FF6B6B',
    position: [43.237648, 6.660971],
    task: 'Findet die Öffnungszeiten des Concierge!\nWann ist er heute offen?',
    type: 'question'
  },
  {
    id: 10,
    name: 'Karussell',
    emoji: '🎠',
    color: '#4D96FF',
    position: [43.237121, 6.660574],
    task: 'Wie viele Fahrzeuge / Sitze hat das Karussell?\nZählt genau!',
    type: 'count'
  },
  {
    id: 11,
    name: 'Fitness',
    emoji: '🏃',
    color: '#FF6B6B',
    position: [43.236978, 6.66062],
    task: 'Was ist das nächste Kursangebot im Fitness?\n⭐ Bonus: Reingehen und laut „Bonjour!" sagen!',
    type: 'question'
  },
  {
    id: 12,
    name: 'Hütte Nr. 1000',
    emoji: '🏠',
    color: '#FFD93D',
    position: [43.236186, 6.661007],
    task: 'Findet die Hütte mit der Hausnummer 1000!',
    type: 'find'
  },
  {
    id: 13,
    name: 'Hydrant',
    emoji: '🚒',
    color: '#FFD93D',
    position: [43.236655, 6.662228],
    task: 'Findet den Hydranten auf dem Campingplatz!',
    type: 'find'
  },
  {
    id: 14,
    name: 'Strandeingang',
    emoji: '🏖️',
    color: '#FFD93D',
    position: [43.237077, 6.662893],
    task: 'Geht bis an den Strand!\nSammelt zusammen 5 verschiedene Dinge:\nMuschel, Stein, Alge… was findet ihr noch? 🌊',
    type: 'find'
  },
  {
    id: 15,
    name: 'Shallona',
    emoji: '🌴',
    color: '#4D96FF',
    position: [43.237581, 6.662893],
    task: 'Wie viele Pflanzkübel stehen in der ersten Reihe?\n⭐ Bonus: Welches Lied läuft gerade? 🎵',
    type: 'count'
  },
  {
    id: 16,
    name: 'Durchgang',
    emoji: '🚧',
    color: '#4D96FF',
    position: [43.237265, 6.662285],
    task: 'Wie viele Latten haben die Zäune am Durchgang?\nZählt beide Seiten zusammen!',
    type: 'count'
  },
  {
    id: 17,
    name: 'Laden',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.237211, 6.660793],
    task: 'Wann macht der Laden morgens auf?\nSchaut auf das Schild!',
    type: 'question'
  },
  {
    id: 18,
    name: 'Pool',
    emoji: '🏊',
    color: '#FF6B6B',
    position: [43.237586, 6.660176],
    task: 'Wann ist heute Wassergymnastik?\n(Ihr könnt auch jemanden fragen!)',
    type: 'question'
  },
  {
    id: 19,
    name: 'Fischteich',
    emoji: '🐟',
    color: '#4D96FF',
    position: [43.238221, 6.659611],
    task: 'Wie viele Fische zählt ihr im Teich?\nGeduld – die schwimmen weg! 🐠',
    type: 'count'
  },
  {
    id: 20,
    name: 'Ziel!',
    emoji: '🏆',
    color: '#9B59B6',
    position: [43.237837, 6.658363],
    task: '🎉 IHR HABT ALLE STATIONEN GEFUNDEN! 🎉\nJetzt gibt es den Preis / Schatz!\nHolt ihn euch ab! 🏆',
    type: 'finish'
  }
];
