function(layer, map) {
      this.layer = layer;
      this._map = map;

      var sw = new google.maps.LatLng(this.layer.get('ymin'), this.layer.get('xmin'));
      var ne = new google.maps.LatLng(this.layer.get('ymax'),this.layer.get('xmax'));
      this._bounds = new google.maps.LatLngBounds(sw, ne);

      if (this.layer.get('slug') != 'semi_monthly'){
        this.layer.attributes['visible'] = false;
      }

      var
      State   = History.getState(),
      hash    = parseHash(State.hash),
      filters = [];

      if (hash.filters) {
        filters = _.map(hash.filters.split(","), function(i) { return parseInt(i, 10); });
      }

      this._addControl(filters);

    }