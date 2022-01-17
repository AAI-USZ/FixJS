function () {
        // don't release the event handlers
        // They are needed in case the director is run again
        this._touchDispatcher.removeAllDelegates();

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
        cc.LabelBMFont.purgeCachedData();

        // purge all managers
        cc.AnimationCache.purgeSharedAnimationCache();
        cc.SpriteFrameCache.purgeSharedSpriteFrameCache();
        cc.TextureCache.purgeSharedTextureCache();

        //CCShaderCache::purgeSharedShaderCache();
        //CCFileUtils::purgeFileUtils();
        //CCConfiguration::purgeConfiguration();
        //extension::CCNotificationCenter::purgeNotificationCenter();
        //extension::CCTextureWatcher::purgeTextureWatcher();
        //extension::CCNodeLoaderLibrary::purgeSharedCCNodeLoaderLibrary();
        //cc.UserDefault.purgeSharedUserDefault();
        //ccGLInvalidateStateCache();

        //CHECK_GL_ERROR_DEBUG();

        // OpenGL view
        this._openGLView.end();
        this._openGLView = null;
    }