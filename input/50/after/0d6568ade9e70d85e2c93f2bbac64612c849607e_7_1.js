function _handleKeyEvents(jqEvent, editor, event) {
        _checkElectricChars(jqEvent, editor, event);

        // Pass the key event to the code hint manager. It may call preventDefault() on the event.
        CodeHintManager.handleKeyEvent(editor, event);
    }