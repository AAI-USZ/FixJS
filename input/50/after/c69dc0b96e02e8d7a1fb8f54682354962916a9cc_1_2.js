function (fileImage, capacity) {
    if (!capacity) {
        capacity = cc.DEFAULT_SPRITE_BATCH_CAPACITY;
    }

    var batchNode = new cc.SpriteBatchNode();
    batchNode.initWithFile(fileImage, capacity);

    return batchNode;
}