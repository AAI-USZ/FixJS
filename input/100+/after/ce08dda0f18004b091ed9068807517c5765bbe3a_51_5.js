function (batchNode) {
        this._textureAtlas = batchNode.getTextureAtlas(); // weak ref
        this._batchNode = batchNode;
    }