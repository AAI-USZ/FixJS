function(track) {
    var image = new Image();
    var on_media_ready = echollage.on_multiple_ready(2, function() {
      place_loaded_data(track, image);
    });

    image.src = track.release_image;
    image.onload = on_media_ready;

    soundManager.createSound({
      id: track.id,
      url: track.preview_url,
      autoLoad: true,
      onload: on_media_ready,
      onfinish: function() {
        play(last_loaded_cell);
      }
    });
  }