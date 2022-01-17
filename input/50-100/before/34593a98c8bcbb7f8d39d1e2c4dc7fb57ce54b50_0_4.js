function (domEvt) {
            if (domEvt.keyCode == aria.DomEvent.KC_SPACE || domEvt.keyCode == aria.DomEvent.KC_ENTER) {
                this._keyPressed = false;
                this._updateState();

                if (!this._performAction(domEvt)) {
                    domEvt.stopPropagation();
                    return false;
                }
                return true;
            }
            return true;
        }