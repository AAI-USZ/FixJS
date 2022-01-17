function (newRotation) {
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        this._rotation = newRotation;

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }