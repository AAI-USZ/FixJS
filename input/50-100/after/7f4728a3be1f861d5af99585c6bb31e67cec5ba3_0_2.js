function generateTest(base, file) {
  var document = base.copy();
  var head = document.find().only().elem('head').toValue();

  // modify title
  head.find()
      .only().elem('title').toValue()
      .setContent('Mocha Tests - ' + file);

  // bind testcases
  head.append('<script src="/test' + file + '"></script>');

  return document.content;
}