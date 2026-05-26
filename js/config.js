// Campsite map bounds: [[south, west], [north, east]]
// GPS reference from official plan: 43°14'14"N / 6°39'40"E = 43.23722N, 6.66111E
// Bounds sized for actual 7-hectare campsite (~350m N-S × 230m E-W)
// matching cropped aerial image aspect ratio (~0.65)
// Fine-tune with calibrate.html if overlay is slightly off.
const CAMPSITE_BOUNDS = [
  [43.235645, 6.659710],
  [43.238795, 6.662510]
];

const CAMPSITE_CENTER = [43.23722, 6.66111];
const CAMPSITE_ZOOM = 17;
const PLAN_IMAGE = 'img/campsite-map.png';

// Station positions are based on facility locations on the official plan.
// Adjust positions after on-site GPS calibration if needed.
const STATIONS = [
  {
    id: 1,
    name: 'Rezeption',
    emoji: '🏕️',
    color: '#FF6B6B',
    position: [43.2379, 6.6614],
    task: "Wie heißt unser Campingplatz? Buchstabiert laut zusammen:\nT – O – I – S – O – N D – ' – O – R !",
    hint: 'Schaut auf das große Schild am Eingang!',
    type: 'question'
  },
  {
    id: 2,
    name: 'Großer Pool',
    emoji: '🏊',
    color: '#4D96FF',
    position: [43.2372, 6.6611],
    task: 'Zählt alle Schwimmbahnen im großen Pool!\n(Die Trennleinen im Wasser)',
    hint: 'Schaut vom Rand aus – zählt die Leinen von links nach rechts.',
    type: 'count'
  },
  {
    id: 3,
    name: 'Kinderpool',
    emoji: '💦',
    color: '#4D96FF',
    position: [43.2371, 6.6610],
    task: 'Alle mitmachen! Springt 5× auf einem Bein!\nErst auf dem linken, dann auf dem rechten. 🦵',
    hint: 'Haltet euch gegenseitig fest, wenn ihr wackelt!',
    type: 'move'
  },
  {
    id: 4,
    name: 'Spielplatz',
    emoji: '🎠',
    color: '#6BCB77',
    position: [43.2373, 6.6608],
    task: 'Klettert auf das höchste Gerät auf dem Spielplatz und winkt allen zu! 👋',
    hint: 'Vorsicht beim Klettern – helft euch gegenseitig!',
    type: 'move'
  },
  {
    id: 5,
    name: 'Fête Foraine',
    emoji: '🎡',
    color: '#FFD93D',
    position: [43.2371, 6.6604],
    task: 'Findet die Fête Foraine (kleine Kirmes)! Zählt: wie viele verschiedene Spiele oder Fahrgeschäfte gibt es?',
    hint: 'Die Fête Foraine ist im westlichen Teil des Campingplatzes!',
    type: 'count'
  },
  {
    id: 6,
    name: 'Épicerie',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.2377, 6.6613],
    task: 'Findet etwas ROTES im Eingangsbereich oder Schaufenster der Épicerie! 🔴\nWas habt ihr gefunden?',
    hint: 'Schaut genau hin – vielleicht ist es eine Frucht, ein Schild oder eine Verpackung!',
    type: 'find'
  },
  {
    id: 7,
    name: 'Beach Sport',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.2361, 6.6608],
    task: 'Schafft ihr zusammen 10 Pässe beim Beach-Volleyball ohne den Ball fallen zu lassen? 🏐\nOder findet die Pétanque-Kugeln!',
    hint: 'Ihr könnt auch einfach 10× Ball prellen – Hauptsache zusammen!',
    type: 'move'
  },
  {
    id: 8,
    name: 'Restaurant Playamigos',
    emoji: '🍕',
    color: '#FFD93D',
    position: [43.2371, 6.6614],
    task: 'Schaut auf die Speisekarte oder Tafel beim Restaurant Playamigos.\nNennt 2 Gerichte, die es heute gibt! 🍽️',
    hint: 'Die Karte hängt meistens am Eingang oder draußen an einer Tafel.',
    type: 'question'
  },
  {
    id: 9,
    name: 'Strandeingang',
    emoji: '🏖️',
    color: '#9B59B6',
    position: [43.2358, 6.6608],
    task: 'Lauft bis ganz an den Strand! Sammelt zusammen 5 verschiedene Dinge: eine Muschel, einen Stein, eine Feder… was findet ihr noch? 🌊',
    hint: 'Der Strand (Plage de Pampelonne) ist am südlichsten Rand des Campingplatzes!',
    type: 'find'
  },
  {
    id: 10,
    name: 'Ziel: Rezeption',
    emoji: '🎯',
    color: '#FF6B6B',
    position: [43.2380, 6.6614],
    task: '🎉 IHR HABT ES GESCHAFFT! 🎉\nGeht zur Rezeption und holt euren Stempel oder erzählt den Erwachsenen von euren Abenteuern!',
    hint: 'Ihr seid echte Camping-Entdecker!',
    type: 'finish'
  }
];
