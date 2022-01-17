function (child, z) {
        var a = this._children[this._children.length - 1];
        if (!a || a.getZOrder() <= z) {
            this._children.push(child);
        } else {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node && (node.getZOrder() > z )) {
                    this._children = cc.ArrayAppendObjectToIndex(this._children, child, i);
                    break;
                }
            }
        }
        child._setZOrder(z);
    }