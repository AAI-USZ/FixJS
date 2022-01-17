function(){
    var newVal = 'completeSyncMode';
    changeMode1.val(newVal).change();
    ok(externalSelect.val() === newVal, 'change in one editor should change external select');
    ok(changeMode2.val() === newVal, 'change in one editor should change select in other editor');

    newVal = 'textile';
    externalSelect.val(newVal).change();
    ok(changeMode1.val() === newVal, 'change in external select should change editor 1');
    ok(changeMode2.val() === newVal, 'change in external select should change editor 2');

    helper1.click('.wysiwyg');
    ok(editor2.find('.wysiwyg').is('.on'), 'preview mode change should sync');
    
    newVal = 'completeSyncMode';
    changeMode1.val(newVal).change();
    ok(changeMode2.val() === newVal, 'sync with wysiwyg should change Datamode');
    ok(editor2.find('.wysiwyg').is('.on'), 'preview mode change should sync');
  }