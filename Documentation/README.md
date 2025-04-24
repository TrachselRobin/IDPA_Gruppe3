# Raspberry Pi 5 Autostart Anleitung: Eigene App oder Webseite beim Systemstart starten

Diese Anleitung zeigt dir Schritt für Schritt, wie du auf einem **Raspberry Pi 5** den Abfahrtsbildschirm automatisch beim Start anzeigen lassen kannst.

---

## Voraussetzungen

### Hardware:
- **Raspberry Pi 5** mit Stromversorgung
- **Internetverbindung** (LAN oder WLAN)
- **Bildschirm** (via USB-C zu HDMI/DisplayPort/etc.)
- Tastatur und Maus (zum Einrichten; danach nicht mehr nötig)
- microSD-Karte mit installierter Software

### Software:
- Aktuelles Raspberry Pi OS Desktop (Stand April 2025):
  **Raspberry Pi OS Bookworm (64-bit)**  
  Download: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/) (Benutze den Raspberrry Pi Imager)

**⚠️ Achte darauf:** Wenn der Raspberry Pi 5 über keinen GPS Sensor verfügt (standard), stellen Sie im Chromium-Browser unter den Einstellungen ein, dass alle Zugriffe auf die aktuelle Location geblockt werden sollen. Das verhindert, dass bei Start des Raspberry Pi jedes mal gefragt wird, ob dieses File auf die Position zugreiffen darf.

---

## Schritt-für-Schritt Anleitung

### 1. Aktuellen User herausfinden und ins Home-Verzeichnis wechseln

Öffne ein Terminal und tippe:

```bash
whoami
cd ~
```

`whoami` zeigt den Namen des aktuellen Benutzers (wird später benötigt). \
`cd ~` wechselt automatisch in das Home-Verzeichnis des Benutzers.

---

### 2. Skript-Datei start_app.sh erstellen

```bash
nano start_app.sh
```

Füge folgenden Inhalt ein:

```bash
#!/bin/bash

# Pfad zum Git-Repository
REPO_DIR="$HOME/IDPA_Gruppe3"

# Falls das Verzeichnis esitiert, Repository updaten, sonst klonen
if [ -d "$REPO_DIR" ]; then
    cd "$REPO_DIR"
    git pull origin main
else
    git clone https://github.com/TrachselRobin/IDPA_Gruppe3.git "$REPO_DIR"
fi

TARGET_FILE="$REPO_DIR/src/index.html"

chromium-browser --noerrdialogs --disable-infobars --kiosk "$TARGET_FILE"
```
*Diese Datei sorgt dafür, dass immer die neueste Version des Git-Repositories lokal vorhanden ist. Anschließend wird der Abfahrtsbildschirm im Browser gestartet.*

Speichern mit [Strg + S], beenden mit [Strg + X].

Dann ausführbar machen:

```bash
chmod +x start_app.sh
```

---

### 3. Autostart mit systemd einrichten
#### 3.1 Neue systemd Service-Datei erstellen

```bash
sudo nano /etc/systemd/system/autostart_app.service
```

#### 3.2 Folgenden Inhalt einfügen:
```
[Unit]
Description=Führt das File start_app.sh aus
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
User=BENUTZERNAME
Environment=DISPLAY=:0
Environment=XAUTHORITY=/home/BENUTZERNAME/.Xauthority
ExecStart=/home/BENUTZERNAME/start_app.sh
WorkingDirectory=/home/BENUTZERNAME

[Install]
WantedBy=graphical.target
```

**⚠️ Achte darauf:** ändere alle Vorkommende "BENUTZERNAME" zu dem tatsächlichen Benutzernamen ab (`whoami`)

#### 3.3 systemd aktivieren

```bash
sudo systemctl daemon-reload
sudo systemctl enable autostart_app.service
```

#### 3.4 Optional: Direkt testen
Du kannst den Dienst direkt starten:

```bash
sudo systemctl start autostart_app.service
```

Und seinen Status überprüfen:

```bash
sudo systemctl status autostart_app.service
```

---

## Ergebnis
Beim nächsten Neustart sollte automatisch Chromium im Kiosk-Modus mit dem gewünschten Abfahrtsbildschirm angezeigt werden. Falls Sie gerne einzelne Parameter anpassen wollen, wie beispielsweise einen anderen Abfahrtsort, finden Sie eine weitere Dokumentation unter "/src".
