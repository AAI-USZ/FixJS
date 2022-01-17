function (target) {
        //this._super(target);
        cc.ScaleTo.prototype.startWithTarget.call(this,target);
        this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
        this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
    }