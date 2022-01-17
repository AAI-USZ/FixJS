function () {
  
  var testEl, editor, removeMeFile, dontRemoveMeFile, eventWasFired;

  before(function () {
    testEl = _createTestElement();
    editor = new EpicEditor({ basePath: '/epiceditor/', container: testEl }).load();
    removeMeFile = 'removeMe' + _randomNum();
    dontRemoveMeFile = 'dontRemoveMe' + _randomNum();
    editor.importFile(removeMeFile, 'hello world').importFile(dontRemoveMeFile, 'foo bar');
  });
  
  it('check that the foo file was imported', function () {
    expect(editor.exportFile(removeMeFile)).to(be, 'hello world');
  });

  it('check that after removing the file exportFile returns false', function () {
    editor.remove(removeMeFile);
    expect(editor.exportFile(removeMeFile)).to(beUndefined);
  });

  it('check that other files weren\'t removed', function () {
    expect(editor.exportFile(dontRemoveMeFile)).to(be, 'foo bar');
  });


  it('check that the remove event fires when a file is deleted', function () {
    editor.on('remove', function () {
      eventWasFired = true;
    });

    editor.open(removeMeFile);
    editor.remove(removeMeFile);
    expect(eventWasFired).to(beTrue);
  });
}