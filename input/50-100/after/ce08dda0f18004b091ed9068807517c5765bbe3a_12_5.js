function (dt) {
        this._innerAction.step(dt);
        if (this._innerAction.isDone()) {
            //var diff = this._innerAction.getElapsed() - this._innerAction.getDuration();
            this._innerAction.startWithTarget(this._target);
            // to prevent jerk. issue #390 ,1247
            //this._innerAction.step(0);
            //this._innerAction.step(diff);
            this._innerAction.step(this._innerAction.getElapsed() - this._innerAction.getDuration());
        }
    }