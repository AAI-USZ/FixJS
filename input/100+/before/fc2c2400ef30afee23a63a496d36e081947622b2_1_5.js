function (editor, inputLocation) {
    var editorData;

    if (editor === "textarea") {
        editorData = editor;
    } else if (editor === "textarea-readonly") {
        editorData = editor;
        inputLocation.find(".sagecell_commands").attr("readonly", "readonly");
    } else {
        var readOnly = false;
        if (editor == "codemirror-readonly") {
            readOnly = true;
        } else {
            editor = "codemirror";
        }
        editorData = CodeMirror.fromTextArea(
            inputLocation.find(".sagecell_commands").get(0),
            {mode: "python",
             indentUnit: 4,
             tabMode: "shift",
             lineNumbers: true,
             matchBrackets: true,
             readOnly: readOnly,
             extraKeys: {'Shift-Enter': function (editor) {
                 editor.save();
                 inputLocation.find(".sagecell_evalButton").click();
             }},
             onKeyEvent: function (editor, event) {
                 editor.save();
                /* Saving state and restoring it seems more confusing for new users, so we're commenting it out for now.
                try {
                    sessionStorage.removeItem(inputLocationName+"_editorValue");
                    sessionStorage.setItem(inputLocationName+"_editorValue", inputLocation.find(".sagecell_commands").val());
                } catch (e) {
                    // if we can't store, don't do anything, e.g. if cookies are blocked
                }
                */
            }});
    }
    return [editor, editorData];
}