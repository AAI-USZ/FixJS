function (duration, red, green, blue) {
        if (this._super(duration)) {
            this._to = cc.ccc3(red, green, blue);
            return true;
        }

        return false;
    }