function(track) {
    replace_cell(update_order[update_position], track);
    update_position = (update_position + 1) % (WIDTH * HEIGHT);
  }