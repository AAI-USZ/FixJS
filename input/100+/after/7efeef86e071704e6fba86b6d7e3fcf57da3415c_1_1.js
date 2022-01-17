function(cm) {
  cm.setValue("aaa\nbbb\nccc\nddd\n");
  cm.markText({line: 0, ch: 0}, {line: 2}, "foo");
  cm.replaceRange("aaa\nbbb\nccc", {line: 0, ch: 0}, {line: 2});
  eq(cm.findMarksAt({line: 1, ch: 1}).length, 0);
}