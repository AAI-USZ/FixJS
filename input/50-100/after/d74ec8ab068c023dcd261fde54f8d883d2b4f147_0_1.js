function(mimeType, quality) {
        var bufferCanvas = this.getStage().bufferCanvas;
        var bufferContext = bufferCanvas.getContext();
        bufferCanvas.clear();
        this._draw(bufferCanvas);
        return bufferCanvas.toDataURL(mimeType, quality);
    }