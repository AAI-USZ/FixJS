function (require, exports, module) {
    'use strict';
    
    // Load dependent modules
    var HTMLUtils       = require("language/HTMLUtils"),
        CommandManager  = require("command/CommandManager"),
        Commands        = require("command/Commands"),
        EditorManager   = require("editor/EditorManager"),
        HTMLTags        = require("text!CodeHints/HtmlTags.json");
    
    /**
     * @private
     * Parse the code hints from JSON data and extract all hints from name property.
     * @param {string} a JSON string that has the code hints data
     * @param {!string} a string used to filter code hints
     * @return {!Array.<string>} An array of code hints read from the JSON data source.
     */
    function _getCodeHints(jsonStr, filter) {
        var hintObj = JSON.parse(jsonStr),
            hintArray = [];
        hintArray = $.map(hintObj, function(value, key) {           
            return key;
        });

        if (!filter) {
            return hintArray;
        } else {
            var matcher = new RegExp(filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i" );
    
            return $.grep(hintArray, function(value) {
                return matcher.test( value );
            });
        }
    }

    /**
     * @private
     * Test functions to see if the hinting is working
     * @param {CodeMirror} editor An instance of a CodeMirror editor
     */
    function _triggerClassHint(editor, pos, tagInfo) {
        //console.log("_triggerClassHint called for tag: " + tagInfo.tagName + " and attr value: " + tagInfo.attr.value);
    }
    
    function _triggerIdHint(editor, pos, tagInfo) {
        //console.log("_triggerIdHint called for tag: " + tagInfo.tagName + " and attr value: " + tagInfo.attr.value);
    }
    
    /**
     * @private
     * Checks to see if this is an attribute value we can hint
     * @param {CodeMirror} editor An instance of a CodeMirror editor
     */
    function _checkForHint(editor) {
//        var pos = editor._codeMirror.getCursor();
//        var tagInfo = HTMLUtils.getTagInfo(editor, pos);
//        if (tagInfo.position.tokenType === HTMLUtils.ATTR_VALUE) {
//            if (tagInfo.attr.name === "class") {
//                _triggerClassHint(editor, pos, tagInfo);
//            } else if (tagInfo.attr.name === "id") {
//                _triggerIdHint(editor, pos, tagInfo);
//            }
//        } else if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME) {
//            $("#codehint-text")
//                .focus()
//                .html(tagInfo.tagName)
//                .smartAutoComplete({
//                    maxResults: 20,
//                    minCharLimit: 0,
//                    autocompleteFocused: true,
//                    forceSelect: false,
//                    typeAhead: false,
//                    filter: _handleFilter,
//                    //resultFormatter: _handleResultsFormatter
//                });
//            return false;
//         }

        $("#codehint-text")
            .focus();
    }

    function _handleFilter(query) {
        return _getCodeHints(HTMLTags, query); 
//        var source = ["apple", "bay", "cat", "dog", "egg"]; 
//        var matcher = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i" );
//
//        return $.grep(source, function(value) {
//          return matcher.test( value );
//        });
    }
    
    /**
     * @private
     * Called whenever a CodeMirror editor gets a key event
     * @param {object} event the jQuery event for onKeyEvent
     * @param {CodeMirror} editor An instance of a CodeMirror editor
     * @param {object} keyboardEvent  the raw keyboard event that CM is handling
     */
    function _onKeyEvent(event, editor, keyboardEvent) {
        if (keyboardEvent.type !== "keypress") {
            return;
        }
        window.setTimeout(function () { _checkForHint(editor); }, 40);
    }

    CommandManager.register( "Code Hint", Commands.CODE_HINT, function () {
        _checkForHint(EditorManager.getFocusedEditor());
    });



    $("#codehint-text").smartAutoComplete({
        maxResults: 20,
        minCharLimit: 0,
        autocompleteFocused: true,
        forceSelect: false,
        typeAhead: false,
        filter: _handleFilter,
        // resultFormatter: _handleResultsFormatter
    });

    // Define public API
}