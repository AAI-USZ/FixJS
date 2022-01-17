function() {
  builder.views.script.clearResults();
  builder.selenium2.playback.stopRequest = false;
  jQuery('#edit-clearresults-span').show();
  jQuery('#edit-local-playing').show();
  jQuery('#edit-stop-local-playback').show();

  // Set up Webdriver
  var handle = Components.classes["@googlecode.com/webdriver/fxdriver;1"].createInstance(Components.interfaces.nsISupports);
  var server = handle.wrappedJSObject;
  var driver = server.newDriver(window.bridge.getRecordingWindow());
  var iface = Components.classes['@googlecode.com/webdriver/command-processor;1'];
  builder.selenium2.playback.commandProcessor = iface.getService(Components.interfaces.nsICommandProcessor);
  // In order to communicate to webdriver which window we want, we need to uniquely identify the
  // window. The best way to do this I've found is to look for it by title. qqDPS This means that
  // the code in the command processor is modified from its baseline to notice the title_identifier
  // parameter and find the correct window.
  var title_identifier = "--" + new Date().getTime();
  window.bridge.getRecordingWindow().document.title = title_identifier;

  builder.selenium2.playback.sessionStartTimeout = function() {
    var newSessionCommand = {
      'name': 'newSession',
      'context': '',
      'parameters': {
        'title_identifier': title_identifier
      }
    };
    builder.selenium2.playback.commandProcessor.execute(JSON.stringify(newSessionCommand), function(result) {
      if (JSON.parse(result).value === "NOT FOUND") {
        // It might be we're still loading the recording window's page, and the title has changed.
        window.bridge.getRecordingWindow().document.title = title_identifier;
        window.setTimeout(builder.selenium2.playback.sessionStartTimeout, 1000);
        return;
      }
      builder.selenium2.playback.sessionId = JSON.parse(result).value;
      builder.selenium2.playback.playStep();
    });
  };
  
  window.setTimeout(builder.selenium2.playback.sessionStartTimeout, 100);
}