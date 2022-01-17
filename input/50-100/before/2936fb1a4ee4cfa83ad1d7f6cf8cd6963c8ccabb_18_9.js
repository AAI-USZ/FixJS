function (worldPoint) {
        var nodePoint = this.convertToNodeSpace(worldPoint);
        var anchorInPoints = new cc.Point();
        if (cc.CONTENT_SCALE_FACTOR() == 1) {
            anchorInPoints = this._anchorPointInPixels;
        } else {
            anchorInPoints = cc.ccpMult(this._anchorPointInPixels, 1 / cc.CONTENT_SCALE_FACTOR());
        }
        return cc.ccpSub(nodePoint, anchorInPoints);
    }