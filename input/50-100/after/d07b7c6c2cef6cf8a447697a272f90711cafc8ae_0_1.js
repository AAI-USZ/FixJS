function createDeleteIndexFieldResponse(options) {
  var doc = xmlbuilder.create();

  doc.begin('DeleteIndexFieldResponse', {version: '1.0'})
    .attribute('xmlns', XMLNS)
    .element('DeleteIndexFieldResult').up()
    .element('ResponseMetadata')
      .element('RequestId').text(options.requestId || '').up()
    .up();

  return doc.toString();
}