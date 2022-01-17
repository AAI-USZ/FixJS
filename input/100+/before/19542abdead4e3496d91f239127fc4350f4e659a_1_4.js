function(e) {
      var coord, icon, markerCat, markerLink, markerType, newMarkerInfo, otherInfo, parent, this_;
      this_ = $(e.currentTarget);
      parent = this_.closest('.type-menu-item');
      markerLink = parent.find('.marker-type-link');
      markerType = markerLink.attr('data-type');
      markerCat = markerLink.attr('data-cat');
      icon = markerLink.attr('data-icon');
      coord = this.map.getCenter();
      otherInfo = {
        markerCat: markerCat,
        markerType: markerType,
        icon: icon
      };
      newMarkerInfo = {
        desc: "",
        title: "",
        lat: coord.lat(),
        lng: coord.lng(),
        wikiLink: "",
        draggable: true
      };
      return this.addMarker(newMarkerInfo, otherInfo, true);
    }