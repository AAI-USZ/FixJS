function (spriteFrame) {
    if (typeof(spriteFrame) == 'string') {
        var pFrame = cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName(spriteFrame);
        if (pFrame) {
            spriteFrame = pFrame;
        } else {
            cc.Log("Invalid spriteFrameName: " + spriteFrame);
            return null;
        }
    }
    var sprite = new cc.Sprite();
    if (sprite && sprite.initWithSpriteFrame(spriteFrame)) {
        return sprite;
    }
    return null;
}