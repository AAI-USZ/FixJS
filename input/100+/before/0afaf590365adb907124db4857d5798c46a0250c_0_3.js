function _translateKeyboardEvent(event) {
        var hasMacCtrl = (brackets.platform === "win") ? false : (event.ctrlKey),
            hasCtrl = (brackets.platform === "win") ? (event.ctrlKey) : (event.metaKey),
            hasAlt = (event.altKey),
            hasShift = (event.shiftKey),
            key = String.fromCharCode(event.keyCode);
        
        //From the W3C, if we can get the KeyboardEvent.keyIdentifier then look here
        //As that will let us use keys like then function keys "F5" for commands. The
        //full set of values we can use is here
        //http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/keyset.html#KeySet-Set
        var ident = event.keyIdentifier;
        if (ident) {
            if (ident.charAt(0) === "U" && ident.charAt(1) === "+") {
                //This is a unicode code point like "U+002A", get the 002A and use that
                key = String.fromCharCode(parseInt(ident.substring(2), 16));
            } else {
                //This is some non-character key, just use the raw identifier
                key = ident;
            }
        }
        
        // Translate some keys to their common names
        if (key === "\t") {
            key = "Tab";
        } else if (key === " ") {
            key = "Space";
        }
        key = _mapKeycodeToKey(event.keyCode, key);

        return _buildKeyDescriptor(hasMacCtrl, hasCtrl, hasAlt, hasShift, key);
    }