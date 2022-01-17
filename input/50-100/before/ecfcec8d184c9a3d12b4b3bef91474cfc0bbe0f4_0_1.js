function(result) {
      builder.selenium2.playback.sessionId = JSON.parse(result).value;
      builder.selenium2.playback.playStep();
    }