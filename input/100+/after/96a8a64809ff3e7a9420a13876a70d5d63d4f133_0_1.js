function(rid, data){

      // CartoDB Uploaded Polygon Layer
      var sql = "SELECT the_geom_webmercator, class_id FROM " + window.CARTODB_TABLE + " WHERE layer_id = " + data.id;
      sql = sql + data.class_where_clause();

      if (this.map.userLayers[data.id] === undefined || this.map.userLayers[data.id].changed){
        var tileStr = '';
        _.each(data.classes, function(ele){
          tileStr += '#' + window.CARTODB_TABLE + '[class_id=' + ele[2] + ']{polygon-fill:' + ele[1] +';polygon-opacity:0.7;line-width:0} ';
        }); 

        var cartodbLayerParams = {
          map_canvas: 'map_canvas',
          map: this.map.map,
          user_name: 'carbon-tool',
          table_name: window.CARTODB_TABLE,
          query: sql,
          tile_style: tileStr,
          visible: true,
          changed: false
        };
        // map_style: true
        
        // Add the user layers to the map view, so they can be appended after the 'stat' layers
        this.map.userLayers[data.id] = $.extend({}, cartodbLayerParams);
        this.map.reorder_layers();
      }
    }