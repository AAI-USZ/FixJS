function() {
    var newSessionCommand = {
      'name': 'newSession',
      'context': '',
      'parameters': {
        'title_identifier': title_identifier
      }
    };
    builder.selenium2.playback.commandProcessor.execute(JSON.stringify(newSessionCommand), function(result) {
      if (JSON.parse(result).value === "NOT FOUND") {
        window.bridge.getRecordingWindow().document.title = title_identifier;
        window.setTimeout(builder.selenium2.playback.sessionStartTimeout, 1000);
        return;
      }
      builder.selenium2.playback.sessionId = JSON.parse(result).value;
      builder.selenium2.playback.playStep();
    });
  }