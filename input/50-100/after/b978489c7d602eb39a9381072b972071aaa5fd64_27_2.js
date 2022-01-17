function (child, zOrder) {
        cc.Assert(child != null, "SpriteBatchNode.addChild():the child should not be null");
        cc.Assert(this._children.indexOf(child) > -1, "SpriteBatchNode.addChild():Child doesn't belong to Sprite");

        if (zOrder == child.getZOrder()) {
            return;
        }

        //save dirty region when before change
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        //set the z-order and sort later
        this._super(child, zOrder);

        //save dirty region when after changed
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }