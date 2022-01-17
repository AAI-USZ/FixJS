function (priority) {
        this._scheduler.scheduleUpdateForTarget(this, priority, !this._isRunning);
    }