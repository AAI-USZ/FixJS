function (sprite, index) {
        sprite.setBatchNode(this);
        sprite.setAtlasIndex(index);
        sprite.setDirty(true);

        if (this._textureAtlas.getTotalQuads() == this._textureAtlas.getCapacity()) {
            this.increaseAtlasCapacity();
        }

        this._textureAtlas.insertQuad(sprite.getQuad(), index);

        this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, sprite, index);

        // update indices
        var i = index+1;
        if (this._descendants && this._descendants.length > 0) {
            for (; i < this._descendants.length; i++) {
                this._descendants[i].setAtlasIndex(this._descendants[i].getAtlasIndex() + 1);
            }
        }

        // add children recursively
        var children = sprite.getChildren();
        if (children && children.length > 0) {
            for (i = 0; i < children.length; i++) {
                if (children[i]) {
                    var getIndex = this.atlasIndexForChild(children[i], children[i].getZOrder());
                    this.insertChild(children[i], getIndex);
                }
            }
        }
    }