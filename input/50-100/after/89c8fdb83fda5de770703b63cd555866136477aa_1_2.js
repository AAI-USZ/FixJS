function addPopUp($popUp, removeHandler, autoAddRemove) {
        autoAddRemove = autoAddRemove || false;
        
        _popUps.push($popUp[0]);
        $popUp.data("PopUpManager-autoAddRemove", autoAddRemove);
        $popUp.data("PopUpManager-removeHandler", removeHandler);
        
        if (autoAddRemove) {
            $(window.document.body).append($popUp);
        }
    }