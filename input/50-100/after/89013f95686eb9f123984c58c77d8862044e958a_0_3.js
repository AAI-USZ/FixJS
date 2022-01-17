function() {
    var x = self.config.grid_x + (grid_width / 2);
    var y = self.config.label_y_offset;
    var fancy_label = self.config.label
      .replace(/b/g, "♭")
      .replace(/\#/g, "♯")
      .replace(/\*/g, "￮");
    r.text(x,y,fancy_label).attr({ "text-anchor": "middle", "font-size": self.config.label_font_size });
  }