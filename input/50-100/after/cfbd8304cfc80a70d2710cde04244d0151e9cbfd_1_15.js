function (target) {
        //this._super(target);
        cc.ActionInterval.prototype.startWithTarget.call(this,target);

        //if (target.RGBAProtocol) {
        var color = target.getColor();
        this._fromR = color.r;
        this._fromG = color.g;
        this._fromB = color.b;
        //}
    }