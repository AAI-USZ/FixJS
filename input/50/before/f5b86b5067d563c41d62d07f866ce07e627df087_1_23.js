function (duration, deltaRed, deltaGreen, deltaBlue) {
        if (this._super(duration)) {
            this._deltaR = deltaRed;
            this._deltaG = deltaGreen;
            this._deltaB = deltaBlue;

            return true;
        }

        return false;
    }