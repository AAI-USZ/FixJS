function (child, zOrder) {
        cc.Assert(child != null, "child is null");
        cc.Assert(this._children.indexOf(child) > -1, "");

        if (zOrder == child.getZOrder()) {
            return;
        }

        if (this._usesBatchNode) {
            // XXX: Instead of removing/adding, it is more efficient to reorder manually
            this.removeChild(child, false);
            this.addChild(child, zOrder);
        }
        else {
            this._super(child, zOrder);
        }
    }