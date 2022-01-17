function(value) {
        if (typeof value === 'undefined') {
            throw new DeveloperError('value must not be undefined.', 'value');
        }
        if (this._positions.length !== value.length) {
            this._makeDirty(POSITION_SIZE_INDEX);
        }
        var positions = [];
        for ( var i = 0; i < length; ++i) {
            var position = newPositions[i];
            positions.push(new Cartesian3(position.x, position.y, position.z));
        }
        this._positions = positions;
        this._makeDirty(POSITION_INDEX);
    }