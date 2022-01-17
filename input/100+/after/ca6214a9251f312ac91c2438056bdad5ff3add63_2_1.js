function (test) {
  test.expect(10);

  var preserveDefaultBufferLength = UBJSON.Stream.defaultSendBufferLength;

  var defaultSendBufferLength = 10;

  test.doesNotThrow(function () {
    UBJSON.Stream.defaultSendBufferLength = defaultSendBufferLength;
  });

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

  ubjsonStream.send("1234");

  test.deepEqual(
    statisticsStream.getStatistics(),
    {
      "writtenBytes": 1 + 1 + 4,
      "writtenChunks": 1
    }
  );

  statisticsStream.reset();

  ubjsonStream.send("1234567890");

  test.deepEqual(
    statisticsStream.getStatistics(),
    {
      "writtenBytes": 1 + 1 + 10,
      "writtenChunks": 2
    }
  );

  test.doesNotThrow(function () {
    UBJSON.Stream.defaultSendBufferLength = preserveDefaultBufferLength;
  });

  test.done();
}