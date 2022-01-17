function (newFrame) {
        this.setNodeDirty();
        this._unflippedOffsetPositionFromCenter = newFrame.getOffset();
        var pNewTexture = newFrame.getTexture();
        // update texture before updating texture rect
        if (pNewTexture != this._texture) {
            this.setTexture(pNewTexture);
        }
        // update rect
        this._rectRotated = newFrame.isRotated();
        if (this._rectRotated)
            this.setRotation(-90);
        this.setTextureRect(newFrame.getRect(), this._rectRotated, newFrame.getOriginalSize());
        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
    }