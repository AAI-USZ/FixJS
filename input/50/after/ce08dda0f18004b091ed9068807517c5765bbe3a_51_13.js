function (relative) {
        cc.Assert(!this._batchNode, "ignoreAnchorPointForPosition is invalid in cc.Sprite");
        this._super(relative);
    }