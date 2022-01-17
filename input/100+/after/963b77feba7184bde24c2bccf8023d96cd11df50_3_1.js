function ss_onMozChromeEvent(e) {
    try {
      if (e.detail.type === 'take-screenshot-success') {
        var storage = navigator.getDeviceStorage('pictures')[0];
        if (!storage) { // If we don't have an SD card to save to, send an error
          navigator.mozNotification
            .createNotification(_('screenshotFailed'), _('screenshotNoSDCard'))
            .show();
          return;
        }

        var filename = 'screenshots/' +
          new Date().toISOString().slice(0, -5).replace(/[:T]/g, '-') +
          '.png';

        var saveRequest = storage.addNamed(e.detail.file, filename);
        saveRequest.onsuccess = function ss_onsuccess() {
          // Vibrate again when the screenshot is saved
          navigator.mozVibrate(100);

          // Display filename in a notification
          navigator.mozNotification
            .createNotification(_('screenshotSaved'), filename)
            .show();
        };
        saveRequest.onerror = function ss_onerror() {
          navigator.mozNotification
            .createNotification(_('screenshotFailed'), saveRequest.error.name)
            .show();
        };
      }
      else if (e.detail.type === 'take-screenshot-error') {
        navigator.mozNotification
          .createNotification(_('screenshotFailed'), e.detail.error)
          .show();
      }
    }
    catch (e) {
      console.log('exception in screenshot handler', e);
    }
  }