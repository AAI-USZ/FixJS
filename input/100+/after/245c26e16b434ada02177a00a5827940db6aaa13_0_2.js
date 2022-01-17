function () {
      var core_url = this.generateUrl("tiler");  
      var base_url = core_url + '/tiles/' + this.options.table_name + '/{z}/{x}/{y}';
      var tile_url = base_url + '.png';
      var grid_url = base_url + '.grid.json';
      
      // SQL?
      if (this.options.query) {
        var query = 'sql=' + encodeURIComponent(this.options.query.replace(/\{\{table_name\}\}/g,this.options.table_name));
        tile_url = this._addUrlData(tile_url, query);
        grid_url = this._addUrlData(grid_url, query);
      }
      
      // extra_params? 
      for (_param in this.options.extra_params) {
        tile_url = this._addUrlData(tile_url, _param+"="+this.options.extra_params[_param]);
        grid_url = this._addUrlData(grid_url, _param+"="+this.options.extra_params[_param]);
      }


      // STYLE?
      if (this.options.tile_style) {
        var style = 'style=' + encodeURIComponent(this.options.tile_style.replace(/\{\{table_name\}\}/g,this.options.table_name));
        tile_url = this._addUrlData(tile_url, style);
        grid_url = this._addUrlData(grid_url, style);
      }

      // INTERACTIVITY?
      if (this.options.interactivity) {
        var interactivity = 'interactivity=' + encodeURIComponent(this.options.interactivity.replace(/ /g,''));
        tile_url = this._addUrlData(tile_url, interactivity);
        grid_url = this._addUrlData(grid_url, interactivity);
      }
      
      // Build up the tileJSON
      return {
        blankImage: '../img/blank_tile.png', 
        tilejson: '1.0.0',
        scheme: 'xyz',
        tiles: [tile_url],
        grids: [grid_url],
        tiles_base: tile_url,
        grids_base: grid_url,
        opacity: this.options.opacity,
        formatter: function(options, data) {
          return data
        }
      };
    }