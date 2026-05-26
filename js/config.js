// Campsite map bounds: [[south, west], [north, east]]
// GPS reference from official plan: 43°14'14"N / 6°39'40"E = 43.23722N, 6.66111E
// Image (img/campsite-map.png) is 2230x1100px, rotated 90° CCW from the original
// PDF plan so it is NORTH-UP: the plan's north arrow pointed right, beach (Plage de
// Pampelonne) is to the EAST. North-up means the overlay aligns with OSM tiles.
// MAP_BEARING then rotates the on-screen view so the beach appears at the bottom.
// Bounds cover ~333m N-S × 671m E-W; aspect 2.027 matches (Δlon*cos(lat))/Δlat.
// Fine-tune with calibrate.html on-site (calibrate is north-up, no bearing).
const CAMPSITE_BOUNDS = [
  [43.2357, 6.6570],
  [43.2387, 6.6653]
];

const CAMPSITE_CENTER = [43.23720, 6.66115];
const CAMPSITE_ZOOM = 17;
// Screen rotation (degrees). Plan is north-up; beach is east. Rotating the view
// puts east (beach) at the bottom, matching the printed plan's orientation.
const MAP_BEARING = 90;
const PLAN_IMAGE = 'img/campsite-map.png';

// Station positions derived from pixel positions in plan image.
// Adjust on-site with GPS if needed.
const STATIONS = [
  {
    id: 1,
    name: 'Rezeption',
    emoji: '🏕️',
    color: '#FF6B6B',
    position: [43.2382, 6.6601],
    task: "Wie heißt unser Campingplatz? Buchstabiert laut zusammen:\nT – O – I – S – O – N D – ' – O – R !",
    hint: 'Schaut auf das große Schild am Eingang!',
    type: 'question'
  },
  {
    id: 2,
    name: 'Großer Pool',
    emoji: '🏊',
    color: '#4D96FF',
    position: [43.2378, 6.6590],
    task: 'Zählt alle Schwimmbahnen im großen Pool!\n(Die Trennleinen im Wasser)',
    hint: 'Schaut vom Rand aus – zählt die Leinen von links nach rechts.',
    type: 'count'
  },
  {
    id: 3,
    name: 'Kinderpool',
    emoji: '💦',
    color: '#4D96FF',
    position: [43.2375, 6.6595],
    task: 'Alle mitmachen! Springt 5× auf einem Bein!\nErst auf dem linken, dann auf dem rechten. 🦵',
    hint: 'Haltet euch gegenseitig fest, wenn ihr wackelt!',
    type: 'move'
  },
  {
    id: 4,
    name: 'Spielplatz',
    emoji: '🎠',
    color: '#6BCB77',
    position: [43.2381, 6.6587],
    task: 'Klettert auf das höchste Gerät auf dem Spielplatz und winkt allen zu! 👋',
    hint: 'Vorsicht beim Klettern – helft euch gegenseitig!',
    type: 'move'
  },
  {
    id: 5,
    name: 'Fête Foraine',
    emoji: '🎡',
    color: '#FFD93D',
    position: [43.2376, 6.6580],
    task: 'Findet die Fête Foraine (kleine Kirmes)! Zählt: wie viele verschiedene Spiele oder Fahrgeschäfte gibt es?',
    hint: 'Die Fête Foraine ist im westlichen Teil des Campingplatzes!',
    type: 'count'
  },
  {
    id: 6,
    name: 'Épicerie',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.2382, 6.6594],
    task: 'Findet etwas ROTES im Eingangsbereich oder Schaufenster der Épicerie! 🔴\nWas habt ihr gefunden?',
    hint: 'Schaut genau hin – vielleicht ist es eine Frucht, ein Schild oder eine Verpackung!',
    type: 'find'
  },
  {
    id: 7,
    name: 'Beach Sport',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.2370, 6.6626],
    task: 'Schafft ihr zusammen 10 Pässe beim Beach-Volleyball ohne den Ball fallen zu lassen? 🏐\nOder findet die Pétanque-Kugeln!',
    hint: 'Ihr könnt auch einfach 10× Ball prellen – Hauptsache zusammen!',
    type: 'move'
  },
  {
    id: 8,
    name: 'Restaurant Playamigos',
    emoji: '🍕',
    color: '#FFD93D',
    position: [43.2378, 6.6601],
    task: 'Schaut auf die Speisekarte oder Tafel beim Restaurant Playamigos.\nNennt 2 Gerichte, die es heute gibt! 🍽️',
    hint: 'Die Karte hängt meistens am Eingang oder draußen an einer Tafel.',
    type: 'question'
  },
  {
    id: 9,
    name: 'Strandeingang',
    emoji: '🏖️',
    color: '#9B59B6',
    position: [43.2372, 6.6643],
    task: 'Lauft bis ganz an den Strand! Sammelt zusammen 5 verschiedene Dinge: eine Muschel, einen Stein, eine Feder… was findet ihr noch? 🌊',
    hint: 'Der Strand (Plage de Pampelonne) ist ganz unten auf der Karte, am Meer!',
    type: 'find'
  },
  {
    id: 10,
    name: 'Ziel: Rezeption',
    emoji: '🎯',
    color: '#FF6B6B',
    position: [43.2385, 6.6599],
    task: '🎉 IHR HABT ES GESCHAFFT! 🎉\nGeht zur Rezeption und holt euren Stempel oder erzählt den Erwachsenen von euren Abenteuern!',
    hint: 'Ihr seid echte Camping-Entdecker!',
    type: 'finish'
  }
];
