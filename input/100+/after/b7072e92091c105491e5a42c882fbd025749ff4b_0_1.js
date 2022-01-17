function() {
    grid_width = (self.config.num_strings-1)*self.config.string_gap;
    grid_height = self.config.num_frets*self.config.fret_gap;

    drawGrid(
      self.config.grid_x, self.config.grid_y,
      grid_width, grid_height,
      self.config.num_strings-1, self.config.num_frets, "#000");
    drawNotes();

    if (self.config.base_fret == 0) {
      drawNut();
    } else {
      drawBaseFret(self.config.base_fret);
    }

    drawLabel();

    // Rotate Horizontally
    var transform_str = "r-90,"+self.config.grid_x+","+self.config.grid_y+"t-"+grid_height+",0";
    //console.log(transform_str);
    //self.neck.transform(transform_str);
    self.notes.forEach(function(e) {
      //e.transform(transform_str);
    })

  }