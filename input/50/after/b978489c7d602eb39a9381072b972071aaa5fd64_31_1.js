function (id, x, y) {
        this._prevPoint = this._point;
        this._point = new cc.Point(x || 0, y || 0);
        this._id = id;
    }