function (dt) {
        this.unschedule(this.reorderSprite);

        cc.Log("Before reorder--");

        var i = 0;
        var child;
        var nodeChildren = this._node.getChildren();
        for (i = 0; i < nodeChildren.length; i++) {
            child = nodeChildren[i];
            cc.Log("tag:" + child.getTag() + "  z: " + child.getZOrder());
        }

        //z-4
        this._node.reorderChild(this._node.getChildren()[0], -6);
        this._node.sortAllChildren();

        cc.Log("After reorder--");
        nodeChildren = this._node.getChildren();
        for (i = 0; i < nodeChildren.length; i++) {
            child = nodeChildren[i];
            cc.Log("tag:" + child.getTag() + "  z: " +
                child.getZOrder());
        }
    }