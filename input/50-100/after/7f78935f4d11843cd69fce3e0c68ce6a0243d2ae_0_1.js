function(propertyChanged) {
        ++this._propertiesChanged[propertyChanged];
        var c = this._collection;
        if (c) {
            c._updatePolyline(propertyChanged, this);
            this._dirty = true;
        }
    }