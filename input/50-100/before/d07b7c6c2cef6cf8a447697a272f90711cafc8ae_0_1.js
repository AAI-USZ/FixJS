function createDeleteIndexFieldResponse(options) {
  var doc = xmlbuilder.create();

  // This is a workaround for the problem that text() does not work when empty string is given.
  // https://github.com/oozcitak/xmlbuilder-js/pull/19
  var requestId = doc.begin('DeleteIndexFieldResponse', {version: '1.0'}).attribute('xmlns', XMLNS)
    .element('DeleteIndexFieldResult')
    .up()
    .element('ResponseMetadata')
      .element('RequestId');

  if (options.requestId && options.requestId !== '') {
    requestId.text(options.requestId);
  }

  return doc.toString();
}