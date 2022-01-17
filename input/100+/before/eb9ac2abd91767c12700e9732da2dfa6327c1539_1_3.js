function noCallbackReuse() {
  var theData = new Buffer("cannelle");

  var source = new events.EventEmitter();
  var slicer = new Slicer(source);
  var colls = [];

  for (var i = 0; i < 20; i++) {
    colls[i] = new CallbackCollector();
    slicer.read(1, colls[i].callback);
  }

  source.emit("data", theData);
  source.emit("end");

  for (i = 0; i < colls.length; i++) {
    var one = colls[i];
    var expectBuf =
      (i < theData.length) ? theData.slice(i, i + 1) : new Buffer(0);

    assert.equal(one.callbacks.length, 1);
    one.assertCallback(0, false, expectBuf.length, expectBuf, 0);
  }
}