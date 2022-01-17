function (time) {
        var  new_t, found = 0;
        if (time < this._split) {
            // action[0]
            //found = 0;
            new_t = (this._split != 0) ? time / this._split : 1;
        } else {
            // action[1]
            found = 1;
            new_t = (this._split == 1) ? 1 : (time - this._split) / (1 - this._split);

            if (this._last == -1) {
                // action[0] was skipped, execute it.
                this._actions[0].startWithTarget(this._target);
                this._actions[0].update(1);
                this._actions[0].stop();
            }
            if (this._last == 0) {
                // switching to action 1. stop action 0.
                this._actions[0].update(1);
                this._actions[0].stop();
            }
        }

        if (this._last != found) {
            this._actions[found].startWithTarget(this._target);
        }
        this._actions[found].update(new_t);
        this._last = found;
    }