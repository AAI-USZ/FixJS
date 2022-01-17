function (nodePoint) {
        var ret = new cc.Point();
        if (cc.CONTENT_SCALE_FACTOR() == 1) {
            ret = cc.PointApplyAffineTransform(nodePoint, this.nodeToWorldTransform());
        }
        else {
            ret = cc.ccpMult(nodePoint, cc.CONTENT_SCALE_FACTOR());
            ret = cc.PointApplyAffineTransform(ret, this.nodeToWorldTransform());
            ret = cc.ccpMult(ret, 1 / cc.CONTENT_SCALE_FACTOR());
        }

        return ret;
    }