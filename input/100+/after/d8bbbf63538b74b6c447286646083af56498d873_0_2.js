function() {
        try {
            var stage = this.getStage();
            var bufferCanvas = stage.bufferCanvas;
            var bufferContext = bufferCanvas.getContext();
            var width = stage.getWidth();
            var height = stage.getHeight();

            bufferCanvas.clear();
            this._draw(bufferCanvas);
            var imageData = bufferContext.getImageData(0, 0, width, height);
            this.imageData = imageData;
        }
        catch(e) {
            Kinetic.Global.warn('Image data could not saved because canvas is dirty.');
        }
    }