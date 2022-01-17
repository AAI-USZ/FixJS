function (y) {
        this._position.y = y;
        //this._position = new cc.Point(this._position.x, y);
        this.setNodeDirty();
    }