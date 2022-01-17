function (dt) {
        // [self unschedule:_cmd];
        // "_cmd" is a local variable automatically defined in a method
        // that contains the selector for the method
        this.unschedule(this._setNewScene);
        var director = cc.Director.sharedDirector();
        // Before replacing, save the "send cleanup to scene"
        this._isSendCleanupToScene = director.isSendCleanupToScene();
        director.replaceScene(this._inScene);

        // enable events while transitions
        director.getTouchDispatcher().setDispatchEvents(true);
        // issue #267
        this._outScene.setVisible(true);
    }