function (domEvt) {
            if (domEvt.keyCode == aria.DomEvent.KC_SPACE || domEvt.keyCode == aria.DomEvent.KC_ENTER) {
                this._keyPressed = true;
                this._updateState();
                domEvt.stopPropagation();
                return false;
            } else {
                return true;
            }
        }