function _removePopUp($popUp, index, visible) {
        var initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        visible = visible || $popUp.find(":visible").length > 0;
        
        if (removeHandler && visible) {
            removeHandler();
        }
        
        if (!initiallyInDOM) {
            $popUp.remove();
        }
        
        _popUps = _popUps.slice(index);
    }