function toggleQuickEditAtOffset(editor, offset) {
        editor.setCursorPos(offset.line, offset.ch);
        
        return _testWindow.executeCommand(Commands.TOGGLE_QUICK_EDIT);
    }