function(mimeType, quality) {
        var bufferCanvas = this.getStage().bufferCanvas;
        var bufferContext = bufferCanvas.getContext();
        bufferCanvas.clear();
        this._draw(bufferCanvas);

        try {
            // If this call fails (due to browser bug, like in Firefox 3.6),
            // then revert to previous no-parameter image/png behavior
            return bufferCanvas.element.toDataURL(mimeType, quality);
        }
        catch(e) {
            return bufferCanvas.element.toDataURL();
        }
    }