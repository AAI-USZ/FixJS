function replace_cell(id, track) {
    var cell = document.getElementById(cell_id(id));
    var audio = new Audio()
    var image = new Image();

    var other_loaded = false;
    var component_loaded = function() {
      if (other_loaded)
        cell_loaded(cell, audio, image);
      other_loaded = true;
    };

    audio.addEventListener('canplaythrough', component_loaded);
    image.onload = component_loaded;
    audio.src = track.preview_url;
    image.src = track.release_image;
  }