function (value) {
        this._recursiveDirty = value;
        this.setDirty(value);
        // recursively set dirty
        if (this._children != null) {
            for (var i = 0 ; i < this._children.length;i++) {
                if (this._children[i] instanceof cc.Sprite) {
                    this._children[i].setDirtyRecursively(true);
                }
            }
        }
    }