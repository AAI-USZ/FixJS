function initEditorFromHTML(container, settings){
    if(!Editor.extractDataType(container[0].className)){
      ME.dialog.notice(['Ok'],'Datamode not found. Please specify a valid datamode')
        .dialog('open');
      return;
    }

    var editor,src,
    textarea = $("<textarea class=\"" + container[0].className + "\">");

    container.css("min-height", container.height());
    container.before(textarea); // needs to be attached to DOM in firefox

    settings = settings || {};
    settings.htmlDiv = container;
    editor = initEditorFromTextarea(textarea, settings);

    src = container.attr('src');
    if(src){
      $.get(src, {
      }, function(text, status, response){
        textarea.val(text);
        editor.checkState();
        editor.currentMode.updatePreview(editor);
      })
    } else {
      editor.currentMode.updateTextArea(editor);
      editor.changeMode("wysiwyg");
    }
  }