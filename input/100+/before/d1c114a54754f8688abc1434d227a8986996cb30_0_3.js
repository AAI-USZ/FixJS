function (selector, target, interval, paused, repeat, delay) {
        cc.Assert(selector, "scheduler.scheduleSelector() Argument selector must be non-NULL");
        cc.Assert(target, "scheduler.scheduleSelector() Argument target must be non-NULL");

        repeat = repeat || cc.REPEAT_FOREVER;
        delay = delay || 0;

        var element = cc.HASH_FIND_INT(this._hashForSelectors, target);

        if (!element) {
            // Is this the 1st element ? Then set the pause level to all the selectors of this target
            element = new cc.HashSelectorEntry(null, target, 0, null, null, paused, null);
            this._hashForSelectors.push(element);
        } else {
            cc.Assert(element.paused == paused, "Sheduler.scheduleSelector()");
        }

        var timer;
        if (element.timers == null) {
            element.timers = [];
        } else {
            for (var i = 0; i < element.timers.length; i++) {
                timer = element.timers[i];
                if (selector == timer._selector) {
                    cc.Log("CCSheduler#scheduleSelector. Selector already scheduled. Updating interval from:"
                        + timer.getInterval().toFixed(4) + " to " + interval.toFixed(4));
                    timer._interval = interval;
                    return;
                }
            }
        }

        timer = new cc.Timer();
        timer.initWithTarget(target, selector, interval, repeat, delay);
        element.timers.push(timer);
    }