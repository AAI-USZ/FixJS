function (selector, interval, repeat, delay) {
        interval = interval || 0;

        cc.Assert( selector, "Argument must be non-nil");
        cc.Assert( interval >=0, "Argument must be positive");

        repeat = repeat || cc.REPEAT_FOREVER;
        delay = delay || 0;

        this._scheduler.scheduleSelector(selector, this, interval, !this._isRunning, repeat, delay);
    }