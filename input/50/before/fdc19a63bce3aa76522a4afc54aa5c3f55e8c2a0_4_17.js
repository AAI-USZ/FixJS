function () {
        cc.Scheduler.sharedScheduler().resumeTarget(this);
        cc.ActionManager.sharedManager().resumeTarget(this);
    }