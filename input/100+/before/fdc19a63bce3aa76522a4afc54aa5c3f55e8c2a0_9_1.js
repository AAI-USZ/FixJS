function () {
        // clean up
        this._inScene.setIsVisible(true);
        this._inScene.setPosition(cc.ccp(0, 0));
        this._inScene.setScale(1.0);
        this._inScene.setRotation(0.0);
        this._inScene.getCamera().restore();

        this._outScene.setIsVisible(false);
        this._outScene.setPosition(cc.ccp(0, 0));
        this._outScene.setScale(1.0);
        this._outScene.setRotation(0.0);
        this._outScene.getCamera().restore();

        //[self schedule:@selector(setNewScene:) interval:0];
        this.schedule(this._setNewScene, 0);
    }