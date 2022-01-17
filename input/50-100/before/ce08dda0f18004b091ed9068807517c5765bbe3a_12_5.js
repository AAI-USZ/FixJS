function (dt) {
        this._innerAction.step(dt);
        if (this._innerAction.isDone()) {
            var diff = dt + this._innerAction.getDuration() - this._innerAction.getElapsed();
            this._innerAction.startWithTarget(this._target);
            // to prevent jerk. issue #390
            this._innerAction.step(diff);
        }
    }