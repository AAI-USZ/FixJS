function (pos) {
        if(pos.x  == 101){
            console.log("before:", pos.x , this._mapTileSize.width,
                this._layerSize.height , pos.y , 1 , this._mapTileSize.height);
        }
        var xy = cc.PointMake(pos.x * this._mapTileSize.width,
            (this._layerSize.height - pos.y - 1) * this._mapTileSize.height);
        if(pos.x  == 101){
            console.log("after:", xy);
        }
        return xy;
    }