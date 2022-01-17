function () {
        cc.Director.sharedDirector().getScheduler().resumeTarget(this);
        cc.Director.sharedDirector().getActionManager().resumeTarget(this);
    }