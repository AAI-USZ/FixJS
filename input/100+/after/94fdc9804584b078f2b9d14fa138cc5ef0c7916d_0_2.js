function toggle(cell) {
    var audio = soundManager.getSoundById(cell.getAttribute('track_id'));
    if (!audio.playState)
      play(cell);
    else
      audio.pause();
  }