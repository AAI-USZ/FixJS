function (t, c) {
        if (this._super(t)) {
            this._config = c;
            return true;
        }

        return false;
    }