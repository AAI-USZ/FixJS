function _removePopUp($popUp, index, visible) {
        var autoAddRemove = $popUp.data("PopUpManager-autoAddRemove"),
            removeHandler = $popUp.data("PopUpManager-removeHandler");
        
        visible = visible || $popUp.find(":visible").length > 0;
        
        if (removeHandler && visible) {
            removeHandler();
        }
        
        if (autoAddRemove) {
            $popUp.remove();
            _popUps = _popUps.slice(index);
        }
    }