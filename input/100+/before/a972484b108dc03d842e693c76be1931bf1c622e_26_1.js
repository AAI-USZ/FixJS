function (image, key) {
        cc.Assert(image != null, "TextureCache: image MUST not be nulll");

        var texture = null;

        if (key) {
            if (this.textures.hasOwnProperty(key)) {
                texture = this.textures[key];
                if (texture) {
                    return texture;
                }
            }
        }

        // prevents overloading the autorelease pool
        texture = new cc.Texture2D();
        texture.initWithImage(image);

        if ((key != null) && (texture != null)) {
            this.textures[key] = texture;
        } else {
            cc.Log("cocos2d: Couldn't add UIImage in TextureCache");
        }

        return texture;
    }