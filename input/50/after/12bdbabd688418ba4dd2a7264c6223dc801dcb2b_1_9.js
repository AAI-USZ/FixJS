function (priority) {
        this.getScheduler().scheduleUpdateForTarget(this, priority, !this._isRunning);
    }