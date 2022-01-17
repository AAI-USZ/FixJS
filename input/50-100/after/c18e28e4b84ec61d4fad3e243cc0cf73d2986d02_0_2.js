function() {
    if (!fireAndForget) {
      jQuery('#edit-rc-playing').hide();
      jQuery('#edit-rc-stopping').hide();
      if (builder.selenium2.rcPlayback.postRunCallback) {
        builder.selenium2.rcPlayback.postRunCallback(builder.selenium2.rcPlayback.playResult);
      }
    }
  }