function removePopUp($popUp) {
        var index = _popUps.indexOf($popUp[0]),
            removeHandler = $popUp.data("PopUpManager-removeHandler");
        
        if (index >= 0) {
            _removePopUp($popUp, index);
        }
    }