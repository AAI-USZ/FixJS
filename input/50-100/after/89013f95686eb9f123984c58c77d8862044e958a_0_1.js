function() {
    self.neck.push(
      r.rect(self.config.grid_x,self.config.grid_y, (self.config.num_strings-1)*self.config.string_gap, self.config.nut_height).attr({ fill: "black"})
    );
  }