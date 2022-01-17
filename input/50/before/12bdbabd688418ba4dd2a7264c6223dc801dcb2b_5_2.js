function () {
        if (this._usesBatchNode && !this._recursiveDirty) {
            this._dirty = this._recursiveDirty = true;
            if (this._hasChildren)
                this.setDirtyRecursively(true);
        }
    }