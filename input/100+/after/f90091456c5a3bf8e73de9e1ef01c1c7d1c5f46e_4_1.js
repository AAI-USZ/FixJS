function (sprite, index) {
        cc.Assert(sprite != null, "SpriteBatchNode.addQuadFromSprite():Argument must be non-nil");
        cc.Assert((sprite instanceof cc.Sprite), "cc.SpriteBatchNode only supports cc.Sprites as children");

        /*while(index >= this._textureAtlas.getCapacity() || this._textureAtlas.getCapacity() == this._textureAtlas.getTotalQuads()){
         this.increaseAtlasCapacity();
         }*/
        //todo fixed
        //
        // update the quad directly. Don't add the sprite to the scene graph
        //
        sprite.setBatchNode(this);
        sprite.setAtlasIndex(index);

        this._textureAtlas.insertQuad(sprite.getQuad(), index);

        // XXX: updateTransform will update the textureAtlas too using updateQuad.
        // XXX: so, it should be AFTER the insertQuad
        sprite.setDirty(true);
        sprite.updateTransform();

        if(cc.renderContextType == cc.CANVAS){
            this._children = cc.ArrayAppendObjectToIndex(this._children, sprite, index);
        }
    }