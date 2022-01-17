function (dt) {
        var batch = this.getChildByTag(TAG_SPRITE_BATCH_NODE);
        var sprite1 = batch.getChildByTag(TAG_SPRITE1);
        var sprite2 = batch.getChildByTag(TAG_SPRITE2);

        sprite1.setFlipX(!sprite1.isFlipX());
        sprite2.setFlipY(!sprite2.isFlipY());
    }