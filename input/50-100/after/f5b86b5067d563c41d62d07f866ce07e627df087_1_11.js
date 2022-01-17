function (target) {
        //this._super(target);
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._startScaleX = target.getScaleX();
        this._startScaleY = target.getScaleY();
        this._deltaX = this._endScaleX - this._startScaleX;
        this._deltaY = this._endScaleY - this._startScaleY;
    }