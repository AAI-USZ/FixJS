function handleKeyEvent(editor, event) {
        // For now we only handle hints in html
        if (editor.getModeForSelection() !== "html") {
            return;
        }
        
        // Check for Control+Space
        if (event.type === "keydown" && event.keyCode === 32 && event.ctrlKey) {
            _showHint(editor);
            event.preventDefault();
        }

        // Pass to the hint list, if it's open
        if (hintList && hintList.isOpen()) {
            hintList.handleKeyEvent(editor, event);
        }
    }