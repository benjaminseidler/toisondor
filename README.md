# Toison d'Or Rallye 🏖️

Kindgerechte Schnitzeljagd-Web-App für den Campingplatz [Toison d'Or](https://www.toison-dor.com/) in Ramatuelle, Frankreich. Läuft komplett im Browser, kein Server nötig.

**Live:** https://benjaminseidler.github.io/toisondor/

## Features

- Interaktive Karte mit offiziellem Campingplatz-Plan als Overlay
- 20 nummerierte Stationen der Reihe nach mit Aufgaben (zählen, bewegen, finden, beantworten)
- GPS-Ortung (zeigt eigene Position auf der Karte)
- Erklärungsscreen + Sicherheitshinweise vor dem Start
- Foto-Button an jeder Station – Bild wird automatisch auf das Gerät heruntergeladen
- Vollbild-Modus (Button oben rechts, auf allen Screens, wird nach Foto wiederhergestellt)
- Fortschritt wird lokal gespeichert (localStorage)
- Offline-fähig via Service Worker
- Reset-Funktion (3 Sekunden auf das Logo drücken)

## Stationen anpassen

Alle Stationen stehen in `js/config.js`. Dort lassen sich Texte, Emojis, Farben und GPS-Koordinaten ändern. Die Stationstypen sind: `question`, `count`, `move`, `find`, `finish`.

GPS-Positionen können vor Ort mit `calibrate.html` (im Repo) überprüft und angepasst werden.

## Lokaler Start

```bash
npx serve .
# oder
python3 -m http.server 8080
```

## Deployment

Push auf `main` löst automatisch einen GitHub-Pages-Deploy aus (`.github/workflows/deploy.yml`).  
Nach Änderungen die Cache-Version in `sw.js` Zeile 1 hochzählen (`rally-vN` → `rally-v(N+1)`).

## Campingplatz-Plan

`img/campsite-map.jpg` ist der offizielle Plan 2026, um 90° gegen den Uhrzeigersinn gedreht (Norden oben). Die Kartenausrichtung (`MAP_BEARING = 90` in `config.js`) dreht die Ansicht so, dass der Strand unten erscheint – passend zum gedruckten Plan.
