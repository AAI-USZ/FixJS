function() {
    var newSessionCommand = {
      'name': 'newSession',
      'context': '',
      'parameters': {
        'title_identifier': title_identifier
      }
    };
    builder.selenium2.playback.commandProcessor.execute(JSON.stringify(newSessionCommand), function(result) {
      builder.selenium2.playback.sessionId = JSON.parse(result).value;
      builder.selenium2.playback.playStep();
    });
  }