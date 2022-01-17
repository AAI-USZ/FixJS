function (point) {
        if (!cc.Point.CCPointEqualToPoint(point, this._anchorPoint)) {
            //save dirty region when before change
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

            this._anchorPoint = point;
            this._anchorPointInPoints = new cc.Point(this._contentSize.width * this._anchorPoint.x,
                this._contentSize.height * this._anchorPoint.y);

            //save dirty region when after changed
            //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
            this.setNodeDirty();
        }
    }