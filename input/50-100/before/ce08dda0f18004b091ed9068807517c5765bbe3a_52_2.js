function (child, zOrder) {
        cc.Assert(child != null, "SpriteBatchNode.addChild():the child should not be null");
        cc.Assert(this._children.indexOf(child) > -1, "SpriteBatchNode.addChild():sprite batch node should contain the child");

        if (zOrder == child.getZOrder()) {
            return;
        }

        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        // xxx: instead of removing/adding, it is more efficient ot reorder manually
        this.removeChild(child, false);
        this.addChild(child, zOrder);

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }