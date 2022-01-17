function (fileName) {
        var texture = cc.TextureCache.sharedTextureCache().addImage(fileName);
        var rect = cc.RectZero();
        if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement)) {
            rect.size = cc.SizeMake(texture.width, texture.height);
        } else {
            rect.size = texture.getContentSize();
        }
        var frame = cc.SpriteFrame.create(texture, rect);
        this.addSpriteFrame(frame);
    }