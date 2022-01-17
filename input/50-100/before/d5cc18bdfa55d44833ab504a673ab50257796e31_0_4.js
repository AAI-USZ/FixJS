function(other) {
        return other &&
               (this._show === other._show) &&
               (shallowEquals(this._positions, other._positions)) &&
               (this._width === other._width) &&
               (this._outlineWidth === other._outlineWidth) &&
               (shallowEquals(this._color, other._color)) &&
               (shallowEquals(this._outlineColor, other._outlineColor));
    }