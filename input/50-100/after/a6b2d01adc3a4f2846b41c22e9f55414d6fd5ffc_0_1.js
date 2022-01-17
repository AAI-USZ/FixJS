function outerIframeLoaded() {
  var injectedScript =
    "data:,function is(a, b, desc) {                                     \
      if (a == b) {                                                      \
        sendAsyncMessage('test:test-pass', desc);                        \
      } else {                                                           \
        sendAsyncMessage('test:test-fail', desc + ' ' + a + ' != ' + b); \
      }                                                                  \
    }                                                                    \
    is(content.window.top, content.window, 'top');                       \
    is(content.window.parent, content.window, 'parent');                 \
    is(content.window.frameElement, null, 'frameElement');               \
    var innerIframe = content.document.getElementById('inner-iframe');   \
    var innerWindow = innerIframe.contentWindow;                         \
    is(innerWindow.top, content.window, 'inner top');                    \
    is(innerWindow.parent, content.window, 'inner parent');              \
    is(innerWindow.frameElement, innerIframe, 'inner frameElement');"

  var mm = SpecialPowers.getBrowserFrameMessageManager(iframe);

  function onRecvTestPass(msg) {
    numMsgReceived++;
    ok(true, msg.json);
  }
  mm.addMessageListener('test:test-pass', onRecvTestPass);

  function onRecvTestFail(msg) {
    numMsgReceived++;
    ok(false, msg.json);
  }
  mm.addMessageListener('test:test-fail', onRecvTestFail);

  mm.loadFrameScript(injectedScript, /* allowDelayedLoad = */ false);

  waitForMessages(6);
}