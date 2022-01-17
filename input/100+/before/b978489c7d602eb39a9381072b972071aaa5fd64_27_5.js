function (sprite) {
        // remove from TextureAtlas
        this._textureAtlas.removeQuadAtIndex(sprite.getAtlasIndex());

        // Cleanup sprite. It might be reused (issue #569)
        sprite.useSelfRender();

        var index = cc.ArrayGetIndexOfObject(this._descendants, sprite);
        if (index != -1) {
            cc.ArrayRemoveObjectAtIndex(this._descendants, index);

            // update all sprites beyond this one
            var len = this._descendants.length;
            for (; index < len; ++index) {
                var s = this._descendants[index];
                s.setAtlasIndex(s.getAtlasIndex() - 1);
            }
        }

        // remove children recursively
        var children = sprite.getChildren();
        if (children && children.length > 0) {
            for (var i = 0; i < children.length; i++) {
                if (children[i]) {
                    this.removeSpriteFromAtlas(children[i]);
                }
            }
        }
    }