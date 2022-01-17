function (domEvt) {
            // TODO: this method should also be called when the mouse button is released, not depending on where it is
            // released

            if (aria.core.Browser.isChrome || aria.core.Browser.isSafari) {
                if (this._mousePressed && domEvt.currentTarget == this.currTarget) {
                    // handle an onclick event
                    this._performAction(domEvt);
                }
                this.currTarget = null;
            }

            if (this._cfg) { // this._cfg can become null if e.g. the button triggers a template substitution
                // and the button is part of that template
                this._mousePressed = false;
                this._updateState();
            }

        }