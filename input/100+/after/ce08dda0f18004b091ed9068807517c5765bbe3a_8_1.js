function (target, selector, seconds, repeat, delay) {
        try {
            this._target = target;
            this._selector = selector;
            this._elapsed = -1;
            this._interval = seconds || 0;
            this._delay = delay || 0;
            this._useDelay = this._delay > 0;
            this._repeat = (repeat == null) ? cc.REPEAT_FOREVER : repeat;
            this._runForever = (this._repeat == cc.REPEAT_FOREVER);
            return true;
        } catch (e) {
            return false;
        }
    }