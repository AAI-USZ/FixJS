function () {
        var size = this._textureAtlas.getTexture().getContentSize();
        this._itemsPerColumn = parseInt(size.height / this._itemHeight);
        this._itemsPerRow = parseInt(size.width / this._itemWidth);
    }