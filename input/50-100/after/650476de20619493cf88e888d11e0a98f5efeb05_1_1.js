function removePopUp($popUp) {
        var index = _popUps.indexOf($popUp[0]);
        if (index >= 0) {
            var autoAddRemove = $popUp.data("PopUpManager-autoAddRemove"),
                removeHandler = $popUp.data("PopUpManager-removeHandler");
            
            if (removeHandler && $popUp.find(":visible").length > 0) {
                removeHandler();
            }
            
            if (autoAddRemove) {
                $popUp.remove();
                _popUps = _popUps.slice(index);
            }
        }
    }