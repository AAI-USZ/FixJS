function (enabled) {
        // Already enabled?
        if (enabled && this._contentScaleFactor == 2) {
            return true;
        }

        // Already diabled?
        if (!enabled && this._contentScaleFactor == 1) {
            return false;
        }

        // setContentScaleFactor is not supported
        if (!this._openGLView.canSetContentScaleFactor()) {
            return false;
        }

        var newScale = (enabled) ? 2 : 1;
        this.setContentScaleFactor(newScale);

        // release cached texture
        cc.TextureCache.purgeSharedTextureCache();

        if (cc.DIRECTOR_FAST_FPS) {
            if (!this._FPSLabel) {
                this._FPSLabel = cc.LabelTTF.create("00.0", "Arial", 24);
                this._FPSLabel.setPosition(cc.ccp(0, 0));
                this._FPSLabel.setAnchorPoint(cc.ccp(0, 0));
            }
        }

        this._retinaDisplay = !!(this._contentScaleFactor == 2);

        return true;
    }