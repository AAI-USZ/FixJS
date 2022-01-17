function lineComment(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        
        var mode = editor.getModeForSelection();
        
        // Currently we only support languages with "//" commenting
        if (mode === "javascript" || mode === "less") {
            lineCommentSlashSlash(editor);
        }
    }