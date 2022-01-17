function (duration, sx, sy)//function overload here
    {
        if (this._super(duration)) {
            this._endScaleX = sx;
            this._endScaleY = (sy != null) ? sy : sx;

            return true;
        }

        return false;
    }