function lineComment(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        
        // TODO: use mode *at cursor location*, so we can support mixed-mode e.g. JS in script blocks
        var mode = editor._codeMirror.getOption("mode");
        
        // Currently we only support languages with "//" commenting
        if (mode === "javascript" || mode === "less") {
            lineCommentSlashSlash(editor);
        }
    }