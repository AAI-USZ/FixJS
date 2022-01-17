function (color3) {
        if ((this._color.r == color3.r)&&(this._color.g == color3.g)&&(this._color.b == color3.b)) {
            return;
        }
        this._color = color3;
        if (this.getTexture()) {
            if (cc.renderContextType == cc.CANVAS) {
                var cacheTextureForColor = cc.TextureCache.sharedTextureCache().getTextureColors(this._originalTexture);
                if (cacheTextureForColor) {
                    //generate color texture cache
                    var tx = this.getTexture();
                    var textureRect = new cc.Rect(0,0,tx.width,tx.height);
                    var colorTexture = cc.generateTintImage(tx, cacheTextureForColor, this._color,textureRect);
                    var img = new Image();
                    img.src = colorTexture.toDataURL();
                    this.setTexture(img);
                }
            }
        }
    }