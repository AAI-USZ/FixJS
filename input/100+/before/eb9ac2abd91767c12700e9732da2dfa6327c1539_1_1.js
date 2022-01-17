function tryWith(count) {
    var source = new events.EventEmitter();
    var slicer = new Slicer(source);
    var coll = new CallbackCollector();

    for (var i = 0; i < count; i++) {
      slicer.read(10, coll.callback);
    }

    assert.equal(coll.callbacks.length, 0);
    source.emit("data", theData);
    assert.equal(coll.callbacks.length, 0);

    slicer.destroy();
    assert.ok(!slicer.readable);
    assert.equal(source.listeners("close").length, 0);
    assert.equal(source.listeners("data").length, 0);
    assert.equal(source.listeners("end").length, 0);
    assert.equal(source.listeners("error").length, 0);

    coll.assertCallback(0, false, theData.length, theData, 0);
    for (var i = 1; i < count; i++) {
      coll.assertCallback(i, false, 0, new Buffer(0), 0);
    }
  }