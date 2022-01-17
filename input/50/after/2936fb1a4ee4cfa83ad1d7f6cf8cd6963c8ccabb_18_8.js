function () {
        var rect = cc.RectMake(0, 0, this._contentSize.width, this._contentSize.height);
        return cc.RectApplyAffineTransform(rect, this.nodeToParentTransform());
    }