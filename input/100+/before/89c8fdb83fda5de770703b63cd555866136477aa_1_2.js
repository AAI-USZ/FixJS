function (require, exports, module) {
    "use strict";
    
    var EditorManager = require("editor/EditorManager");
    
    var _popUps = [];
    
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
        var index = _popUps.indexOf($popUp[0]),
            initiallyInDOM = $popUp.data("initiallyInDOM"),
            removeHandler = $popUp.data("removeHandler");
        
        if (index >= 0) {
            _removePopUp($popUp, index);
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
                    // Stop the DOM event from propagating
                    keyEvent.stopImmediatePropagation();
                    
                    _removePopUp($popUp, i, true);
                    EditorManager.focusEditor();
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