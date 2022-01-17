function play(cell) {
    console.log("playing");
    if (cell !== current_active_cell)
      echollage.updater.set_focal_artist(cell.getAttribute('artist_id'));

    if (current_active_cell)
      soundManager.pause(current_active_cell.getAttribute('track_id'));
    soundManager.play(cell.getAttribute('track_id'));
    current_active_cell = cell;
  }