function initEditorFromTextarea(textarea,instanceSettings){
    var editor,settings = {};
    $.extend(settings,globalSettings,instanceSettings);
    editor = new Editor(textarea, settings);

    editor.currentMode = editor.getDataMode();

    if(textarea.hasClass("wysiwyg")) {
      // TODO better flow here
      editor.currentMode.activate(editor);
      editor.currentMode = ME.getMode("wysiwyg");
    }
    editor.currentMode.activate(editor);
    editor.checkState();
    return editor;
  }