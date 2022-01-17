function (domEvt) {
            // TODO: this method should also be called when the mouse button is released, not depending on where it is
            // released

            if (this._cfg) { // this._cfg can become null if e.g. the button triggers a template substitution
                // and the button is part of that template
                this._mousePressed = false;
                this._updateState();
            }
        }