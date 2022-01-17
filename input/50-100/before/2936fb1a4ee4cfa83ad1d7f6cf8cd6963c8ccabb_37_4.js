function (newFrame) {
        this.setNodeDirty();
        this._unflippedOffsetPositionFromCenter = newFrame.getOffsetInPixels();
        var pNewTexture = newFrame.getTexture();
        // update texture before updating texture rect
        if (pNewTexture != this._texture) {
            this.setTexture(pNewTexture);
        }
        // update rect
        this._rectRotated = newFrame.isRotated();
        if (this._rectRotated)
            this.setRotation(-90);
        this.setTextureRectInPixels(newFrame.getRectInPixels(), newFrame.isRotated(), newFrame.getOriginalSizeInPixels());
        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
    }