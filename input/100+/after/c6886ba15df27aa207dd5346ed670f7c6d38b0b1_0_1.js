function(test) {
  var timesClosed = 0;
  var fakeWindow = {
    _listeners: [],
    addEventListener: function(name, func, bool) {
      this._listeners.push(func);
    },
    removeEventListener: function(name, func, bool) {
      var index = this._listeners.indexOf(func);
      if (index == -1)
        throw new Error("event listener not found");
      this._listeners.splice(index, 1);
    },
    close: function() {
      timesClosed++;
      this._listeners.forEach(
        function(func) { 
          func({target: fakeWindow.document});
        });
    },
    document: {
      get defaultView() { return fakeWindow; }
    }
  };

  let loader = Loader.new(options);
  let require = loader.require.bind(loader, module.uri);
  require("window-utils").closeOnUnload(fakeWindow);
  test.assertEqual(fakeWindow._listeners.length, 1,
                   "unload listener added on closeOnUnload()");
  test.assertEqual(timesClosed, 0,
                   "window not closed when registered.");
  require("unload").send();
  test.assertEqual(timesClosed, 1,
                   "window closed on module unload.");
  test.assertEqual(fakeWindow._listeners.length, 0,
                   "unload event listener removed on module unload");

  timesClosed = 0;
  require("window-utils").closeOnUnload(fakeWindow);
  test.assertEqual(timesClosed, 0,
                   "window not closed when registered.");
  fakeWindow.close();
  test.assertEqual(timesClosed, 1,
                   "window closed when close() called.");
  test.assertEqual(fakeWindow._listeners.length, 0,
                   "unload event listener removed on window close");
  require("unload").send();
  test.assertEqual(timesClosed, 1,
                   "window not closed again on module unload.");
  loader.unload();  
}