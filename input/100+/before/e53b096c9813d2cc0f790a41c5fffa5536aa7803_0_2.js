function (color3) {
        this._color = this._colorUnmodified = color3;

        if (this.getTexture()) {
            if (cc.renderContextType == cc.CANVAS) {
                var cacheTextureForColor = cc.TextureCache.sharedTextureCache().getTextureColors(this._originalTexture);
                if (cacheTextureForColor) {
                    //generate color texture cache
                    var colorTexture = cc.generateTintImage(this.getTexture(), cacheTextureForColor, this._color);
                    //console.log(colorTexture)
                    this.setTexture(colorTexture);
                }
            }
        }

        if (this._isOpacityModifyRGB) {
            this._color.r = color3.r * this._opacity / 255;
            this._color.g = color3.g * this._opacity / 255;
            this._color.b = color3.b * this._opacity / 255;
        }
    }