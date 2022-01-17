function _keydownCaptureListener(keyEvent) {
        if (keyEvent.keyCode !== 27) { // escape key
            return;
        }
        
        // allow the popUp to prevent closing
        var $popUp,
            i,
            event = new $.Event("popUpClose");
        
        for (i = _popUps.length - 1; i >= 0; i--) {
            $popUp = $(_popUps[i]);
            
            if ($popUp.find(":visible").length > 0) {
                $popUp.trigger(event);
                
                if (!event.isDefaultPrevented()) {
                    // Stop the DOM event from propagating
                    keyEvent.stopImmediatePropagation();
                    
                    removePopUp($popUp);
                    EditorManager.focusEditor();
                }
                
                break;
            }
        }
    }