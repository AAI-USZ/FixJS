function (newPosition) {
        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        this._position = newPosition;
        if (cc.CONTENT_SCALE_FACTOR() == 1) {
            this._positionInPixels = this._position;
        } else {
            this._positionInPixels = cc.ccpMult(newPosition, cc.CONTENT_SCALE_FACTOR());
        }

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }