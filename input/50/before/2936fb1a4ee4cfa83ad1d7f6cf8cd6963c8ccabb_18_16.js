function (priority) {
        cc.Scheduler.sharedScheduler().scheduleUpdateForTarget(this, priority, !this._isRunning);
    }