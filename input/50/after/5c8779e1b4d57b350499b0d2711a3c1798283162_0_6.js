function() {
    Capkom.canClick();
    console.info('activate audio');
    return Capkom.profile.set({
      useAudio: true
    });
  }