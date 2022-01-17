function get_next_cell() {
    var cell = get_cell_by_position(update_order[update_position++]);
    if (update_position >= update_order.length) {
      update_order = shuffle(WIDTH * HEIGHT);
      update_position = 0;
    }

    if (cell === current_focal_cell || cell === current_playing_cell)
      return get_next_cell();
    return cell;
  }