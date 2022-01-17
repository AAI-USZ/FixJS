function generateIndex(base, files) {
  var document = base.copy();
  var head = document.find().only().elem('head').toValue();

  // set title
  head.find()
      .only().elem('title').toValue()
      .setContent('Mocha Tests - all');

  // bind testcases
  Object.keys(files).forEach(function (relative) {
    head.append('<script src="/test' + relative + '"></script>');
  });

  return document.content;
}