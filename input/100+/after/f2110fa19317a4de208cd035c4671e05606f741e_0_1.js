function hideTray(evt) {
              window.removeEventListener('appopen', hideTray);
              UtilityTray.hide();
            }