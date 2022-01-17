function(mimeType, quality) {
        var bufferLayer = this.bufferLayer;
        var bufferCanvas = bufferLayer.getCanvas();
        var bufferContext = bufferLayer.getContext();
        var layers = this.children;
        bufferLayer.clear();
        
        for(var n = 0; n < layers.length; n++) {
            var layer = layers[n];
            var layerUrl;
            try {
                // If this call fails (due to browser bug, like in Firefox 3.6),
                // then revert to previous no-parameter image/png behavior
                layerUrl = layer.getCanvas().toDataURL(mimeType, quality);
            }
            catch(e) {
                layerUrl = layer.getCanvas().toDataURL();
            }

            var imageObj = new Image();
            imageObj.src = layerUrl;
            bufferContext.drawImage(imageObj, 0, 0);
        }

        try {
            // If this call fails (due to browser bug, like in Firefox 3.6),
            // then revert to previous no-parameter image/png behavior
            return bufferLayer.getCanvas().toDataURL(mimeType, quality);
        }
        catch(e) {
            return bufferLayer.getCanvas().toDataURL();
        }
    }