function() {
        that.LayersObj.each(function(p) {
          that._addLayer(p);
        });

        // TODO: remove the below when real layers arrive
        Filter.addFilter(0, 'regrowth', 'Regrowth', 'Coming soon...', { disabled: true });

      }