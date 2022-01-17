function(test) {
  let window = makeWindow();
  test.waitUntilDone();

  window.addEventListener("load", function onload() {
    window.removeEventListener("load", onload, true);

    let worker =  Worker({
      window: window,
      contentScript: 'new ' + function WorkerScope() {
        self.postMessage([
          "ContentWorker" in window,
          "UNWRAP_ACCESS_KEY" in window,
          "getProxyForObject" in window
        ]);
      },
      contentScriptWhen: 'ready',
      onMessage: function(list) {
        test.assert(!list[0], "worker API contrustor isn't leaked");
        test.assert(!list[1], "Proxy API stuff isn't leaked 1/2");
        test.assert(!list[2], "Proxy API stuff isn't leaked 2/2");
        test.done();
      }
    });

  }, true);

}