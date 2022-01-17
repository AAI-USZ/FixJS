function (scaleX) {
        cc.Node.prototype.setScaleX.call(this, scaleX);
        this.SET_DIRTY_RECURSIVELY();
    }