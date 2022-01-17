function (nodePoint) {
        var anchorInPoints = new cc.Point();
        if (cc.CONTENT_SCALE_FACTOR() == 1) {
            anchorInPoints = this._anchorPointInPixels;
        } else {
            anchorInPoints = cc.ccpMult(this._anchorPointInPixels, 1 / cc.CONTENT_SCALE_FACTOR());
        }
        var pt = new cc.Point();
        pt = cc.ccpAdd(nodePoint, anchorInPoints);
        return this.convertToWorldSpace(pt);
    }