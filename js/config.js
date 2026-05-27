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

// Station positions derived from pixel positions in plan image.
// Adjust on-site with GPS if needed.
const STATIONS = [
  {
    id: 1,
    name: 'Rezeption',
    emoji: '🏕️',
    color: '#FF6B6B',
    position: [43.237344, 6.660632],
    task: "Wie heißt unser Campingplatz? Buchstabiert laut zusammen:\nT – O – I – S – O – N D – ' – O – R !",
    hint: 'Schaut auf das große Schild am Eingang!',
    type: 'question'
  },
  {
    id: 2,
    name: 'Großer Pool',
    emoji: '🏊',
    color: '#4D96FF',
    position: [43.23735, 6.660262],
    task: 'Zählt alle Schwimmbahnen im großen Pool!\n(Die Trennleinen im Wasser)',
    hint: 'Schaut vom Rand aus – zählt die Leinen von links nach rechts.',
    type: 'count'
  },
  {
    id: 3,
    name: 'Kinderpool',
    emoji: '💦',
    color: '#4D96FF',
    position: [43.237164, 6.660343],
    task: 'Alle mitmachen! Springt 5× auf einem Bein!\nErst auf dem linken, dann auf dem rechten. 🦵',
    hint: 'Haltet euch gegenseitig fest, wenn ihr wackelt!',
    type: 'move'
  },
  {
    id: 4,
    name: 'Spielplatz',
    emoji: '🎠',
    color: '#6BCB77',
    position: [43.237439, 6.660855],
    task: 'Klettert auf das höchste Gerät auf dem Spielplatz und winkt allen zu! 👋',
    hint: 'Vorsicht beim Klettern – helft euch gegenseitig!',
    type: 'move'
  },
  {
    id: 5,
    name: 'Fête Foraine',
    emoji: '🎡',
    color: '#FFD93D',
    position: [43.238066, 6.660793],
    task: 'Findet die Fête Foraine (kleine Kirmes)! Zählt: wie viele verschiedene Spiele oder Fahrgeschäfte gibt es?',
    hint: 'Die Fête Foraine ist im westlichen Teil des Campingplatzes!',
    type: 'count'
  },
  {
    id: 6,
    name: 'Épicerie',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.238106, 6.660545],
    task: 'Findet etwas ROTES im Eingangsbereich oder Schaufenster der Épicerie! 🔴\nWas habt ihr gefunden?',
    hint: 'Schaut genau hin – vielleicht ist es eine Frucht, ein Schild oder eine Verpackung!',
    type: 'find'
  },
  {
    id: 7,
    name: 'Beach Sport',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.238032, 6.660299],
    task: 'Schafft ihr zusammen 10 Pässe beim Beach-Volleyball ohne den Ball fallen zu lassen? 🏐\nOder findet die Pétanque-Kugeln!',
    hint: 'Ihr könnt auch einfach 10× Ball prellen – Hauptsache zusammen!',
    type: 'move'
  },
  {
    id: 8,
    name: 'Restaurant Playamigos',
    emoji: '🍕',
    color: '#FFD93D',
    position: [43.238342, 6.660734],
    task: 'Schaut auf die Speisekarte oder Tafel beim Restaurant Playamigos.\nNennt 2 Gerichte, die es heute gibt! 🍽️',
    hint: 'Die Karte hängt meistens am Eingang oder draußen an einer Tafel.',
    type: 'question'
  },
  {
    id: 9,
    name: 'Strandeingang',
    emoji: '🏖️',
    color: '#9B59B6',
    position: [43.237648, 6.660971],
    task: 'Lauft bis ganz an den Strand! Sammelt zusammen 5 verschiedene Dinge: eine Muschel, einen Stein, eine Feder… was findet ihr noch? 🌊',
    hint: 'Der Strand (Plage de Pampelonne) ist ganz unten auf der Karte, am Meer!',
    type: 'find'
  },
  {
    id: 10,
    name: 'Ziel: Rezeption',
    emoji: '🎯',
    color: '#FF6B6B',
    position: [43.237121, 6.660574],
    task: '🎉 IHR HABT ES GESCHAFFT! 🎉\nGeht zur Rezeption und holt euren Stempel oder erzählt den Erwachsenen von euren Abenteuern!',
    hint: 'Ihr seid echte Camping-Entdecker!',
    type: 'finish'
  },
  {
    id: 11,
    name: 'Station 11',
    emoji: '⭐',
    color: '#FF6B6B',
    position: [43.236978, 6.66062],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 12,
    name: 'Station 12',
    emoji: '⭐',
    color: '#4D96FF',
    position: [43.236186, 6.661007],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 13,
    name: 'Station 13',
    emoji: '⭐',
    color: '#6BCB77',
    position: [43.236655, 6.662228],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 14,
    name: 'Station 14',
    emoji: '⭐',
    color: '#FFD93D',
    position: [43.237077, 6.662893],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 15,
    name: 'Station 15',
    emoji: '⭐',
    color: '#9B59B6',
    position: [43.237581, 6.662893],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 16,
    name: 'Station 16',
    emoji: '⭐',
    color: '#FF6B6B',
    position: [43.237265, 6.662285],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 17,
    name: 'Station 17',
    emoji: '⭐',
    color: '#4D96FF',
    position: [43.237211, 6.660793],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 18,
    name: 'Station 18',
    emoji: '⭐',
    color: '#6BCB77',
    position: [43.237586, 6.660176],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 19,
    name: 'Station 19',
    emoji: '⭐',
    color: '#FFD93D',
    position: [43.238221, 6.659611],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  },
  {
    id: 20,
    name: 'Station 20',
    emoji: '⭐',
    color: '#9B59B6',
    position: [43.237837, 6.658363],
    task: 'Aufgabe folgt…',
    hint: '',
    type: 'question'
  }
];
