function () {

      // Then add the cartodb tiles
      var tile_style = (this.options.tile_style)? encodeURIComponent(this.options.tile_style.replace(/\{\{table_name\}\}/g,this.options.table_name)) : ''
        , query = encodeURIComponent(this.options.query.replace(/\{\{table_name\}\}/g,this.options.table_name));

      // Add the cartodb tiles
      var cartodb_url = this.generateUrl("tiler") + '/tiles/' + this.options.table_name + '/{z}/{x}/{y}.png?sql=' + query +'&style=' + tile_style;
      this.layer = new L.TileLayer(cartodb_url,{attribution:'CartoDB', opacity: this.options.opacity});

      this.options.map.addLayer(this.layer,false);
    }