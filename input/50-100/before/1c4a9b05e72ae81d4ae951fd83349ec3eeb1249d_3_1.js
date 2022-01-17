function() {
    var defs = $.stone._defaults();
    assert.isObject(defs);
    assert.equals('fallback', defs.saveStrategy);
    assert.equals(0, defs.syncBufferLimit);
    assert.equals([], defs.enableEngines);
  }