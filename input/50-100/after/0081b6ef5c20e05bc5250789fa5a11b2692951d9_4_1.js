function (selector, interval, repeat, delay) {
        interval = interval || 0;

        cc.Assert( selector, "Argument must be non-nil");
        cc.Assert( interval >=0, "Argument must be positive");

        repeat = (repeat == null) ?cc.REPEAT_FOREVER : repeat;
        delay = delay || 0;

        this.getScheduler().scheduleSelector(selector, this, interval, !this._isRunning, repeat, delay);
    }