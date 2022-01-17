function (test) {
  test.expect(6);

  var defaultSendBufferLength = ~~(UBJSON.Stream.defaultSendBufferLength/3);

  UBJSON.Stream.defaultSendBufferLength = defaultSendBufferLength;
  test.equal(UBJSON.Stream.defaultSendBufferLength, defaultSendBufferLength);

  var statisticsStream = new helper.StatisticsStream();
  var ubjsonStream = new UBJSON.Stream(statisticsStream);

  test.equal(ubjsonStream.sendBufferLength, defaultSendBufferLength);

  test.throws(function () {
    UBJSON.Stream.defaultSendBufferLength = 2;
  }, "Send buffer should be at least 8 bytes length to store longest UBJSON type - int64/double");

  test.equal(ubjsonStream.sendBufferLength, defaultSendBufferLength);

  test.throws(function () {
    ubjsonStream.sendBufferLength = 2;
  }, "Send buffer should be at least 8 bytes length to store longest UBJSON type - int64/double");

  test.equal(ubjsonStream.sendBufferLength, defaultSendBufferLength);

  test.done();
}