function(map,o) {
      var layer_point = this._findPos(map,o)
        , latlng = map.layerPointToLatLng(layer_point);

      switch (o.e.type) {
        case 'mousemove': if (this.options.featureOver) {
                            return this.options.featureOver(o.e,latlng,{x: o.e.clientX, y: o.e.clientY},o.data);
                          } else {
                            if (this.options.debug) throw('featureOver function not defined');
                          }
                          break;
        case 'click':   if (this.options.featureClick) {
                            this.options.featureClick(o.e,latlng,{x: o.e.clientX, y: o.e.clientY},o.data);
                          } else {
                            if (this.options.debug) throw('featureClick function not defined');
                          }
                          break;
        case 'touchend':  if (this.options.featureClick) {
                            this.options.featureClick(o.e,latlng,{x: o.e.clientX, y: o.e.clientY},o.data);
                          } else {
                            if (this.options.debug) throw('featureClick function not defined');
                          }
                          break;
        default:          break;
      }
    }