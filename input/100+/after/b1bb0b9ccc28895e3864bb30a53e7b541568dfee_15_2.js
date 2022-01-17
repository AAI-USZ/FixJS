function MultiSelect(editor) {
    editor.$onAddRange = editor.$onAddRange.bind(editor);
    editor.$onRemoveRange = editor.$onRemoveRange.bind(editor);
    editor.$onMultiSelect = editor.$onMultiSelect.bind(editor);
    editor.$onSingleSelect = editor.$onSingleSelect.bind(editor);

    exports.onSessionChange.call(editor, editor);
    editor.on("changeSession", exports.onSessionChange.bind(editor));

    editor.on("mousedown", onMouseDown);
    editor.commands.addCommands(commands.defaultCommands);

    addAltCursorListeners(editor);
}