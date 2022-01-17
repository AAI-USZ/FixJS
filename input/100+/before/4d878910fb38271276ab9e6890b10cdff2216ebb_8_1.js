function _keydownCaptureListener(keyEvent) {
        if (keyEvent.keyCode !== 27) {
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
                    keyEvent.stopImmediatePropagation();
                    
                    _removePopUp($popUp, true);

                    // TODO: right now Menus and Context Menus do not take focus away from
                    // the editor. We need to have a focus manager to correctly manage focus
                    // between editors and other UI elements.
                    // For now we don't set focus here and assume individual popups
                    // adjust focus if necessary
                    // See story in Trello card #404
                    //EditorManager.focusEditor();
                }
                
                break;
            }
        }
    }