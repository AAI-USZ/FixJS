function() {

          this._initModels();
          this._initViews();

          // init data
          this.table.fetch();
          this.columns.fetch();
          var URL = 'http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png';
          this.map.addLayer(new cdb.geo.TileLayer({
            urlTemplate: URL
          }));
          this.map.setZoom(4);
          this.map.setCenter([34.30714385628804, 11.6015625]);
        }