function (filename, rect) {
        var argnum = arguments.length;
        cc.Assert(filename != null, "");
        var texture = cc.TextureCache.sharedTextureCache().textureForKey(filename);
        if (!texture) {
            texture = cc.TextureCache.sharedTextureCache().addImage(filename);
        }
        switch (argnum) {
            case 1:
                /** Initializes an sprite with an image filename.
                 The rect used will be the size of the image.
                 The offset will be (0,0).
                 */
                if (texture) {
                    rect = cc.RectZero();
                    if (cc.renderContextType == cc.CANVAS)
                        rect.size = new cc.Size(texture.width, texture.height);
                    else
                        rect.size = texture.getContentSize();
                    return this.initWithTexture(texture, rect);
                }
                // when load texture failed, it's better to get a "transparent" sprite then a crashed program
                return false;
                break;
            case 2:
                /** Initializes an sprite with an image filename, and a rect.
                 The offset will be (0,0).
                 */
                if (texture) {
                    return this.initWithTexture(texture, rect);
                }
                // when load texture failed, it's better to get a "transparent" sprite then a crashed program
                return false;
                break;
            default:
                throw "initWithFile():Argument must be non-nil ";
                break;
        }
    }