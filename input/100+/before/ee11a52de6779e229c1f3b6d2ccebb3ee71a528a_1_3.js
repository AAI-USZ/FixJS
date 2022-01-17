function(e) {
      var coord, markerCat, markerLink, markerType, newMarkerInfo, parent, this_;
      this_ = $(e.currentTarget);
      parent = this_.closest('.type-menu-item');
      markerLink = parent.find('.marker-type-link');
      markerType = markerLink.attr('data-type');
      markerCat = markerLink.attr('data-cat');
      coord = this.map.getCenter();
      newMarkerInfo = {
        desc: "",
        title: "",
        lat: coord.lat(),
        lng: coord.lng(),
        wikiLink: "",
        draggable: true
      };
      return this.addMarker(newMarkerInfo, markerType, markerCat);
    }