function() {
  var WIDTH = 6;
  var HEIGHT = 4;
  var current_focal_cell = null;
  var current_active_cell = null;
  var current_hovering_cell = null;
  var last_loaded_cell = null;
  var update_position = 0;

  // Computes integer position based on grid coordinates.
  function compute_position(r, c) {
    return r * WIDTH + c;
  }

  // This is a spiral starting from the top right, traveling clockwise.
  // Rearrange for different effects.
  var update_order = function() {
    var positions = [];
    var north = 0, south = HEIGHT, east = WIDTH, west = 0, r = 0, c = 0;
    while (north < south && east > west) {
      // East side.
      for (r = north; r < south; ++r)
        positions.push(compute_position(r, east - 1));
      east--;
      // South side.
      for (c = east - 1; c >= west; --c)
        positions.push(compute_position(south - 1, c));
      south--;
      // West side.
      for (r = south - 1; r >= north; --r)
        positions.push(compute_position(r, west));
      west++;
      // North side.
      for (c = west; c < east; ++c)
        positions.push(compute_position(north, c));
      north++;
    }
    return positions;
  }();

  // Returns a list of numbers 1 to n shuffled.
  function shuffle(n) {
    var shuffled = [];
    for (var i = 0; i < n; i++)
      shuffled.splice(parseInt((i + 1) * Math.random(), 10), 0, i);
    return shuffled;
  }

  // Gets cell id for DOM.
  function get_cell_id(position) {
    return 'piece' + position;
  }

  // Returns DOM node for cell positions.
  function get_cell_by_position(position) {
    return document.getElementById(get_cell_id(position));
  }

  // Sets up the base html to load images and audio into.
  var init = function() {
    var echollage_dom = document.getElementById('echollage');
    echollage_dom.innerHTML = '';

    for (var r = 0; r < WIDTH; ++r) {
      var row = document.createElement('ul');

      for (var c = 0; c < HEIGHT; ++c) {
        var cell = document.createElement('li');
        cell.setAttribute('id', get_cell_id(r * HEIGHT + c));
        row.appendChild(cell);
      }
      echollage_dom.appendChild(row);
    }
  };

  // Returns the cell DOM node to replace next.
  function get_next_cell() {
    var cell = get_cell_by_position(update_order[update_position]);
    update_position++;
    if (update_position >= update_order.length) {
      update_order = shuffle(WIDTH * HEIGHT);
      update_position = 0;
    }

    if (cell === current_focal_cell || cell === current_active_cell ||
        cell === current_hovering_cell) {
      return get_next_cell();
    }
    return cell;
  }

  // Will switch the audio in a cell from playing to paused and vice versa.
  // If a new cell was clicked on, we will ask the updater to look for artists
  // similar to the on clicked on.
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

  function create_play_button() {
    var play = document.createElement('div');
    play.setAttribute('class', 'overlay play');
    return play;
  }

  function create_active_border() {
    var active_border = document.createElement('div');
    active_border.setAttribute('class', 'border');
    return active_border;
  }

  function create_track_info_box(track_data) {
    var track_info = document.createElement('div');
    track_info.setAttribute('class', 'overlay track-info');

    var artist_name = document.createElement('p');
    artist_name.textContent = track_data.artist_name;
    track_info.appendChild(artist_name);

    var track_title = document.createElement('p');
    track_title.textContent = track_data.title;
    track_info.appendChild(track_title);
    return track_info;
  }

  // Places successfully loaded audio and image on the grid and adds click
  // events.
  function place_loaded_data(track, audio, image) {
    var cell = get_next_cell();
    cell.innerHTML = '';
    cell.setAttribute('artist_id', track.artist_id);
    cell.appendChild(audio);
    cell.appendChild(image);
    cell.appendChild(create_active_border());
    cell.appendChild(create_track_info_box(track));

    image.onmouseover = function() {
      current_hovering_cell = cell;
    };

    var play_button = create_play_button();
    play_button.onclick = function() {
      toggle(cell);
    };
    cell.appendChild(play_button);
    last_loaded_cell = cell;
  }

  // Accepts track data and will attempt to load the audio and image within.
  // If it succeeds, we will place the image on the grid.
  var place_track = function(track) {
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
  };

  return {
    init: init,
    place_track: place_track
  };
}