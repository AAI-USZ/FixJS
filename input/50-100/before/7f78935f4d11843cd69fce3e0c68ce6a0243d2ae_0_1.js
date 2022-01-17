function(propertyChanged) {
        ++this._propertiesChanged[propertyChanged];
        if (!this._dirty) {
            var c = this._collection;
            if (c) {
                c._updatePolyline(propertyChanged, this);
                this._dirty = true;
            }
        }
    }