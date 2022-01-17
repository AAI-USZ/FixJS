function () {
      var waypt = this.metaWaypointModel.get('waypoint');
      if (waypt) {
        this.set({ alt: waypt.alt, lat: waypt.lat, lon: waypt.lon }); 
      }
    }