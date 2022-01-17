function () {
        cc.Scheduler.sharedScheduler().pauseTarget(this);
        cc.ActionManager.sharedManager().pauseTarget(this);
    }