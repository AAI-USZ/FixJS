function (pos) {
        cc.Node.prototype.setPosition.call(this, pos);
        this.SET_DIRTY_RECURSIVELY();
    }