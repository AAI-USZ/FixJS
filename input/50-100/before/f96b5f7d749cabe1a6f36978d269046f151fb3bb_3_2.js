function (dt) {
        var batch = this.getChildByTag(TAG_SPRITE_BATCH_NODE);
        var sprite1 = batch.getChildByTag(TAG_SPRITE1);
        var sprite2 = batch.getChildByTag(TAG_SPRITE2);

        cc.Log("Pre: " + sprite1.getContentSize().height);
        sprite1.setFlipX(!sprite1.isFlipX());
        sprite2.setFlipY(!sprite2.isFlipY());
        cc.Log("Post: " + sprite1.getContentSize().height);
    }