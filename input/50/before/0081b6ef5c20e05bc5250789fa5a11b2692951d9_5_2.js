function () {
        cc.Director.sharedDirector().getScheduler().resumeTarget(this);
        cc.ActionManager.sharedManager().resumeTarget(this);
    }