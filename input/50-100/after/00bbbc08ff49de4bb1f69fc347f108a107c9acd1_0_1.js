function () {
    var fileCount = 0;
    for (var x in editor.getFiles()) {
      if (editor.getFiles().hasOwnProperty(x)) {
        fileCount++;
      }
    }
    expect(fileCount).to(be, 3);
  }