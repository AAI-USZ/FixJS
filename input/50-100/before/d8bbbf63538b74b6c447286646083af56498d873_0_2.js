function(mimeType, quality) {
        var bufferLayer = this.getStage().bufferLayer;
        var bufferCanvas = bufferLayer.getCanvas();
        var bufferContext = bufferLayer.getContext();
        bufferLayer.clear();
        this._draw(bufferLayer);

        try {
            // If this call fails (due to browser bug, like in Firefox 3.6),
            // then revert to previous no-parameter image/png behavior
            return bufferLayer.getCanvas().toDataURL(mimeType, quality);
        }
        catch(e) {
            return bufferLayer.getCanvas().toDataURL();
        }
    }