function duplicateText(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        
        var sel = editor.getSelection();
        
        var hasSelection = (sel.start.line !== sel.end.line) || (sel.start.ch !== sel.end.ch);
        
        if (!hasSelection) {
            sel.start.ch = 0;
            sel.end = {line: sel.start.line + 1, ch: 0};
        }
        
        // Make the edit
        var doc = editor.document;
        
        var selectedText = doc.getRange(sel.start, sel.end);
        doc.replaceRange(selectedText, sel.start);
    }