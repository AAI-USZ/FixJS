function (newPosOrxValue, yValue) {
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        if (typeof(newPosOrxValue) == 'number') {
            this._position = new cc.Point(newPosOrxValue, yValue || 0);
        } else if (newPosOrxValue instanceof  cc.Point) {
            this._position = newPosOrxValue;
        }

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }