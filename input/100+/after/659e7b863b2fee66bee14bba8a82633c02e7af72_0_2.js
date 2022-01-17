function(filters){
      var that = this;

      var clickEvent = function() {
        that._toggleLayer(GFW.app);
      };

      var zoomEvent = function() {
        if (that.layer.attributes['visible']) {
          //that._map.fitBounds(that._bounds);
        }
      };

      Filter.addFilter(this.layer.get('id'), this.layer.get('slug'), this.layer.get('category_name'), this.layer.get('title'), { clickEvent: clickEvent, zoomEvent: zoomEvent, source: this.layer.get('source') });

      // Adds the layers from the hash
      if (filters && _.include(filters, this.layer.get('id'))) {
        GFW.app._addLayer(this.layer);
        this.layer.attributes["visible"] = true;

        Filter.check(this.layer.get('id'));
        Legend.toggleItem(this.layer.get('id'), this.layer.get('slug'), this.layer.get('title'), this.layer.get('category_name'), this.layer.get('title_color'), this.layer.get('title_subs'), true);
      } else if (this.layer.get('table_name') == 'gfw2_forma') {
          //show the legend on map start for forma
          Legend.toggleItem(this.layer.get('id'), this.layer.get('slug'), this.layer.get('title'), this.layer.get('category_name'), this.layer.get('title_color'), this.layer.get('title_subs'), true);
      }

    }