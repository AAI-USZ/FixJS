function (verticalAlignment) {
        if (verticalAlignment != this._vAlignment) {
            this._vAlignment = verticalAlignment;

            // Force update
            if (this._string.length > 0) {
                this._updateTTF();
            }
        }
    }