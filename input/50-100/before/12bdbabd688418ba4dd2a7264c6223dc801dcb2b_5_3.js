function (value) {
        this._dirty = this._recursiveDirty = value;
        // recursively set dirty
        if (this._children != null) {
            for (var i in this._children) {
                if (this._children[i] instanceof cc.Sprite) {
                    this._children[i].setDirtyRecursively(true);
                }
            }
        }
    }