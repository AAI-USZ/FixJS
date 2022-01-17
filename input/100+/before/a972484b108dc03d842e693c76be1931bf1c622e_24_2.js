function (uiImage) {
        var POTWide, POTHigh;

        if (uiImage == null) {
            cc.Log("cocos2d: cc.Texture2D. Can't create Texture. UIImage is nil");
            return false;
        }

        var conf = cc.Configuration.getInstance();

        if (cc.TEXTURE_NPOT_SUPPORT) {
            if (conf.isSupportsNPOT()) {
                POTWide = uiImage.getWidth();
                POTHigh = uiImage.getHeight();
            }
        } else {
            POTWide = cc.NextPOT(uiImage.getWidth());
            POTHigh = cc.NextPOT(uiImage.getHeight());
        }


        var maxTextureSize = conf.getMaxTextureSize();
        if (POTHigh > maxTextureSize || POTWide > maxTextureSize) {
            cc.Log("cocos2d: WARNING: Image (%u x %u) is bigger than the supported %u x %u", POTWide, POTHigh, maxTextureSize, maxTextureSize);
            return null;
        }

        // always load premultiplied images
        return this._initPremultipliedATextureWithImage(uiImage, POTWide, POTHigh);
    }