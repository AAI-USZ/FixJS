function() {
        if (this.checked) {
          return Updater.timeoutID = setTimeout(Updater.timeout, 100);
        } else {
          return clearTimeout(Updater.timeoutID);
        }
      }