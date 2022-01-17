function () {
        cc.log("Resuming");
        cc.Director.getInstance().getActionManager().resumeTargets(this._pausedTargets);
    }