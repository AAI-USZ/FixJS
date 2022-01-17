function (editor, inputLocation, collapse) {
    var commands = inputLocation.find(".sagecell_commands");
    var editorData;
    if (collapse !== undefined) {
        var header, code;
        var accordion = sagecell.util.createElement("div", {}, [
            header = sagecell.util.createElement("h3", {}, [
                document.createTextNode("Code")
            ]),
            code = document.createElement("div")
        ]);
        header.style.paddingLeft = "2.2em";
        $(accordion).insertBefore(commands);
        $(code).append(commands, inputLocation.find(".sagecell_editorToggle"));
        $(accordion).accordion({"active": (collapse ? false : header),
                                "collapsible": true,
                                "header": header});
    }
    if (editor === "textarea") {
        editorData = editor;
    } else if (editor === "textarea-readonly") {
        editorData = editor;
        commands.attr("readonly", "readonly");
    } else {
        var readOnly = false;
        if (editor == "codemirror-readonly") {
            readOnly = true;
        } else {
            editor = "codemirror";
        }
        editorData = CodeMirror.fromTextArea(
            commands.get(0),
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
            }});
        $(accordion).on("accordionchange", function () {
            editorData.refresh();
        });
    }
    return [editor, editorData];
}