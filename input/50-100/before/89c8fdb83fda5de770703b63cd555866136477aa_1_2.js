function configurePopUp($popUp, removeHandler) {
        _popUps.push($popUp[0]);
        
        $popUp.data("initiallyInDOM", true);
        $popUp.data("removeHandler", removeHandler);
    }