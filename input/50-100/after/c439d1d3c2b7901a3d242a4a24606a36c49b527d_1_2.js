function removePopUp($popUp) {
        var idx = _popUps.indexOf($popUp[0]),
            initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        _removePopUp($popUp);
        
        if (idx >= 0) {
            _popUps = _popUps.slice(idx);
        }
    }