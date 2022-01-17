function () {
        // [openGLView responseToSelector:@selector(setContentScaleFactor)]
        if (this._openGLView.canSetContentScaleFactor()) {
            this._openGLView.setContentScaleFactor(this._contentScaleFactor);
            this._isContentScaleSupported = true;
        }
        else {
            cc.Log("cocos2d: setContentScaleFactor:'is not supported on this device");
        }
    }