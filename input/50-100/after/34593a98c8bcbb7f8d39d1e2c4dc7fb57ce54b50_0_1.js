function (domEvt) {
            this.focus();
            this._mouseOver = true;
            this._mousePressed = true;
            this._updateState();
            this.currTarget = domEvt.currentTarget;
        }