function(){
    var previewButton = editor.find('a.wysiwyg'),
    changeMode = editor.find('.changeDataMode');

    previewButton.mouseup();
    ok(!previewButton.is('.on'), 'preview off');
    previewButton.mouseup();
    ok(previewButton.is('.on'), 'preview on');

    changeMode.val('haml').change();
    ok(previewButton.is(':visible'), 'preview button should be visible');
    ok(editor.find('.preview').is(':visible'), 'preview should be visible');
    stop(3);

    async(function(){
      start();
      ok(previewButton.is('.on'), 'preview on');

      previewButton.mouseup();

      async(function(){
        start();
        ok(!previewButton.is('.on'), 'preview off');
        ok(changeMode.val() === 'haml', 'The datamode should stay the same');
        previewButton.mouseup();

        async(function(){
          start();
          ok(previewButton.is('.on'), 'preview on');
          ok(changeMode.val() === 'haml', 'The datamode should stay the same');
        });
      });
    });
  }