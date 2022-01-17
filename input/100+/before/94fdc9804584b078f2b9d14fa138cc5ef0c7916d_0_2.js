function toggle(cell) {
    var audio = cell.getElementsByTagName('audio')[0];

    if (!audio.paused) {
      audio.pause();
      cell.getElementsByClassName('border')[0].style.visibility = 'hidden';
    }
    else {
      if (cell !== current_active_cell) {
        var artist_id = cell.getAttribute('artist_id');
        echollage.updater.set_focal_artist(artist_id);
      }
      if (current_active_cell)
        current_active_cell.getElementsByTagName('audio')[0].pause();

      audio.play();
      current_active_cell = cell;
      cell.getElementsByClassName('border')[0].style.visibility = 'visible';
    }
  }