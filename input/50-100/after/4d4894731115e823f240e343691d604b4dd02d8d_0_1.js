function () {
        var size;
        if (this._textureAtlas.getTexture() instanceof cc.Texture2D) {
            size = this._textureAtlas.getTexture().getContentSize();
        }
        else {
            size = new cc.Size(this._textureAtlas.getTexture().width, this._textureAtlas.getTexture().height);
        }
        this._itemsPerColumn = parseInt(size.height / this._itemHeight);
        this._itemsPerRow = parseInt(size.width / this._itemWidth);
    }