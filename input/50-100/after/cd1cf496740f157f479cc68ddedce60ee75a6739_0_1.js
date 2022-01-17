function(e) {
                this._unpoll();
                if (sub._selection) {
                    Y.later(0, this, this._checkSelectionChange, sub);
                }
            }