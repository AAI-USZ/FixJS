function(track) {
    var audio = new Audio();
    var image = new Image();

    var other_loaded = false;
    var on_media_ready = echollage.on_multiple_ready(2, function() {
      place_loaded_data(track, audio, image);
    });

    image.src = track.release_image;
    image.onload = on_media_ready;
    audio.src = track.preview_url;
    audio.addEventListener('canplaythrough', on_media_ready);

    audio.addEventListener('ended', function() {
      toggle(last_loaded_cell);
    });
  }