function (child, cleanup) {
        // explicit nil handling
        if (this._children == null) {
            return;
        }

        if (this._children.indexOf(child) > -1) {
            this._detachChild(child, cleanup);
        }

        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }