function () {
      var loc = this.toJSON();
      if (loc.lat !== null && loc.lon !== null) {
        this.sendServer(loc);
      }
    }