function ss_onsuccess() {
          // Vibrate again when the screenshot is saved
          navigator.mozVibrate(100);

          // Display filename in a notification
          navigator.mozNotification
            .createNotification(_('screenshotSaved'), filename)
            .show();
        }