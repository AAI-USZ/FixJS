function (cleanup) {
        if (this._parent)
            this._parent.removeChild(this, cleanup);
    }