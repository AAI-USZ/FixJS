function (sx) {
        cc.Node.prototype.setSkewX.call(this, sx);
        this.SET_DIRTY_RECURSIVELY();
    }