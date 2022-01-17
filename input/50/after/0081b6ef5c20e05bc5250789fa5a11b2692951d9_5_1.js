function () {
        cc.Director.sharedDirector().getScheduler().pauseTarget(this);
        cc.Director.sharedDirector().getActionManager().pauseTarget(this);
    }