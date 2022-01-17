function (cleanup) {
        if (this._usesBatchNode) {
            if (this._children != null) {
                for (var i = 0; i < this._children.length; i++) {
                    if (this._children[i] instanceof cc.Sprite) {
                        this._batchNode.removeSpriteFromAtlas(this._children[i]);
                    }
                }
            }
        }

        this._super(cleanup);
        this._hasChildren = false;
    }