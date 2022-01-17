function _removePopUp($popUp) {
        var initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        if (removeHandler) {
            removeHandler();
        }
        
        if (!initiallyInDOM) {
            $popUp.remove();
        }
    }