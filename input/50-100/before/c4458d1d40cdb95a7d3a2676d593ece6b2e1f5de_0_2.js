function play(audio) {
    if (current_playing)
      current_playing.pause();

    current_playing = audio;
    audio.play();
    // If we aren't getting any new songs, this will repeat the last song.
    // I'll consider this a feature.
    audio.addEventListener('ended', function() {
      play(last_loaded);
    });
  }