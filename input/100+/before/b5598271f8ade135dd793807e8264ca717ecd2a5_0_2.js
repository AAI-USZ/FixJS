function handleFileOpen(commandData) {
        var fullPath = null;
        if (commandData) {
            fullPath = commandData.fullPath;
        }
        
        return _doOpenWithOptionalPath(fullPath)
            .always(EditorManager.focusEditor);
    }