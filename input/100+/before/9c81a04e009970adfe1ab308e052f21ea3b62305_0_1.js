function duplicateText(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }

        var doc = editor.document,
            sel = editor.getSelection(),
            hasSelection = (sel.start.line !== sel.end.line) || (sel.start.ch !== sel.end.ch),
            delimiter = "";

        if (!hasSelection) {
            sel.start.ch = 0;
            sel.end = {line: sel.start.line + 1, ch: 0};
            delimiter = typeof doc.getLine(sel.end.line) == "undefined" ? "\n" : delimiter;
        }

        // Make the edit

        var selectedText = doc.getRange(sel.start, sel.end) + delimiter;
        doc.replaceRange(selectedText, sel.start);
    }