function (newPosOrxValue, yValue) {
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        if (yValue) {
            this._position.x = newPosOrxValue;
            this._position.y = yValue;
            //this._position = new cc.Point(newPosOrxValue,yValue);
        } else if (newPosOrxValue instanceof  cc.Point) {
            this._position = newPosOrxValue;
        }

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }