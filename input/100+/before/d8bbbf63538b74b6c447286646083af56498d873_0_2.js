function() {
        try {
            var stage = this.getStage();
            var bufferLayer = stage.bufferLayer;
            var bufferLayerContext = bufferLayer.getContext();
            var width = stage.getWidth();
            var height = stage.getHeight();

            bufferLayer.clear();
            this._draw(bufferLayer);
            var imageData = bufferLayerContext.getImageData(0, 0, width, height);
            this.imageData = imageData;
        }
        catch(e) {
            Kinetic.Global.warn('Image data could not saved because canvas is dirty.');
        }
    }