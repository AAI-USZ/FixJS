function () {
    var fileCount = 0;
    for (x in editor.getFiles()) {
      fileCount++;
    }
    expect(fileCount).to(be, 3);
  }