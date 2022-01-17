function pg_observe(subject, topic, data) {
    switch (topic) {
    case 'app-startup': {
      Services.obs.addObserver(this, 'console-api-log-event', false);
      Services.obs.addObserver(this, 'in-process-browser-frame-shown', false);
      Services.obs.addObserver(this, 'remote-browser-frame-shown', false);
      break;
    }
    case 'console-api-log-event': {
      // Pipe `console` log messages to the nsIConsoleService which
      // writes them to logcat on Gonk.
      let message = subject.wrappedJSObject;
      let prefix = ('Content JS ' + message.level.toUpperCase() +
                    ' at ' + message.filename + ':' + message.lineNumber +
                    ' in ' + (message.functionName || 'anonymous') + ': ');
      Services.console.logStringMessage(prefix + Array.join(message.arguments,
                                                            ' '));
      break;
    }
    case 'remote-browser-frame-shown':
    case 'in-process-browser-frame-shown': {
      let frameLoader = subject.QueryInterface(Ci.nsIFrameLoader);
      //if (!!frameLoader.ownerElement.getAttribute('mozapp')) {
        dump("!!!!!!!!!!!!!SETTING ASYNC SCROLL");
        frameLoader.renderMode = Ci.nsIFrameLoader.RENDER_MODE_ASYNC_SCROLL;
      //}
      let mm = frameLoader.messageManager;
      try {
        mm.loadFrameScript(kWebApiShimFile, true);
      } catch (e) {
        log('Error loading ' + kWebApiShimFile + ' as frame script: ' + e + '\n');
      }
      break;
    }
    }
  }