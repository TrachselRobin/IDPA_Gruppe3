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