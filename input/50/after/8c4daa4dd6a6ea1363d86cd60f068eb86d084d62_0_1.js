function() {
        if ('device' in window) {
          // PhoneGap writes device info straight to window
          mulberry.Device.osVersion = window.device.version;
        }
        dojo.unsubscribe(deviceFill);
      }