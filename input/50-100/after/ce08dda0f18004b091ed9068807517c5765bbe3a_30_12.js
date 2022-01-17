function (enabled) {
        if (this._isEnabled = enabled) {
            this._super(enabled);

            if (this._subItems && this._subItems.length > 0) {
                for (var it = 0; it < this._subItems.length; it++) {
                    this._subItems[it].setEnabled(enabled);
                }
            }
        }
    }