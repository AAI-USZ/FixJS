function (t, scene) {
        cc.Assert(scene != null, "CCTransitionScene.initWithDuration() Argument scene must be non-nil");

        if (this.init()) {
            this._duration = t;
            this.setAnchorPoint(cc.ccp(0, 0));
            this.setPosition(cc.ccp(0, 0));
            // retain
            this._inScene = scene;
            this._outScene = cc.Director.sharedDirector().getRunningScene();

            cc.Assert(this._inScene != this._outScene, "CCTransitionScene.initWithDuration() Incoming scene must be different from the outgoing scene");

            // disable events while transitions
            cc.TouchDispatcher.sharedDispatcher().setDispatchEvents(false);
            this._sceneOrder();

            return true;
        } else {
            return false;
        }
    }