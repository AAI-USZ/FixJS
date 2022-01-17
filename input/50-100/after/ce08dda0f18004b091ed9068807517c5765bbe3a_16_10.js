function (nodePoint) {
        var pt = cc.ccpAdd(nodePoint, this._anchorPointInPoints);
        return this.convertToWorldSpace(pt);
    }