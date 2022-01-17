function(e) {
        var command = e.command;
        var editor = e.editor;
        if (!command.multiSelectAction) {
            command.exec(editor, e.args || {});
            editor.multiSelect.addRange(editor.multiSelect.toOrientedRange());
            editor.multiSelect.mergeOverlappingRanges();
        } else if (command.multiSelectAction == "forEach") {
            editor.forEachSelection(command, e.args);
        } else if (command.multiSelectAction == "single") {
            editor.exitMultiSelectMode();
            command.exec(editor, e.args || {});
        } else {
            command.multiSelectAction(editor, e.args || {});
        }
        e.preventDefault();
    }