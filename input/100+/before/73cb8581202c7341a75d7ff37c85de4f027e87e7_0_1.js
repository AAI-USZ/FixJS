function (dt) {
        if (this._elapsed == -1) {
            this._elapsed = 0;
            this._timesExecuted = 0;
        } else {
            if (this._runForever && !this._useDelay) {
                //standard timer usage
                this._elapsed += dt;

                if (this._elapsed >= this._interval) {
                    if (this._selector) {
                        if (typeof(this._selector) == "string") {
                            this._target[this._selector](this._elapsed);
                        } else if (typeof(this._selector) == "function") {
                            this._selector.call(this._target, this._elapsed);
                        }
                    }
                    this._elapsed = 0;
                }
            } else {
                //advanced usage
                this._elapsed += dt;
                if (this._useDelay) {
                    if (this._elapsed >= this._delay) {
                        if (this._target && this._selector) {
                            if (typeof(this._selector) == "string") {
                                this._target[this._selector](this._elapsed);
                            } else if (typeof(this._selector) == "function") {
                                this._selector.call(this._target, this._elapsed);
                            }
                        }
                        this._elapsed = this._elapsed - this._delay;
                        this._timesExecuted += 1;
                        this._useDelay = false;
                    }
                } else {
                    if (this._elapsed >= this._interval) {
                        if (this._target && this._selector) {
                            if (typeof(this._selector) == "string") {
                                this._target[this._selector](this._elapsed);
                            } else if (typeof(this._selector) == "function") {
                                this._selector.call(this._target, this._elapsed);
                            }
                        }
                        this._elapsed = 0;
                        this._timesExecuted += 1;
                    }
                }

                if (this._timesExecuted > this._repeat) {
                    cc.Director.sharedDirector().getScheduler().unscheduleSelector(this._selector, this._target);
                }
            }
        }
    }