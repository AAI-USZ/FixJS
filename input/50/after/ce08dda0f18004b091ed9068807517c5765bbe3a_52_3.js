function (texture, capacity) {
    if (!capacity) {
        capacity = cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    }

    var batchNode = new cc.SpriteBatchNode();
    batchNode.initWithTexture(texture, capacity);

    return batchNode;
}