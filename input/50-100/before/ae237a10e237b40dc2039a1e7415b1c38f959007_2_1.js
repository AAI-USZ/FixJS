function (map) {
        /* Need to do something to bind models to these handlers before
         * passing them to be initialzed by the MM.Map constructor... */
        self.mapHandlers =  [
          new MMHandlers.MouseWheelHandler( self.map, self.mapModel ),
          new MMHandlers.TouchHandler( self.map, self.mapModel, self.guideModel ),
          new MMHandlers.MouseWheelHandler( self.map, self.mapModel ),
        ]
    }