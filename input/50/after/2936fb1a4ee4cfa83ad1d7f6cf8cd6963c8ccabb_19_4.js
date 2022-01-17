function () {
        cc.Director.sharedDirector().getScheduler().pauseTarget(this);
        cc.ActionManager.sharedManager().pauseTarget(this);
    }