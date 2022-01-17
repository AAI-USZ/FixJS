function (target, selector, seconds) {
        try {
            this._target = target;
            this._selector = selector;
            this._elapsed = -1;
            this._interval = seconds || 0;
            return true;
        } catch (e) {
            return false;
        }
    }