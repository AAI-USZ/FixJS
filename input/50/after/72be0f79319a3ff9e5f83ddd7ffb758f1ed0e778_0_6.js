function() {
    Capkom.canClick();
    Capkom.console.info('deactivate audio');
    return Capkom.profile.set({
      useAudio: false
    });
  }