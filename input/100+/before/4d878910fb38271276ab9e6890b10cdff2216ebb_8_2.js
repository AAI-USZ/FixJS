function (require, exports, module) {
    "use strict";
    
    var EditorManager = require("editor/EditorManager");
    
    var _popUps = [];
    
    function _removePopUp($popUp, visible) {
        var initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        visible = visible || $popUp.find(":visible").length > 0;
        
        if (removeHandler && visible) {
            removeHandler();
        }
        
        if (!initiallyInDOM) {
            $popUp.remove();
        }
    }
    
    /**
     * Add Esc key handling for pop-up DOM elements that persist in the DOM.
     * These pop-up elements must handle appearance (i.e. opening) themselves.
     *
     * @param {!jQuery} $popUp jQuery object for the DOM element pop-up
     * @param {function} removeHandler Pop-up specific remove (e.g. display:none or DOM removal)
     */
    function configurePopUp($popUp, removeHandler) {
        _popUps.push($popUp[0]);
        
        $popUp.data("initiallyInDOM", true);
        $popUp.data("removeHandler", removeHandler);
    }
    
    /**
     * Add Esc key handling for transient DOM elements. Immediately adds
     * the element to the DOM if it's not already attached.
     *
     * @param {!jQuery} $popUp jQuery object for the DOM element pop-up
     * @param {function} removeHandler Pop-up specific remove (e.g. display:none or DOM removal)
     */
    function addPopUp($popUp, removeHandler) {
        var initiallyInDOM = $popUp.parent().length === 1;
        
        configurePopUp($popUp, removeHandler, initiallyInDOM);
        
        if (!initiallyInDOM) {
            $(window.document.body).append($popUp);
        }
    }
    
    /**
     * Remove Esc key handling for a pop-up. Removes the pop-up from the DOM
     * if the pop-up is currently visible and was not originally attached.
     *
     * @param {!jQuery} $popUp
     */
    function removePopUp($popUp) {
        var idx = _popUps.indexOf($popUp[0]),
            initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        _removePopUp($popUp);
        
        if (idx >= 0) {
            _popUps = _popUps.slice(idx);
        }
    }
    
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
    
    window.document.body.addEventListener("keydown", _keydownCaptureListener, true);
    
    exports.addPopUp        = addPopUp;
    exports.removePopUp     = removePopUp;
    exports.configurePopUp  = configurePopUp;
}