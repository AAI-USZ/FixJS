function(callback) {
      var confirmMessage,
        _this = this;
      if (App.localStorageAvailable && this.getConfigFromLocalStorage()) {
        confirmMessage = "I have detected data stored in you local storage, Do you want to load it?";
        return this.confirmBox.initConfirmation(confirmMessage, function(e) {
          if (e) {
            _this.MarkersConfig = _this.getConfigFromLocalStorage();
          } else {
            _this.MarkersConfig = Markers;
          }
          return callback();
        });
      } else {
        this.MarkersConfig = Markers;
        return callback();
      }
    }