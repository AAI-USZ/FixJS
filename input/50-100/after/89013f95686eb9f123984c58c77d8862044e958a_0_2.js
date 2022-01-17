function(base_fret) {
    var x = self.config.grid_x + grid_width + self.config.base_fret_offset;
    var y = self.config.grid_y + self.config.fret_gap/2;

    r.text(x,y, ""+base_fret+"fr.").attr({ 'text-anchor': 'start', 'font-size': self.config.base_fret_font_size })
  }