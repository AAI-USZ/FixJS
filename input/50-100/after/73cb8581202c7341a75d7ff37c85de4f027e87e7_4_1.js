function (tv) {
        tv.pos = this._position;
        tv.scale.x = this._scaleX;
        tv.scale.y = this._scaleY;
        tv.rotation = this._rotation;
        tv.skew.x = this._skewX;
        tv.skew.y = this._skewY;
        tv.ap = this._anchorPointInPoints;
        tv.visible = this._isVisible;
        return tv
    }