function removePopUp($popUp) {
        var index = _popUps.indexOf($popUp[0]),
            initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        if (index >= 0) {
            _removePopUp($popUp, index);
        }
    }