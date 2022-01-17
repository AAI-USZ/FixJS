function (child, zOrder) {
        cc.Assert(child != null, "Child must be non-nil");
        this._reorderChildDirty = true;

        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        child.setOrderOfArrival(cc.s_globalOrderOfArrival++);
        child._setZOrder(zOrder);

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }