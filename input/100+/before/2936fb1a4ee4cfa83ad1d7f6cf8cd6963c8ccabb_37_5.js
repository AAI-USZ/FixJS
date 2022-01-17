function () {
        this._atlasIndex = cc.SPRITE_INDEX_NOT_INITIALIZED;
        this._usesBatchNode = false;
        this._textureAtlas = null;
        this._batchNode = null;
        this._dirty = this._recursiveDirty = false;

        var x1 = 0 + this._offsetPositionInPixels.x;
        var y1 = 0 + this._offsetPositionInPixels.y;
        var x2 = x1 + this._rectInPixels.size.width;
        var y2 = y1 + this._rectInPixels.size.height;
        this._quad.bl.vertices = cc.vertex3(x1, y1, 0);
        this._quad.br.vertices = cc.vertex3(x2, y1, 0);
        this._quad.tl.vertices = cc.vertex3(x1, y2, 0);
        this._quad.tr.vertices = cc.vertex3(x2, y2, 0);
    }