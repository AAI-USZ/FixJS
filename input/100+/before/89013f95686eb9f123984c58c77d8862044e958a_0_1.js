function() {
    drawGrid(
      self.config.grid_x, self.config.grid_y,
      (self.config.num_strings-1)*self.config.string_gap, self.config.num_frets*self.config.fret_gap,
      self.config.num_strings-1, self.config.num_frets, "#000");
    drawNotes();

    if (self.config.base_fret == 0) {
      drawNut();
    } else {
      drawBaseFret(self.config.base_fret);
    }

    drawLabel();
  }