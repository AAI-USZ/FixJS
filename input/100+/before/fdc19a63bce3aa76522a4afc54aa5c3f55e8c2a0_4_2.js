function (size) {
        if (!cc.Size.CCSizeEqualToSize(size, this._contentSize)) {
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this._contentSize = size;

            if (cc.CONTENT_SCALE_FACTOR() == 1) {
                this._contentSizeInPixels = this._contentSize;
            }
            else {
                this._contentSizeInPixels = new cc.Size(size.width * cc.CONTENT_SCALE_FACTOR(), size.height * cc.CONTENT_SCALE_FACTOR());
            }

            this._anchorPointInPixels = new cc.Point(this._contentSizeInPixels.width * this._anchorPoint.x,
                this._contentSizeInPixels.height * this._anchorPoint.y);
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this.setNodeDirty();
        }
    }