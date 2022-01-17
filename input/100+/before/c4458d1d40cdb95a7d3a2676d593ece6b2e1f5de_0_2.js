function() {
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
  }