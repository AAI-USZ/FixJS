function (color3) {
        if ((this._color.r == color3.r)&&(this._color.g == color3.g)&&(this._color.b == color3.b)) {
            return;
        }

        this._color = this._colorUnmodified = new cc.Color3B(color3.r, color3.g, color3.b);
        if (this.getTexture()) {
            if (cc.renderContextType == cc.CANVAS) {
                var cacheTextureForColor = cc.TextureCache.sharedTextureCache().getTextureColors(this._originalTexture);
                if (cacheTextureForColor) {
                    //generate color texture cache
                    var colorTexture = cc.generateTintImage(this.getTexture(), cacheTextureForColor, this._color, this.getTextureRect());
                    this.setTexture(colorTexture);
                }
            }
        }

        /*
         if (this._opacityModifyRGB) {
         this._color.r = Math.round(color3.r * this._opacity / 255);
         this._color.g = Math.round(color3.g * this._opacity / 255);
         this._color.b = Math.round(color3.b * this._opacity / 255);
         }
         */
        this.updateColor();
        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        this.setNodeDirty();
    }