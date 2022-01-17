function _handleKeyEvents(jqEvent, editor, event) {
        _checkElectricChars(jqEvent, editor, event);
        if (event.type === "keypress" || (event.type === "keydown" && event.keyCode === 8)) {
            CodeHintManager.checkForHint(editor);
        }
    }