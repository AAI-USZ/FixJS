function (filename) {
        var now = cc.timeval();
        var texture;
        var cache = cc.TextureCache.getInstance();

        cc.Log("RGBA 8888");
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            cc.Log("  ms:" + calculateDeltaTime(now));
        else
            cc.Log(" ERROR");
        cache.removeTexture(texture);

        cc.Log("RGBA 4444");
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            cc.Log("  ms:" + calculateDeltaTime(now));
        else
            cc.Log(" ERROR");
        cache.removeTexture(texture);

        cc.Log("RGBA 5551");
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB5A1);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            cc.Log("  ms:" + calculateDeltaTime(now));
        else
            cc.Log(" ERROR");
        cache.removeTexture(texture);

        cc.Log("RGB 565");
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGB565);
        var now = cc.Time.gettimeofdayCocos2d();
        texture = cache.addImage(filename);
        if (texture)
            cc.Log("  ms:" + calculateDeltaTime(now));
        else
            cc.Log(" ERROR");
        cache.removeTexture(texture);
    }