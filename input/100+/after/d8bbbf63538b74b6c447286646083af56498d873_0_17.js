function() {
        var pos = Kinetic.Type._getXY(Array.prototype.slice.call(arguments));
        var stage = this.getStage();

        // path detection
        if(this.attrs.detectionType === 'path') {
            var pathCanvas = stage.pathCanvas;
            var pathCanvasContext = pathCanvas.getContext();

            this._draw(pathCanvas);

            return pathCanvasContext.isPointInPath(pos.x, pos.y);
        }

        // pixel detection
        if(this.imageData) {
            var w = stage.attrs.width;
            var alpha = this.imageData.data[((w * pos.y) + pos.x) * 4 + 3];
            return (alpha);
        }

        // default
        return false;
    }