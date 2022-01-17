function(value) {
        if (typeof value === 'undefined') {
            throw new DeveloperError('value must not be undefined.', 'value');
            }
        if(this._positions.length !== value.length){
            this._makeDirty(POSITION_SIZE_INDEX);
            }
        this._positions = value;
        this._makeDirty(POSITION_INDEX);
        }