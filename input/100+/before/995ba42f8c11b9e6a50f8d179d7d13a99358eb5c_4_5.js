function(test) {
  let contentURL = 'data:text/html,<script>var documentValue=true;</script>';
  let window = makeWindow(contentURL);
  test.waitUntilDone();

  window.addEventListener("load", function onload() {
    window.removeEventListener("load", onload, true);

    let worker =  Worker({
      window: window.document.getElementById("content").contentWindow,
      contentScript: 'new ' + function WorkerScope() {
        let id = setTimeout(function () {
          self.postMessage("timeout");
        }, 100);
        unsafeWindow.eval("clearTimeout("+id+");");
      },
      contentScriptWhen: 'ready',
      onMessage: function(msg) {
        test.assert(msg,
          "content didn't managed to cancel our setTimeout");
        test.done();
      }
    });

  }, true);

}