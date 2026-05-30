# CLAUDE.md – Toison d'Or Rallye

## Projektüberblick

Kein Build-Step. Reines HTML5 + CSS3 + Vanilla JS, gehostet auf GitHub Pages.

**Live-URL:** https://benjaminseidler.github.io/toisondor/

## Dateistruktur

```
index.html          Single-Page-App (alle Screens als divs)
manifest.json       PWA-Manifest (minimales Format, absolute Pfade)
sw.js               Service Worker – Cache-Version bei Änderungen bumpen!
.nojekyll           Verhindert Jekyll-Verarbeitung durch GitHub Pages
calibrate.html      Hilfstool zum Einmessen von Stationskoordinaten (nicht produktiv)
css/style.css       Alle Styles
js/config.js        Stationen + Karten-Bounds – hier macht der User Änderungen
js/map.js           Leaflet-Init, imageOverlay, GPS-Marker, Stations-Marker
js/app.js           Screen-Management, Spielerlogik, Event-Handler
img/campsite-map.jpg  Offizieller Campingplan 2026 (90° gegen UZS gedreht, Norden oben)
img/icon-192.png    PWA-Icon 192×192 (🏖️ auf grünem Hintergrund #6BCB77)
img/icon-512.png    PWA-Icon 512×512
```

## Screen-Ablauf

```
#screen-start → #screen-intro → #screen-rules → #screen-map → #screen-finish
```

- **screen-start:** Startscreen mit 🏖️-Logo, „Los geht's!"-Button, verstecktem PWA-Install-Button
- **screen-intro:** Erklärung (3 Schritte: Stationen der Reihe nach, Aufgabe lösen, Foto machen)
- **screen-rules:** Sicherheitshinweise (Autos, Straßen, nicht rennen, zusammenbleiben, gemeinsam)
- **screen-map:** Karte mit Stationen, Fortschrittsbalken, GPS-Button
- **screen-finish:** Zielscreen mit Konfetti

## Architektur-Entscheidungen

- **Kein Framework** – absichtlich, für einfaches Hosting ohne Build-Pipeline
- **Leaflet imageOverlay** statt echten Kartenkacheln: Der offizielle Campingplan wird als Bild über die Karte gelegt (`CAMPSITE_BOUNDS` in config.js). `MAP_BEARING = 90` dreht die Ansicht so, dass der Strand unten ist (wie auf dem gedruckten Plan).
- **localStorage** für Fortschritt: Key `rally_progress`, Format `{ completedStations: [1,3,…], startedAt: timestamp }`. Reset: 3 Sekunden auf das Logo drücken.
- **Service Worker** (`sw.js`): Cache-first. **Wichtig:** Bei jeder inhaltlichen Änderung die Cache-Version (`rally-vN`) bumpen, sonst sehen Nutzer alte Stände.
- **Vollbild-Button** (`#btn-fullscreen`): `position: fixed` oben rechts, auf allen Screens sichtbar. Webkit-Prefix für Safari. Stellt Vollbild nach Foto-Aufnahme automatisch wieder her.
- **Foto-Button** an jeder Station: Öffnet Kamera via `<input type="file" capture="environment">`, triggert nach Aufnahme automatisch einen Download (Dateiname mit Stationsnummer und -name).
- **PWA-Install:** `beforeinstallprompt` wird abgefangen; falls Chrome den Prompt feuert, erscheint ein „App installieren"-Button auf dem Startscreen.

## Karten-Koordinaten

```js
// config.js
const CAMPSITE_BOUNDS = [[43.23523, 6.65688], [43.23918, 6.66455]];
const CAMPSITE_CENTER = [43.23720, 6.66115];
const MAP_BEARING = 90;  // Strand kommt nach unten
```

GPS-Referenz aus offiziellem Plan: 43°14'14"N / 6°39'40"E.  
Bounds wurden vor Ort kalibriert (Pool-Bereich und Strandeingang als Referenzpunkte).

## Stationen (config.js)

20 Stationen. Typen: `question`, `count`, `move`, `find`, `finish`.  
Farben nach Typ: question `#FF6B6B`, count `#4D96FF`, move `#6BCB77`, find `#FFD93D`, finish `#9B59B6`.

Station 20 (`type: 'finish'`) zeigt den Ziel-Screen und Konfetti.

## Design-System

- Fonts: `Fredoka One` (Headlines), `Nunito` (Fließtext) – beide via Google Fonts CDN
- Farben: Coral `#FF6B6B`, Gelb `#FFD93D`, Grün `#6BCB77`, Blau `#4D96FF`, Lila `#9B59B6`
- Touch-Targets: min. 48px
- Zielgruppe: Kinder 6–8 Jahre → große Schrift, große Buttons, viele Emojis

## Typische Aufgaben

**Stationstext ändern:** `js/config.js` → gewünschte Station → `task`-Feld anpassen → SW-Cache bumpen  
**Intro-Text ändern:** `index.html` → `#screen-intro` → `.intro-step p`-Elemente anpassen  
**Hinweistext ändern:** `index.html` → `#screen-rules` → `<li>`-Einträge anpassen  
**Neue Station hinzufügen:** Eintrag in `STATIONS`-Array in config.js, dann Marker-Position vor Ort mit `calibrate.html` einmessen  
**Stationsposition korrigieren:** `calibrate.html` aufrufen → Marker verschieben → Koordinaten in config.js übertragen  
**Zielscreen-Text:** `index.html` → `#screen-finish`-Div  
**Styling:** `css/style.css`

## Deployment

Push auf `main` → GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages.  
Cache-Invalidierung: SW-Version in `sw.js` Zeile 1 bumpen (`rally-vN` → `rally-v(N+1)`).  
Aktuelle Version: `rally-v29`.

## Lokaler Test

```bash
npx serve .   # oder: python3 -m http.server 8080
```

GPS-Simulation: Chrome DevTools → Sensors → Location → Koordinate nahe `43.2372, 6.6611` eingeben.
