function () {
        if (!this._FPSLabel) {
            this._FPSLabel = cc.LabelTTF.create("00.0", "Arial", 24);
        }
        this._FPSLabel.setPosition(cc.ccp(0, 0));
        this._FPSLabel.setAnchorPoint(cc.ccp(0, 0));
        // scenes
        //TODO these are already set to null, so maybe we can remove them in the init?
        this._runningScene = null;
        this._nextScene = null;
        this._notificationNode = null;


        this._oldAnimationInterval = this._animationInterval = 1.0 / cc.defaultFPS;
        this._scenesStack = [];
        // Set default projection (3D)
        this._projection = cc.CCDIRECTOR_PROJECTION_DEFAULT;
        // projection delegate if "Custom" projection is used
        this._projectionDelegate = null;

        //FPS
        this._displayFPS = false;//can remove
        this._totalFrames = this._frames = 0;
        this._szFPS = "";
        this._lastUpdate = new cc.timeval();

        //Paused?
        this._paused = false;

        //purge?
        this._purgeDirecotorInNextLoop = false;
        this._winSizeInPixels = this._winSizeInPoints = cc.SizeMake(cc.canvas.width, cc.canvas.height);

        //portrait mode default
        this._deviceOrientation = cc.DEVICE_ORIENTATION_PORTRAIT;
        this._openGLView = null;
        this._retinaDisplay = false;
        this._contentScaleFactor = 1.0;
        this._isContentScaleSupported = false;
        return true;
    }