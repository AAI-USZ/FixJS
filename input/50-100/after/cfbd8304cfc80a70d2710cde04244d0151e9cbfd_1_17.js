function (target) {
        //this._super(target);
        cc.ActionInterval.prototype.startWithTarget.call(this,target);

        if (this._animation.getRestoreOriginalFrame()) {
            this._origFrame = target.displayFrame();
        }
        this._nextFrame = 0;
        this._executedLoops = 0;
    }