function () {
        if(this._isCacheDirty)
            return;

        this._isCacheDirty = true;
        if (this._parent) {
            this._parent._setNodeDirtyForCache();
        }
    }