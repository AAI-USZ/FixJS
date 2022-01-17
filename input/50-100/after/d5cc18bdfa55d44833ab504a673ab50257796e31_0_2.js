function(value) {
        var width = this._outlineWidth;

        if ((typeof value !== 'undefined') && (value !== width)) {
            this._collection._removeFromMap(this);
            this._outlineWidth = value;
            this._collection._addToMap(this);
        }
    }