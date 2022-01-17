function (time) {
        var found = 0;
        var new_t = 0;
        if (time >= this._split) {
            found = 1;
            new_t = (this._split == 1) ? 1 : (time - this._split) / (1 - this._split);
        }
        else {
            found = 0;
            new_t = (this._split != 0) ? time / this._split : 1;
        }
        if (this._last == -1 && found == 1) {
            this._actions[0].startWithTarget(this._target);
            this._actions[0].update(1);
            this._actions[0].stop();
        }
        if (this._last != found) {
            if (this._last != -1) {
                this._actions[this._last].update(1);
                this._actions[this._last].stop();
            }

            this._actions[found].startWithTarget(this._target);
        }
        this._actions[found].update(new_t);
        this._last = found;
    }