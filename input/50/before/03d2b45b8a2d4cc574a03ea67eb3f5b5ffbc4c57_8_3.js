function toggleQuickEditAtOffset(editor, offset) {
        editor.setCursorPos(offset.line, offset.ch);
        
        return testWindow.executeCommand(Commands.TOGGLE_QUICK_EDIT);
    }