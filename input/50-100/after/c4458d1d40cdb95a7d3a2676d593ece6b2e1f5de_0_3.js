function new_cell_loaded(audio, image) {
    var cell = get_next_cell();
    cell.innerHTML = '';
    cell.appendChild(image);
    cell.appendChild(audio);

    last_loaded_cell = cell;
    image.onclick = function() {
      toggle(cell);
    };
  }