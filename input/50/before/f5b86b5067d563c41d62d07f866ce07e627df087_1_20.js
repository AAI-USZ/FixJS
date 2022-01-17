function (duration, opacity) {
        if (this._super(duration)) {
            this._toOpacity = opacity;
            return true;
        }

        return false;
    }