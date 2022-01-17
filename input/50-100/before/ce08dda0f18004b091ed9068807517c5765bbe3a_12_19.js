function (target) {
        this._super(target);
        //if (target.RGBAProtocol) {
        var color = target.getColor();
        this._fromR = color.r;
        this._fromG = color.g;
        this._fromB = color.b;
        //}
    }