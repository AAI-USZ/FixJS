function() {
    if (Capkom.uiLoaded) {
      return jQuery(".tts").ttswidget(Capkom.getTTSOptions());
    } else {
      return jQuery(":capkom-ttswidget").ttswidget('option', 'disabled', true);
    }
  }