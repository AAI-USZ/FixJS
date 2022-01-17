function AreaSummary(map, area) {
      var neBound, swBound,
        _this = this;
      swBound = new google.maps.LatLng(area.swLat, area.swLng);
      neBound = new google.maps.LatLng(area.neLat, area.neLng);
      this.bounds_ = new google.maps.LatLngBounds(swBound, neBound);
      this.area_ = area;
      this.div_ = null;
      this.height_ = 80;
      this.width_ = 150;
      this.template = "";
      $.get('assets/javascripts/templates/areasSummary._', function(e) {
        _this.template = _.template(e);
        return _this.setMap(map);
      });
    }