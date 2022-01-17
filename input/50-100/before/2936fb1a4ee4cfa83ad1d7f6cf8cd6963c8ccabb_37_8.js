function (spriteFrame) {
    var sprite = new cc.Sprite();
    if (sprite && sprite.initWithSpriteFrame(spriteFrame)) {
        return sprite;
    }
    return null;
}