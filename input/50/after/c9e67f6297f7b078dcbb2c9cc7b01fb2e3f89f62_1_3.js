function (x) {
        this._position.x = x;
        //this._position = new cc.Point(x,this._position.y);
        this.setNodeDirty();
    }