function (child, zOrder) {
        cc.Assert(child != null, "Child must be non-nil");

        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        cc.ArrayRemoveObject(this._children, child);
        this._insertChild(child, zOrder);

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }