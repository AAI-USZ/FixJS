function _handleSelectAll() {
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            editor._selectAllVisible();
        }
    }