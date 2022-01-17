function (flipX) {
        if (this._flipX != flipX) {
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

            this._flipX = flipX;
            this.setTextureRect(this._rect, this._rectRotated, this._contentSize);

            //save dirty region when after changed
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this.setNodeDirty();
        }
    }