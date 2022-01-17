function javaScriptFunctionProvider(hostEditor, pos) {
        // Only provide a JavaScript editor when cursor is in JavaScript content
        if (hostEditor.getModeForSelection() !== "javascript") {
            return null;
        }
        
        // Only provide JavaScript editor if the selection is within a single line
        var sel = hostEditor.getSelection(false);
        if (sel.start.line !== sel.end.line) {
            return null;
        }
        
        // Always use the selection start for determining the function name. The pos
        // parameter is usually the selection end.        
        var functionName = _getFunctionName(hostEditor, hostEditor.getSelection().start);
        if (functionName === "") {
            return null;
        }
        
        return _createInlineEditor(hostEditor, functionName);
    }