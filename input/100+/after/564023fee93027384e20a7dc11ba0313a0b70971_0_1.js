function(polylineTemplate, polylineCollection) {
        var p = polylineTemplate || {};

        this._positions = [];
        if (typeof p.positions !== 'undefined') {
            var newPositions = p.positions;
            var length = newPositions.length;
            var positions = this._positions;
            for ( var i = 0; i < length; ++i) {
                var position = newPositions[i];
                positions.push(new Cartesian3(position.x, position.y, position.z));
            }
        }
        this._show = (typeof p.show === 'undefined') ? true : p.show;
        this._width = (typeof p.width === 'undefined') ? 1.0 : p.width;
        this._outlineWidth = (typeof p.outlineWidth === 'undefined') ? 1.0 : p.outlineWidth;
        this._color = (typeof p.color === 'undefined') ?
                new Color(1.0, 1.0, 1.0, 1.0) :
                Color.clone(p.color);

        this._outlineColor = (typeof p.outlineColor === 'undefined') ?
                new Color(1.0, 1.0, 1.0, 1.0) :
                Color.clone(p.outlineColor);

        this._propertiesChanged = new Uint32Array(NUMBER_OF_PROPERTIES);
        this._collection = polylineCollection;
        this._dirty = false;
        this._pickId = undefined;
        this._pickIdThis = p._pickIdThis;
    }