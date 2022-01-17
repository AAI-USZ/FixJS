function(){
          start();
          ok(previewButton.is('.on'), 'preview on');
          ok(changeMode.val() === 'haml', 'The datamode should stay the same');
        }