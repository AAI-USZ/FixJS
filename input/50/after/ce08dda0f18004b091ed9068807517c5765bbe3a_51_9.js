function (scale, scaleY) {
        cc.Node.prototype.setScale.call(this, scale);
        this.SET_DIRTY_RECURSIVELY();
    }