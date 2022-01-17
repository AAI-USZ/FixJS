function (nodePoint) {
        return cc.PointApplyAffineTransform(nodePoint, this.nodeToWorldTransform());
    }