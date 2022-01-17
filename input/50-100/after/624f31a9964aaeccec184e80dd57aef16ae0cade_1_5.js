function initEditorFromTextarea(textarea,instanceSettings){
    var editor,settings = {};
    $.extend(settings,globalSettings,instanceSettings);
    editor = new Editor(textarea, settings);

    editor.currentMode = editor.getDataMode();

    if(textarea.hasClass("wysiwyg")) {
      editor.changeMode('wysiwyg');
    } else {
      editor.currentMode.activate(editor, function(){
        editor.currentMode.afterActivation;
      });
    }

    return editor;
  }