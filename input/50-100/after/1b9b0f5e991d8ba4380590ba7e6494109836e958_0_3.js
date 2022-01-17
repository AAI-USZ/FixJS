function() {
        self._map = new OpenLayers.Map("osmMap");
        self._mapnikLayer = new OpenLayers.Layer.OSM("mapnik",null,{});
        
        self._map.addLayer(self._mapnikLayer);
        
        self._zoomMapToDefaultPosition();
      }