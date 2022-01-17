function (dt) {
        this._batchNode.reorderChild(this._sprite4, 4);
        this._batchNode.reorderChild(this._sprite5, 4);
        this._batchNode.reorderChild(this._sprite1, 4);

        this._batchNode.sortAllChildren();

        for (var i = 0; i < this._batchNode.getDescendants(); i++) {
            var child = this._batchNode.getDescendants()[i];
            cc.log("tag:" + child.getTag());
        }
    }