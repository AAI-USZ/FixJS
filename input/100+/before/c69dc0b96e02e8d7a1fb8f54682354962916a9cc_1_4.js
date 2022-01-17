function (sprite, index) {
        sprite.useBatchNode(this);
        sprite.setAtlasIndex(index);
        sprite.setDirty(true);

        if (this._textureAtlas.getTotalQuads() == this._textureAtlas.getCapacity()) {
            this.increaseAtlasCapacity();
        }

        var quad = sprite.getQuad();
        this._textureAtlas.insertQuad(quad, index);

        this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, sprite, index);
        //this._descendants.insertObject(sprite, index);

        // update indices
        var i = 0;
        if (this._descendants && this._descendants.length > 0) {
            for (var index = 0; index < this._descendants.length; index++) {
                var obj = this._descendants[index];
                if (obj) {
                    if (i > index) {
                        obj.setAtlasIndex(obj.getAtlasIndex() + 1);
                    }
                    ++i;
                }
            }
        }

        // add children recursively
        var children = sprite.getChildren();
        if (children && children.length > 0) {
            for (index = 0; index < this._descendants.length; index++) {
                obj = this._descendants[index];
                if (obj) {
                    var getIndex = this.atlasIndexForChild(obj, obj.getZOrder());
                    this.insertChild(obj, getIndex);
                }
            }
        }
    }