function() {
  var WIDTH = 6;
  var HEIGHT = 4;
  var current_playing = null;
  var last_loaded = null;

  var update_position = 0;
  var update_order = function() {
    var shuffled = [];
    for (i = 0; i < WIDTH * HEIGHT; i++)
      shuffled.splice(parseInt((i + 1) * Math.random()), 0, i);
    return shuffled;
  }();

  function cell_id(position) {
    return 'piece' + position;
  };

  var init = function() {
    var echollage = document.getElementById('echollage');
    echollage.innerHTML = '';

    for (r = 0; r < WIDTH; ++r) {
      var row = document.createElement('ul');

      for (c = 0; c < HEIGHT; ++c) {
        var cell = document.createElement('li');
        cell.setAttribute('id', cell_id(r * HEIGHT + c));
        row.appendChild(cell);
      }
      echollage.appendChild(row);
    }
  };

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
  };

  function cell_loaded(cell, audio, image) {
    cell.innerHTML = '';
    cell.appendChild(image);
    cell.appendChild(audio);

    last_loaded = audio;
    image.onclick = function() {
      if (audio.paused)
        play(audio);
      else
        audio.pause();
    };
  };

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
  };

  var replace_next = function(track) {
    replace_cell(update_order[update_position], track);
    update_position = (update_position + 1) % (WIDTH * HEIGHT);
  };

  return {
    init: init,
    replace_next: replace_next,
  };
}