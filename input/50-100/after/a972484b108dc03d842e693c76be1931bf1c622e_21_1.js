function (spriteFrame) {
    if (typeof(spriteFrame) == 'string') {
        var pFrame = cc.SpriteFrameCache.getInstance().spriteFrameByName(spriteFrame);
        if (pFrame) {
            spriteFrame = pFrame;
        } else {
            cc.log("Invalid spriteFrameName: " + spriteFrame);
            return null;
        }
    }
    var sprite = new cc.Sprite();
    if (sprite && sprite.initWithSpriteFrame(spriteFrame)) {
        return sprite;
    }
    return null;
}