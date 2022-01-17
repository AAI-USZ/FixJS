function (file, capacity) {
        // retained in property
        var texture = cc.TextureCache.getInstance().addImage(file);

        if (texture) {
            return this.initWithTexture(texture, capacity);
        } else {
            cc.Log("cocos2d: Could not open file: " + file);
            return null;
        }
    }