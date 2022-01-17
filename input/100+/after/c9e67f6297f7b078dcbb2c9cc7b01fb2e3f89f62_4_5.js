function () {
        var color4 = new cc.Color4B(this._color.r, this._color.g, this._color.b, this._opacity);

        this._quad.bl.colors = color4;
        this._quad.br.colors = color4;
        this._quad.tl.colors = color4;
        this._quad.tr.colors = color4;

        // renders using Sprite Manager
        //TODO
        if (this._batchNode) {
            if (this._atlasIndex != cc.SPRITE_INDEX_NOT_INITIALIZED) {
                this._textureAtlas.updateQuad(this._quad, this._atlasIndex)
            } else {
                // no need to set it recursively
                // update dirty_, don't update recursiveDirty_
                //this.setDirty(true);
                this._dirty = true;
            }
        }
        // self render
        // do nothing
    }