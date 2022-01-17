function(layer) {
        
        var extent;
        
        /*
         * Paranoid mode
         */
        if (!layer || !layer["_msp"]) {
            return false;
        }
        
        /*
         * mapshup special layers (i.e. mspLayer = true) and
         * initial layers are not processed
         */
        if (!this["_msp"].mspLayer && !this["_msp"].initialLayer) {
            return false;
        }
        
        /*
         * Only zoom on layer that are initialized and that specify it 
         */
        if (layer["_msp"].zoomOnAfterLoad && !layer["_msp"].initialized) {

            /*
             * Vector layers have a getDataExtent() function that returns bounds
             * Raster layer such as WMS or Image should have a ["_msp"].bounds property
             * set during initialization
             */
            extent = layer.getDataExtent() || layer["_msp"].bounds;
            if (extent) {

                /*
                 * Centering is done only if the entire layer or part of the layer
                 * is not visible within the map view
                 */
                if (!msp.Map.map.getExtent().intersectsBounds(extent, true)) {
                    msp.Map.zoomTo(extent);
                    return true;
                }

            }
        }
        
        return false;
        
    }