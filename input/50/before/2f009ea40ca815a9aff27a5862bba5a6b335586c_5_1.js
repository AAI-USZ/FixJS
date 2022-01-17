function(newVal) {

            if (newVal !== this._isSelected) {
                this._isSelected = newVal;
                this.needsDraw = true;
            }
        }