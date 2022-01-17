function (relative) {
        cc.Assert(!this._usesBatchNode, "ignoreAnchorPointForPosition is invalid in CCSprite");
        this._super(relative);
    }