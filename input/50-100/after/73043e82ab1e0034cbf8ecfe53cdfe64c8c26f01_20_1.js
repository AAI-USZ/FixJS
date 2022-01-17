function (texture, rect, rotated, offset, originalSize) {
    var spriteFrame = new cc.SpriteFrame();
    spriteFrame._texture = texture;
    spriteFrame._rectInPixels = rect;
    spriteFrame._rect = cc.RECT_PIXELS_TO_POINTS(rect);
    spriteFrame._offsetInPixels = offset;
    spriteFrame._offset = cc.POINT_PIXELS_TO_POINTS( spriteFrame._offsetInPixels );
    spriteFrame._originalSizeInPixels = originalSize;
    spriteFrame._originalSize = cc.SIZE_PIXELS_TO_POINTS(spriteFrame._originalSizeInPixels);
    spriteFrame._rotated = rotated;
    return spriteFrame;
}