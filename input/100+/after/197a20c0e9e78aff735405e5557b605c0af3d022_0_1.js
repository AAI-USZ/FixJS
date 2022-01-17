function() {
    // Only move/zoom the map if the ward changes
    if (this.dataSource.filterConditions.area !== this.selectedArea) {
      this.selectedArea = this.dataSource.filterConditions.area;

      if (this.dataSource.filterConditions.area == null) {
        // if ward == null, then entire city... so use out defaults
        this.map.setView(new L.LatLng(this.defaultView.center[0], this.defaultView.center[1]), this.defaultView.zoom);
      }
      else {
        // build up an array of LatLngs and then generate our bounding box from it
        var requestsInWard = [];
        var allRequests = this.dataSource.requests['open']
                                       .concat(this.dataSource.requests['opened'], 
                                               this.dataSource.requests['closed'])
        $.each(allRequests, function(index, request) {
          requestsInWard.push(new L.LatLng(request.lat, request.long))
        });
        if (requestsInWard.length > 0) {
          var wardBoundary = new L.LatLngBounds(requestsInWard);
          this.map.fitBounds(wardBoundary);
        }
      }
    }
  }