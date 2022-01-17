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