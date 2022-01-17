function initEditorFromHTML(container, settings){
    container.css("min-height", container.height());
    var editor,
    textarea = $("<textarea class=\"" + container[0].className + "\">");
    container.before(textarea); // needs to be attached to DOM in firefox

    settings = settings || {};
    settings.htmlDiv = container;
    editor = initEditorFromTextarea(textarea, settings);
    editor.currentMode.updateTextArea();
    editor.changeMode("wysiwyg");
    editor.checkState();
  }