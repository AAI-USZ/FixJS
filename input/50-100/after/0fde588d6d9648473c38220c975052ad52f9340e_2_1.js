function(result) {
      if (JSON.parse(result).value === "NOT FOUND") {
        // It might be we're still loading the recording window's page, and the title has changed.
        window.bridge.getRecordingWindow().document.title += title_identifier;
        window.setTimeout(builder.selenium2.playback.sessionStartTimeout, 1000);
        return;
      }
      builder.selenium2.playback.sessionId = JSON.parse(result).value;
      builder.selenium2.playback.playStep();
    }