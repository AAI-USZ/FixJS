function () {
        if (this._batchNode && !this._recursiveDirty) {
            this._recursiveDirty = true;
            this.setDirty(true);
            if (this._hasChildren)
                this.setDirtyRecursively(true);
        }
    }