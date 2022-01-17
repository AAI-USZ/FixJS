function (domEvt) {
            if (domEvt.keyCode == aria.DomEvent.KC_SPACE || domEvt.keyCode == aria.DomEvent.KC_ENTER) {
                this._keyPressed = false;
                this._updateState();
                domEvt.stopPropagation();
                return false;
            }
            return true;
        }