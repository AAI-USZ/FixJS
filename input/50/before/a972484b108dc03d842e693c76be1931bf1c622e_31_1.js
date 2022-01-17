function () {
        cc.Log("Pausing");
        this._pausedTargets = cc.Director.getInstance().getActionManager().pauseAllRunningActions();
    }