function (newValue) {
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        this._isRelativeAnchorPoint = newValue;

        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }