function (dt) {
        this.unschedule(this.reorderSprite);

        cc.log("Before reorder--");

        var i = 0;
        var child;
        var nodeChildren = this._node.getChildren();
        for (i = 0; i < nodeChildren.length; i++) {
            child = nodeChildren[i];
            cc.log("tag:" + child.getTag() + "  z: " + child.getZOrder());
        }

        //z-4
        this._node.reorderChild(this._node.getChildren()[0], -6);
        this._node.sortAllChildren();

        cc.log("After reorder--");
        nodeChildren = this._node.getChildren();
        for (i = 0; i < nodeChildren.length; i++) {
            child = nodeChildren[i];
            cc.log("tag:" + child.getTag() + "  z: " +
                child.getZOrder());
        }
    }