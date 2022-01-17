function (worldPoint) {
        return cc.PointApplyAffineTransform(worldPoint, this.worldToNodeTransform());
    }