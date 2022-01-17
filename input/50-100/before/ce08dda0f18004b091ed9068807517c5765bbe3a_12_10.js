function (duration, position, height, jumps) {
        if (this._super(duration)) {
            this._delta = position;
            this._height = height;
            this._jumps = jumps;

            return true;
        }

        return false;
    }