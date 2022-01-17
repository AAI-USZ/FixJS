f        //if (this._super(duration)) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._deltaR = deltaRed;
            this._deltaG = deltaGreen;
            this._deltaB = deltaBlue;

            return true;
        }

        return false;
    },
