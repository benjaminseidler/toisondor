// Campsite map bounds: [[south, west], [north, east]]
// These are approximate — use calibrate.html to fine-tune.
// GPS reference from official plan: 43°14'14"N / 6°39'40"E (western beach corner)
const CAMPSITE_BOUNDS = [
  [43.2355, 6.6590],
  [43.2413, 6.6745]
];

const CAMPSITE_CENTER = [43.2384, 6.6668];
const CAMPSITE_ZOOM = 17;
const PLAN_IMAGE = 'img/campsite-map.png';

const STATIONS = [
  {
    id: 1,
    name: 'Rezeption',
    emoji: '🏕️',
    color: '#FF6B6B',
    position: [43.2393, 6.6685],
    task: "Wie heißt unser Campingplatz? Buchstabiert laut zusammen:\nT – O – I – S – O – N – D – ' – O – R !",
    hint: 'Schaut auf das große Schild am Eingang!',
    type: 'question'
  },
  {
    id: 2,
    name: 'Großer Pool',
    emoji: '🏊',
    color: '#4D96FF',
    position: [43.2386, 6.6672],
    task: 'Zählt alle Schwimmbahnen im großen Pool!\n(Die Trennleinen im Wasser)',
    hint: 'Schaut vom Rand aus – zählt die Leinen von links nach rechts.',
    type: 'count'
  },
  {
    id: 3,
    name: 'Kinderpool',
    emoji: '💦',
    color: '#4D96FF',
    position: [43.2384, 6.6675],
    task: 'Alle mitmachen! Springt 5× auf einem Bein!\nErst auf dem linken, dann auf dem rechten. 🦵',
    hint: 'Haltet euch gegenseitig fest, wenn ihr wackelt!',
    type: 'move'
  },
  {
    id: 4,
    name: 'Spielplatz',
    emoji: '🎠',
    color: '#6BCB77',
    position: [43.2387, 6.6665],
    task: 'Klettert auf das höchste Gerät auf dem Spielplatz und winkt allen zu! 👋',
    hint: 'Vorsicht beim Klettern – helft euch gegenseitig!',
    type: 'move'
  },
  {
    id: 5,
    name: 'Café Flora',
    emoji: '☕',
    color: '#FFD93D',
    position: [43.2388, 6.6669],
    task: 'Wie viele Stühle stehen draußen vor dem Café Flora? Zählt sie alle!',
    hint: 'Schaut auch um die Ecke, vielleicht stehen noch mehr da!',
    type: 'count'
  },
  {
    id: 6,
    name: 'Épicerie',
    emoji: '🛒',
    color: '#FF6B6B',
    position: [43.2391, 6.6682],
    task: 'Findet etwas ROTES im Eingangsbereich oder Schaufenster der Épicerie! 🔴\nWas habt ihr gefunden?',
    hint: 'Schaut genau hin – vielleicht ist es eine Frucht, ein Schild oder eine Verpackung!',
    type: 'find'
  },
  {
    id: 7,
    name: 'Beach Sport',
    emoji: '🏐',
    color: '#6BCB77',
    position: [43.2360, 6.6673],
    task: 'Schafft ihr zusammen 10 Pässe beim Beach-Volleyball ohne den Ball fallen zu lassen? 🏐\nOder findet die Pétanque-Kugeln!',
    hint: 'Ihr könnt auch einfach 10× Ball prellen – Hauptsache zusammen!',
    type: 'move'
  },
  {
    id: 8,
    name: 'Restaurant Playamigos',
    emoji: '🍕',
    color: '#FFD93D',
    position: [43.2383, 6.6678],
    task: 'Schaut auf die Speisekarte oder Tafel beim Restaurant Playamigos.\nNennt 2 Gerichte, die es heute gibt! 🍽️',
    hint: 'Die Karte hängt meistens am Eingang oder draußen an einer Tafel.',
    type: 'question'
  },
  {
    id: 9,
    name: 'Spa',
    emoji: '💆',
    color: '#9B59B6',
    position: [43.2386, 6.6698],
    task: 'Wie viele Sonnenliegen stehen vor dem Spa & Bien-Être? Zählt sie! 🌞',
    hint: 'Zählt leise und geht niemanden beim Entspannen stören!',
    type: 'count'
  },
  {
    id: 10,
    name: 'Ziel: Rezeption',
    emoji: '🎯',
    color: '#FF6B6B',
    position: [43.2394, 6.6687],
    task: '🎉 IHR HABT ES GESCHAFFT! 🎉\nGeht zur Rezeption und holt euren Stempel oder erzählt den Erwachsenen von euren Abenteuern!',
    hint: 'Ihr seid echte Camping-Entdecker!',
    type: 'finish'
  }
];
