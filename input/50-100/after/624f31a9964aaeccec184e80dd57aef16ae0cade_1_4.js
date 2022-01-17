function(modeId) {
      var mode = availableModes[modeId];
      if (mode) {
        return mode;
      }
      else {
        console.log("Mode " + modeId + " is not defined, adding it");
        return this.addMode(modeId, {
          name: modeId
        }, true)
      }
    }