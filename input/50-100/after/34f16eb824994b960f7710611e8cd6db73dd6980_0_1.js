function handleKeyEvent(editor, event) {
        // Check for Control+Space or "<"
        if (event.type === "keydown" && event.keyCode === 32 && event.ctrlKey) {
            _showHint(editor);
            event.preventDefault();
        } else if (event.type === "keyup" && event.keyCode === 188) {
            _showHint(editor);
        }

        // Pass to the hint list, if it's open
        if (hintList && hintList.isOpen()) {
            hintList.handleKeyEvent(editor, event);
        }
    }