function(editor) {
      editor.textArea
        .parent().show()
        .find(":first-child").focus()[0]
        .setSelectionRange(0,0);
      editor.htmlDiv.attr("contentEditable",false);
    }