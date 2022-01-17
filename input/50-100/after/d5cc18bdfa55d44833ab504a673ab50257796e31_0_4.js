function() {
        this._dirty = false;
        var properties = this._propertiesChanged;
        for ( var k = 0; k < NUMBER_OF_PROPERTIES - 1; ++k) {
            properties[k] = 0;
        }
    }