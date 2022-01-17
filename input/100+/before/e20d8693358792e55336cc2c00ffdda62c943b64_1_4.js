function() {
    if (Capkom.uiLoaded) {
      return jQuery(".tts").ttswidget({
        spinnerUri: "css/spinner.gif",
        dialogTitle: "Sprechblase",
        forcedClose: function() {
          Capkom.timeout.clear();
          return Capkom.audioOff();
        },
        manualActivate: function() {
          return Capkom.audioOn();
        },
        active: !Capkom.profile.get("useAudio")
      });
    } else {
      return jQuery(":capkom-ttswidget").ttswidget('option', 'disabled', true);
    }
  }