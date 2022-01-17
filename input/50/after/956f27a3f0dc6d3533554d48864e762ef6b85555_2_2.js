function (arrayOfSpriteFrameNames, delay) {
    var animation = new cc.Animation();
    animation.initWithSpriteFrames(arrayOfSpriteFrameNames, delay);
    return animation;
}