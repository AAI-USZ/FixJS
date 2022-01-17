function() {
    // Only move/zoom the map if the ward changes
    if (this.dataSource.filterConditions.area !== this.selectedArea) {
      if (this.dataSource.filterConditions.area == null) {
        // if ward == null, then entire city... so use out defaults
        this.map.setView(new L.LatLng(this.defaultView.center[0], this.defaultView.center[1]), this.defaultView.zoom);
      }
      else {
        // build up an array of LatLngs and then generate our bounding box from it
        // TODO: Make this more performant
        var requestsInWard = [];
        $.each(this._mapped, function(index, request) {
          requestsInWard.push(new L.LatLng(request.lat, request.long))
        });
        var wardBoundary = new L.LatLngBounds(requestsInWard);
        console.log(wardBoundary);
        this.map.fitBounds(wardBoundary);
      }
    }
  }