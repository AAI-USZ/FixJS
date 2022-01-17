function (duration, sx, sy)//function overload here
    {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._endScaleX = sx;
            this._endScaleY = (sy != null) ? sy : sx;

            return true;
        }

        return false;
    }