function () {
        this._isCacheDirty = true;
        if (this._parent) {
            this._parent._setNodeDirtyForCache();
        }
    }