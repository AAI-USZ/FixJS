function(base_fret) {
    var x = self.config.num_strings*self.config.string_gap + 20;
    var y = self.config.grid_y + self.config.fret_gap/2;
    self.elems.push(
      r.text(x,y, ""+base_fret+"fr.").attr({ 'font-size': self.config.anno_font_size })
    );
  }