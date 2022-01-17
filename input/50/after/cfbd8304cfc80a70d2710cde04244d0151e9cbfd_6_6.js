function (scaleY) {
        cc.Node.prototype.setScaleY.call(this,scaleY);
        this.SET_DIRTY_RECURSIVELY();
    }