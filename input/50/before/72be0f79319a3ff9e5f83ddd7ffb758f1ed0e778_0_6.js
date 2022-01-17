function() {
    Capkom.canClick();
    console.info('deactivate audio');
    return Capkom.profile.set({
      useAudio: false
    });
  }