function() {
        self._map = new OpenLayers.Map("osmMap");
        var mapnik = new OpenLayers.Layer.OSM("mapnik",null,{});
        
        self._map.addLayer(mapnik);
        self._getGeoPosition();
      }