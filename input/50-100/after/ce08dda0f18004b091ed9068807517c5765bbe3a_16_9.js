function (worldPoint) {
        return cc.ccpSub(this.convertToNodeSpace(worldPoint), this._anchorPointInPoints);
    }