function () {
        var s = this._textureAtlas.getTexture();
        this._itemsPerColumn = parseInt(s.height / this._itemHeight);
        this._itemsPerRow = parseInt(s.width / this._itemWidth);
    }