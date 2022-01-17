function makeTestCase(exBox) {
    var box, output, source, test;
    output = getBox(exBox);
    source = output.source;
    test = {
      expr: source.textContent,
      result: Repl.escapeHtml(Parse.print(output.result))
    };
    box = makeTestBox(test, owner(exBox));
    source.parentNode.insertBefore(box, source);
    remove(source);
    remove(output);
    box.parentNode.insertBefore(textNode('\uFEFF'), box);
    box.parentNode.insertBefore(textNode('\uFEFF'), box.nextSibling);
    if (owner(box).autorun.checked) return clickTest(box);
  }