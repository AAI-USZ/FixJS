function (anchor) {
        cc.Node.prototype.setAnchorPoint.call(this, anchor);
        this.SET_DIRTY_RECURSIVELY();
    }