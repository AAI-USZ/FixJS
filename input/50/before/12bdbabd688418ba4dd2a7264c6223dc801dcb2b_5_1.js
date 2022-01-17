function (child, cleanup) {
        if (this._usesBatchNode) {
            this._batchNode.removeSpriteFromAtlas(child);
        }
        this._super(child, cleanup);
    }