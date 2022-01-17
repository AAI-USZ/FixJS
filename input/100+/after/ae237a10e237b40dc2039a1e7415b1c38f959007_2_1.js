function (provider) {
        self.mapLayer    = new MM.Layer(provider);

        self.mapHandlers =
          [ new MMHandlers.MouseWheelHandler( self.mapModel )
          , new MMHandlers.TouchHandler( self.mapModel, self.guideModel )
          , new MMHandlers.DoubleClickHandler( self.guideModel )
          ];
        self.map = new MM.Map('map', self.mapLayer, undefined,self.mapHandlers);
        self.markerLayer = new MM.MarkerLayer();
        self.map.addLayer(self.markerLayer);


        self.onZoomChange();
        self.onCenterChange();

        self.providerModel.bind('change:provider',self.onProviderChange, self);
        self.mapModel.bind('change:zoom', self.onZoomChange, self);
        self.mapModel.bind('change', self.onCenterChange, self);
      }