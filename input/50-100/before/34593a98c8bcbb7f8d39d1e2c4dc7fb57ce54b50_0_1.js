function (domEvt) {
            this.focus();
            this._mouseOver = true;
            this._mousePressed = true;
            this._updateState();

            if (aria.core.Browser.isChrome || aria.core.Browser.isSafari) {
                this.currTarget = domEvt.currentTarget;
            }
        }