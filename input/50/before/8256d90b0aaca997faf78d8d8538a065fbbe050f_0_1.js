function() {
        return this._editing &&
               this._normalizeText(this._initialValue) !=
               this.value().htmlEncode();
    }