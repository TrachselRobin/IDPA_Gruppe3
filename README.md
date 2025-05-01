# SBB-Abfahrtsbildschirm

Ein Open-Source-Projekt im Rahmen der **interdisziplinären Projektarbeit (IDPA)** an der **Kantonsschule Hottingen (IMS)** in Zusammenarbeit mit dem **Bildungszentrum Zürichsee (BZZ)**.

---

## Projektbeschreibung

Ziel ist die Entwicklung eines modernen Abfahrtsbildschirms, der auf einem **Raspberry Pi 4** betrieben wird und **live Zugverbindungen** anzeigt – insbesondere für den Bahnhof **Horgen See**, erweiterbar auf beliebige Bahnhöfe in der Schweiz. 

Das System zeigt:
- aktuelle **Abfahrtszeiten**
- **Linie**, **Ziel**, **Perron**, **Verspätung**
- eine **SBB-Uhr** im klassischen Look
- automatisch aktualisierte Daten via [OpenTransport API](https://opentransportdata.swiss/)

---

## Features

- Live-Daten via OpenTransport API
- SBB Uhr (Apache 2.0 Lizenz)
- Optimiert für FullHD-Displays (1920×1080)
- Automatische Aktualisierung im Intervall
- Konfigurierbarer Bahnhof
- Fullscreen-Modus, lauffähig auf Raspberry Pi

---

## 📁 Projektstruktur

```bash
📦 project-root/
 ┣ 📜 index.html
 ┣ 📁 styles/
 ┃ ┣ 📜 index.css
 ┃ ┣ 📜 basic.css
 ┃ ┣ 📜 connection.css
 ┣ 📁 javascript/
 ┃ ┣ 📜 burger.js
 ┃ ┣ 📜 checkUserInput.js
 ┃ ┣ 📜 clock.js
 ┃ ┣ 📜 filter.js
 ┃ ┣ 📜 geoposition.js
 ┃ ┣ 📜 index.js
 ┃ ┣ 📜 request.js
 ┃ ┣ 📜 sbb-Uhr-1.3.js
 ┃ ┣ 📜 scroll.js
 ┃ ┣ 📜 settings.js
 ┃ ┣ 📜 visualize.js
 ┣ 📁 images/
 ┃ ┗ 📄 ... (alle Bilddateien, z.B. Zugbilder, Linien-SVGs)
 ┣ 📜 .gitignore
 ┣ 📜 LICENSE
 ┣ 📜 NOTICE
 ┣ 📜 CODE_OF_CONDUCT.md
 ┣ 📜 README.md
```

---

## Installation

Sie können dieses Git-Repository wie folgt klonen.

```bash
git clone https://github.com/TrachselRobin/IDPA_Gruppe3.git
cd IDPA_Gruppe3
```

Falls Sie diesen Abfahrtsbildschirm auf einem Raspberry Pi 5 laufen lassen wollen, wechseln Sie zu der [Dokumentation](https://github.com/TrachselRobin/IDPA_Gruppe3/tree/main/Documentation), wie man dieses Projekt auf einem Raspberry Pi zu laufen bekommt.

---

## Verwendete Technologien

- HTML/CSS/JS (Vanilla)
- OpenTransport API (REST)
- Raspberry Pi (Linux, Chromium)
- SVG/SBB Uhr (Apache 2.0)

---

## Lizenz

- Dieses Projekt ist lizenziert unter der GNU General Public License v3.0 (GPLv3) – siehe [LICENSE](https://github.com/TrachselRobin/IDPA_Gruppe3/blob/main/LICENSE)
- Die Datei sbb-Uhr-1.3.js unterliegt der Apache License 2.0 – siehe [NOTICE](https://github.com/TrachselRobin/IDPA_Gruppe3/blob/main/NOTICE)

---

## Mitwirkende

- [Trachsel Robin](https://github.com/TrachselRobin)
- [Kraus Matthias](https://github.com/krausm-bzz)
- [Tschannen Léontine](https://github.com/tschannenl-bzz)

### Betreuung

- Kevin Maurizi (BZZ, Applikationsentwicklung)
- Matej Malik (KSH, Physik)

---

## Dokumentation

Die vollständige technische Dokumentation inkl. Arbeitsjournal und Arbeitsbericht ist Teil der offiziellen IDPA-Arbeit gemäss dem [IDPA-Reglement](https://intranet.tam.ch/ksh/file) (422_2_Reglement IDPA_IMS.pdf) der KSH.

---

## Hinweise

Dieses Projekt entstand im Rahmen der schulischen Ausbildung und dient ausschließlich zu Lernzwecken.

Kein kommerzieller Einsatz ohne Zustimmung der Kantonsschule Hottingen.
