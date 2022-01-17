function (worldPoint) {
        var ret = new cc.Point();
        if (cc.CONTENT_SCALE_FACTOR() == 1) {
            ret = cc.PointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
        }
        else {
            ret = cc.ccpMult(worldPoint, cc.CONTENT_SCALE_FACTOR());
            ret = cc.PointApplyAffineTransform(ret, this.worldToNodeTransform());
            ret = cc.ccpMult(ret, 1 / cc.CONTENT_SCALE_FACTOR());
        }
        return ret;
    }