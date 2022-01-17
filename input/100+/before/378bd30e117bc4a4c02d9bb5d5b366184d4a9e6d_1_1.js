function (sprite, index) {
        cc.Assert(sprite != null, "SpriteBatchNode.addQuadFromSprite():Argument must be non-nil");
        /// @todo CCAssert( [sprite isKindOfClass:[CCSprite class]], @"CCSpriteSheet only supports CCSprites as children");

        /*while(index >= this._textureAtlas.getCapacity() || this._textureAtlas.getCapacity() == this._textureAtlas.getTotalQuads()){
         this.increaseAtlasCapacity();
         }*/
        //todo fixed
        //
        // update the quad directly. Don't add the sprite to the scene graph
        //
        sprite.useBatchNode(this);
        sprite.setAtlasIndex(index);
        var quad = sprite.getQuad();

        this._textureAtlas.insertQuad(quad, index);
        // XXX: updateTransform will update the textureAtlas too using updateQuad.
        // XXX: so, it should be AFTER the insertQuad
        sprite.setDirty(true);
        sprite.updateTransform();
        this._children = cc.ArrayAppendObjectToIndex(this._children, sprite, index);
    }