function (sy) {
        cc.Node.prototype.setSkewY.call(this,sy);
        this.SET_DIRTY_RECURSIVELY();
    }