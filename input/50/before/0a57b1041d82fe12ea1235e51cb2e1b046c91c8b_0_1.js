function (opacity) {
        this._opacity = opacity;
        return;
        // special opacity for premultiplied textures
        if (this._isOpacityModifyRGB) {
            this.setColor(this._colorUnmodified);
        }
    }