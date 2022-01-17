function () {
        // don't release the event handlers
        // They are needed in case the director is run again
        cc.TouchDispatcher.sharedDispatcher().removeAllDelegates();

        if (this._runningScene) {
            this._runningScene.onExit();
            this._runningScene.cleanup();
        }

        this._runningScene = null;
        this._nextScene = null;

        // remove all objects, but don't release it.
        // runWithScene might be executed after 'end'.
        this._scenesStack = [];

        this.stopAnimation();

        // purge bitmap cache
        //cc.LabelBMFont.purgeCachedData();

        // purge all managers
        cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.ActionManager.sharedManager().purgeSharedManager();
        cc.Scheduler.purgeSharedScheduler();
        cc.TextureCache.purgeSharedTextureCache();

        if (cc.TARGET_PLATFORM != cc.PLATFORM_MARMALADE) {
            cc.UserDefault.purgeSharedUserDefault();
        }
        // OpenGL view
        this._openGLView = null;
    }