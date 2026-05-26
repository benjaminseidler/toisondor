// Campsite map bounds: [[south, west], [north, east]]
// GPS reference from official plan: 43°14'14"N / 6°39'40"E = 43.23722N, 6.66111E
// Image: 1450x2400px (crop from PDF at 200 DPI)
// Bounds cover full plan area: road (N) to beach Pampelonne (S), ~777m N-S × 469m E-W
// Image aspect 1450/2400=0.604 matches geographic aspect (Δlon*cos(lat))/Δlat=0.604
// Fine-tune with calibrate.html on-site if overlay is slightly off.
const CAMPSITE_BOUNDS = [
  [43.232, 6.657],
  [43.239, 6.6628]
];

const CAMPSITE_CENTER = [43.2360, 6.6599];
const CAMPSITE_ZOOM = 16;
const PLAN_IMAGE = 'img/campsite-map.png';

// Station positions derived from pixel positions in plan image.
// Adjust on-site with GPS if needed.
const STATIONS = [
  {
    id: 1,
    name: 'Rezeption',
    emoji: '🏕️',
    color: '#FF6B6B',
    position: [43.2383, 6.6614],
    task: "Wie heißt unser Campingplatz? Buchstabiert laut zusammen:\nT – O – I – S – O – N D – ' – O – R !",
    hint: 'Schaut auf das große Schild am Eingang!',
    type: 'question'
  },
  {
    id: 2,
    name: 'Großer Pool',
    emoji: '🏊',
    color: '#4D96FF',
    position: [43.2372, 6.6607],
    task: 'Zählt alle Schwimmbahnen im großen Pool!\n(Die Trennleinen im Wasser)',
    hint: 'Schaut vom Rand aus – zählt die Leinen von links nach rechts.',
    type: 'count'
  },
  {
    id: 3,
    name: 'Kinderpool',
    emoji: '💦',
    color: '#4D96FF',
    position: [43.2369, 6.6603],
    task: 'Alle mitmachen! Springt 5× auf einem Bein!\nErst auf dem linken, dann auf dem rechten. 🦵',
    hint: 'Haltet euch gegenseitig fest, wenn ihr wackelt!',
    type: 'move'
  },
  {
    id: 4,
    name: 'Spielplatz',
    emoji: '🎠',
    color: '#6BCB77',
    position: [43.2362, 6.6597],
    task: 'Klettert auf das höchste Gerät auf dem Spielplatz und winkt allen zu! 👋',
    hint: 'Vorsicht beim Klettern – helft euch gegenseitig!',
    type: 'move'
  },
  {
    id: 5,
    name: 'Fête Foraine',
    emoji: '🎡',
    color: '#FFD93D',
    position: [43.2357, 6.6584],
    task: 'Findet die Fête Foraine (kleine Kirmes)! Zählt: wie viele verschiedene Spiele oder Fahrgeschäfte gibt es?',
    hint: 'Die Fête Foraine ist im westlichen Teil des Campingplatzes!',
    type: 'count'
  },
  {
    id: 6,
    name: 'Épicerie',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.2379, 6.6610],
    task: 'Findet etwas ROTES im Eingangsbereich oder Schaufenster der Épicerie! 🔴\nWas habt ihr gefunden?',
    hint: 'Schaut genau hin – vielleicht ist es eine Frucht, ein Schild oder eine Verpackung!',
    type: 'find'
  },
  {
    id: 7,
    name: 'Beach Sport',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.2346, 6.6600],
    task: 'Schafft ihr zusammen 10 Pässe beim Beach-Volleyball ohne den Ball fallen zu lassen? 🏐\nOder findet die Pétanque-Kugeln!',
    hint: 'Ihr könnt auch einfach 10× Ball prellen – Hauptsache zusammen!',
    type: 'move'
  },
  {
    id: 8,
    name: 'Restaurant Playamigos',
    emoji: '🍕',
    color: '#FFD93D',
    position: [43.2365, 6.6613],
    task: 'Schaut auf die Speisekarte oder Tafel beim Restaurant Playamigos.\nNennt 2 Gerichte, die es heute gibt! 🍽️',
    hint: 'Die Karte hängt meistens am Eingang oder draußen an einer Tafel.',
    type: 'question'
  },
  {
    id: 9,
    name: 'Strandeingang',
    emoji: '🏖️',
    color: '#9B59B6',
    position: [43.2333, 6.6602],
    task: 'Lauft bis ganz an den Strand! Sammelt zusammen 5 verschiedene Dinge: eine Muschel, einen Stein, eine Feder… was findet ihr noch? 🌊',
    hint: 'Der Strand (Plage de Pampelonne) ist am südlichsten Rand des Campingplatzes!',
    type: 'find'
  },
  {
    id: 10,
    name: 'Ziel: Rezeption',
    emoji: '🎯',
    color: '#FF6B6B',
    position: [43.2386, 6.6620],
    task: '🎉 IHR HABT ES GESCHAFFT! 🎉\nGeht zur Rezeption und holt euren Stempel oder erzählt den Erwachsenen von euren Abenteuern!',
    hint: 'Ihr seid echte Camping-Entdecker!',
    type: 'finish'
  }
];
