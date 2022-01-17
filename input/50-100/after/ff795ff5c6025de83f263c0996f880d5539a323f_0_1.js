function createCommonErrorResponse(errorCode, message) {
  var doc = xmlbuilder.create();

  doc.begin('Response', {version: '1.0'})
    .element('Errors')
      .element('Error')
        .element('Code').text(errorCode).up()
        .element('Message').text(message).up()
    .up()
    .element('RequestId').up();

  return doc.toString();
}