function() {
        var layer = this.layer = new L.CartoDBLayer({
          map: this.map,
          cdn_url: this.options.cdn_url,
          user_name: this.options.user_name,
          table_name: this.options.table_name,
          query: this.options.restaurants_query,
          interactivity: this.options.interactivity,
          featureOver: this._featureOver,
          featureOut: this._featureOut,
          featureClick: this._featureClick,
          auto_bound: false
        });

        this.hoverCircle = new L.CircleMarker(new L.LatLng(-180,-180),{weight:4, fillColor: "red", fillOpacity: 1, clickable: false, opacity: 1, stroke: false});

        this.map.addLayer(layer)
      }