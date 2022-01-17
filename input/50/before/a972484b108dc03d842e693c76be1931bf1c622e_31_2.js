function () {
        cc.Log("Resuming");
        cc.Director.getInstance().getActionManager().resumeTargets(this._pausedTargets);
    }