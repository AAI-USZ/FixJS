function (cleanup) {
        // Invalidate atlas index. issue #569
        if (this._children && this._children.length > 0) {
            for (var i = 0; i < this._children.length; i++) {
                var obj = this._children[i];
                if (obj) {
                    this.removeSpriteFromAtlas(obj);
                }
            }
        }

        this._super(cleanup);
        this._descendants = [];
        this._textureAtlas.removeAllQuads();
    }