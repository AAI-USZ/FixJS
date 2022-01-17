function (rotation) {
        cc.Node.prototype.setRotation.call(this, rotation);
        this.SET_DIRTY_RECURSIVELY();
    }