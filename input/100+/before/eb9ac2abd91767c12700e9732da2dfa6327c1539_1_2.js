function tryWith(endEvent, endArg) {
    var theData = new Buffer("ice cream");

    var source = new events.EventEmitter();
    var slicer = new Slicer(source);
    var coll = new CallbackCollector();

    var expectError = (endEvent === "error") || (endArg !== undefined);

    slicer.read(1000, coll.callback);
    slicer.read(1, coll.callback);
    source.emit("data", theData);
    assert.equal(coll.callbacks.length, 0);

    emit(source, endEvent, endArg);
    assert.equal(coll.callbacks.length, 2);

    coll.assertCallback(0, false, theData.length, theData, 0);
    coll.assertCallback(1, expectError, 0, new Buffer(0), 0);
  }