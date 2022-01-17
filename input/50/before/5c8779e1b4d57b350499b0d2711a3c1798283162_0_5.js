function() {
    console.info('deactivate audio');
    return Capkom.profile.set({
      useAudio: false
    });
  }