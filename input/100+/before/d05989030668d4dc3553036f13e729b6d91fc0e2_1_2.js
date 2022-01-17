function (label) {
        var len = label.length;
        this._textureAtlas.resizeCapacity(len);

        this._string = label;
        this.updateAtlasValues();

        var s = new cc.Size();
        s.width = len * this._itemWidth;
        s.height = this._itemHeight;
        this.setContentSizeInPixels(s);

        this._quadsToDraw = len;
    }