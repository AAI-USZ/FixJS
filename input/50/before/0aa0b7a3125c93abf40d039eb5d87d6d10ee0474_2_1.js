function () {
    editor = new EpicEditor(
      { basePath: '/epiceditor/'
      , container: testEl
      }
    ).load();
    
    expect(document.getElementById(testEl).getElementsByTagName('iframe').length).to(be, 1);
  }