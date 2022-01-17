function (newRotation) {
        if(this._rotation == newRotation)
            return ;
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        this._rotation = newRotation;
        this._rotationRadians = this._rotation * (Math.PI / 180);
        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }