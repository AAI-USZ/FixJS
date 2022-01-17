function (provider) {
        self.mapLayer    = new MM.Layer(provider);
        self.map = new MM.Map('map', self.mapLayer, undefined, []);
        self.markerLayer = new MM.MarkerLayer();
        self.map.addLayer(self.markerLayer);


        self.onZoomChange();
        self.onCenterChange();

        self.providerModel.bind('change:provider',self.onProviderChange, self);
        self.mapModel.bind('change:zoom', self.onZoomChange, self);
        self.mapModel.bind('change', self.onCenterChange, self);
      }