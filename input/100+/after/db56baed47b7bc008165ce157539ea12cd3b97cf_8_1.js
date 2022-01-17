function () {
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
        this._accumDt = 0;
        this._frameRate = 0;
        this._displayStats = false;//can remove
        this._totalFrames = this._frames = 0;
        this._szFPS = "";
        this._lastUpdate = new cc.timeval();

        //Paused?
        this._paused = false;

        //purge?
        this._purgeDirecotorInNextLoop = false;
        this._winSizeInPixels = this._winSizeInPoints = cc.SizeMake(cc.canvas.width, cc.canvas.height);

        this._openGLView = null;
        this._contentScaleFactor = 1.0;
        this._isContentScaleSupported = false;

        this._watcherFun = null;
        this._watcherSender = null;

        //scheduler
        this._scheduler = new cc.Scheduler();
        //action manager
        this._actionManager = new cc.ActionManager();
        this._scheduler.scheduleUpdateForTarget(this._actionManager, cc.PRIORITY_SYSTEM, false);
        //touchDispatcher
        this._touchDispatcher = new cc.TouchDispatcher();
        this._touchDispatcher.init();

        //KeypadDispatcher
        this._keypadDispatcher = new cc.KeypadDispatcher();

        //accelerometer
        //this._accelerometer = new cc.Accelerometer();

        return true;
    }