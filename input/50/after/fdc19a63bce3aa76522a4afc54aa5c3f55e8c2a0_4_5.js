function (newValue) {
        if (newValue != this._ignoreAnchorPointForPosition) {
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

            this._ignoreAnchorPointForPosition = newValue;

            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this.setNodeDirty();
        }
    }