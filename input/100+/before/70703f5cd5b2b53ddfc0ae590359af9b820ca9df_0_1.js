function (dt) {
        if (this._elapsed == -1) {
            this._elapsed = 0;
        } else {
            this._elapsed += dt;
        }

        if (this._elapsed >= this._interval) {
            if (this._selector) {
                if (typeof(this._selector) == "string") {
                    this._target[this._selector](this._elapsed);
                } else if (typeof(this._selector) == "function") {
                    this._selector.call(this._target, this._elapsed);
                }
                this._elapsed = 0;
            }
        }
    }