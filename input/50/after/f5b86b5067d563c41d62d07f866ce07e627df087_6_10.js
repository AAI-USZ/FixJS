function (visible) {
        cc.Node.prototype.setVisible.call(this,visible);
        this.SET_DIRTY_RECURSIVELY();
    }