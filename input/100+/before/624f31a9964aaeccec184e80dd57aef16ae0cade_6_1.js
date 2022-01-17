function(){
    var previewButton = editor.find('a.wysiwyg');
    previewButton.mouseup();
    ok(!previewButton.is('.on'), 'preview off');
    previewButton.mouseup();
    ok(previewButton.is('.on'), 'preview on');
  }