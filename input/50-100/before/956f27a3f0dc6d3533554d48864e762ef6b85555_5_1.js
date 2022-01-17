function (texture, rect, rotated, offset, originalSize) {
    var spriteFrame = new cc.SpriteFrame();
    spriteFrame._texture = texture;
    spriteFrame._rectInPixels = rect;
    spriteFrame._rect = cc.RECT_PIXELS_TO_POINTS(rect);
    spriteFrame._rotated = rotated;
    spriteFrame._offsetInPixels = offset;
    spriteFrame._originalSizeInPixels = originalSize;
    return spriteFrame;
}