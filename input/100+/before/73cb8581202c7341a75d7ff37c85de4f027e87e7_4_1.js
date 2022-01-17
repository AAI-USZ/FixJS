function (filename, rect) {
        var argnum = arguments.length;
        cc.Assert(filename != null, "Sprite#initWithFile():Invalid filename for sprite");

        var texture = cc.TextureCache.sharedTextureCache().textureForKey(filename);
        if (!texture) {
            texture = cc.TextureCache.sharedTextureCache().addImage(filename);
        }
        if (texture) {
            if (!rect) {
                rect = new cc.Rect();
                if (texture instanceof cc.Texture2D)
                    rect.size = texture.getContentSize();
                else if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement))
                    rect.size = new cc.Size(texture.width, texture.height);
            }
            return this.initWithTexture(texture, rect);
        }

        return false;
    }