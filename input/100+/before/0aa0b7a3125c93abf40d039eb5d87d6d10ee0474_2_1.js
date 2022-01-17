function () {

  var testEl, contents, editor;

  before(function () {
    testEl = _createTestElement();
    
    editor = new EpicEditor(
      { basePath: '/epiceditor/'
      , file: { defaultContent: '#foo\n\n##bar' }
      , container: testEl
      }).load();
  });


  it('check that exportFile will work without parameters by outputting the current file as raw text', function () {
    contents = editor.exportFile();
    expect(contents).to(match, /#foo\r?\n\r?\n##bar/);
  });

  it('check that exportFile will export the current file as HTML with a null parameter as it\'s first', function () {
    contents = editor.exportFile(null, 'html');
    expect(contents).to(be, '<h1>foo</h1>\n<h2>bar</h2>\n');
  });

  it('check that exporting a file that doesn\'t exist returns as undefined', function () {
    contents = editor.exportFile('doesntExist' + _randomNum());
    expect(contents).to(beUndefined);
  });

  it('check that export file can open non-currently open files', function () {
    var exportFileTest = 'exportFileTest' + _randomNum();
    editor.importFile(exportFileTest, 'hello world'); // import and open a file
    editor.open(testEl); // open the original again
    expect(editor.exportFile(exportFileTest)).to(be, 'hello world');
  });
}