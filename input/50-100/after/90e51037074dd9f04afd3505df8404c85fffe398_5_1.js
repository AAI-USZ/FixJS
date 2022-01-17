function (dt) {
        var sprite1 = this.getChildByTag(TAG_SPRITE1);
        var sprite2 = this.getChildByTag(TAG_SPRITE2);

        sprite1.setFlipX(!sprite1.isFlipX());
        sprite2.setFlipY(!sprite2.isFlipY());
    }