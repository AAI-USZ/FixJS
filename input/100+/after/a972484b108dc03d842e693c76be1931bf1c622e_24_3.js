function (file) {
        var ret = false;
        // nothing to do with cc.Object.init

        var pvr = new cc.TexturePVR;
        ret = pvr.initWithContentsOfFile(file);

        if (ret) {
            pvr.setRetainName(true); // don't dealloc texture on release

            this._name = pvr.getName();
            this._maxS = 1.0;
            this._maxT = 1.0;
            this._pixelsWide = pvr.getWidth();
            this._pixelsHigh = pvr.getHeight();
            this._contentSize = cc.SizeMake(this._pixelsWide, this._pixelsHigh);
            this._hasPremultipliedAlpha = cc.PVRHaveAlphaPremultiplied_;
            this._pixelFormat = pvr.getFormat();

            this.setAntiAliasTexParameters();
        }
        else {
            cc.log("cocos2d: Couldn't load PVR image %s", file);
        }

        return ret;
    }