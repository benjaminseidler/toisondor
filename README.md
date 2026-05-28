# Camping Rallye – Toison d'Or

Kindgerechte Schnitzeljagd-Web-App für den Campingplatz [Toison d'Or](https://www.toison-dor.com/) in Ramatuelle, Frankreich. Läuft komplett im Browser, kein Server nötig.

**Live:** https://benjaminseidler.github.io/toisondor/

## Features

- Interaktive Karte mit offiziellem Campingplatz-Plan als Overlay
- 20 nummerierte Stationen mit Aufgaben (zählen, bewegen, finden, beantworten)
- GPS-Ortung (zeigt eigene Position auf der Karte)
- Foto-Button an jeder Station (öffnet Kamera direkt)
- Fortschritt wird lokal gespeichert (localStorage)
- PWA: installierbar auf dem Homescreen, funktioniert offline
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

## Campingplatz-Plan

`img/campsite-map.jpg` ist der offizielle Plan 2026, um 90° gegen den Uhrzeigersinn gedreht (Norden oben). Die Kartenausrichtung (`MAP_BEARING = 90` in `config.js`) dreht die Ansicht so, dass der Strand unten erscheint – passend zum gedruckten Plan.
