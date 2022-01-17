function (child, cleanup) {
        if (this._batchNode) {
            this._batchNode.removeSpriteFromAtlas(child);
        }
        this._super(child, cleanup);
    }