function (arrayOfSpriteFrameNames, delay) {
    var animation = new cc.Animation();
    animation.initWithAnimationFrames(arrayOfSpriteFrameNames, delay);
    return animation;
}