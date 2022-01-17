function (time) {
        if (time >= this._nextDt) {
            while (time > this._nextDt && this._total < this._times) {
                this._innerAction.update(1);
                this._total++;
                this._innerAction.stop();
                this._innerAction.startWithTarget(this._target);
                this._nextDt += this._innerAction.getDuration() / this._duration;
            }

            // fix for issue #1288, incorrect end value of repeat
            if (time >= 1.0 && this._total < this._times) {
                this._total++;
            }

            // don't set a instantaction back or update it, it has no use because it has no duration
            if (this._actionInstant) {
                if (this._total == this._times) {
                    this._innerAction.update(1);
                    this._innerAction.stop();
                } else {
                    // issue #390 prevent jerk, use right update
                    this._innerAction.update(time - (this._nextDt - this._innerAction.getDuration() / this._duration));
                }
            }
        } else {
            this._innerAction.update((time * this._times) % 1.0);
        }
    }