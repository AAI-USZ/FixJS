function (selector, interval) {
        if (!interval)
            interval = 0;

        cc.Assert(selector, "Argument must be non-nil");
        cc.Assert(interval >= 0, "Argument must be positive");
        cc.Scheduler.sharedScheduler().scheduleSelector(selector, this, interval, !this._isRunning);
    }