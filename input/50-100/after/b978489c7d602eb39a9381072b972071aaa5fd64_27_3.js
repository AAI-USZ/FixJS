function (cleanup) {
        // Invalidate atlas index. issue #569
        // useSelfRender should be performed on all descendants. issue #1216
        var i;
        if (this._descendants && this._descendants.length > 0) {
            for (i = 0; i < this._descendants.length; i++) {
                if (this._descendants[i]) {
                    this._descendants.setBatchNode(null);
                }
            }
        }

        this._super(cleanup);
        this._descendants = [];
        this._textureAtlas.removeAllQuads();
    }