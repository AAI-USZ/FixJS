function (fontSize) {
        if (this._fontSize != fontSize) {
            this._fontSize = fontSize;

            // Force update
            if (this._string.length > 0) {
                this._updateTTF();
            }
        }
    }