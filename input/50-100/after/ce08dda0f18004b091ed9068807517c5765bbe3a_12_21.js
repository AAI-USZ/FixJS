function () {
        if (this._animation.getRestoreOriginalFrame() && this._target) {
            this._target.setDisplayFrame(this._origFrame);
        }
        //this._super();
        cc.Action.prototype.stop.call(this);
    }