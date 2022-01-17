function () {
        cc.log("Pausing");
        this._pausedTargets = cc.Director.getInstance().getActionManager().pauseAllRunningActions();
    }