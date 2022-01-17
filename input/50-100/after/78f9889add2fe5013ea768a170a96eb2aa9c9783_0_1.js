function () {
      var loc = { lat: this.get('lat')
                , lon: this.get('lon')
                , alt: this.get('alt') };
      if (loc.lat !== null && loc.lon !== null && loc.alt !== null) {
        this.sendServer(loc);
      }
    }