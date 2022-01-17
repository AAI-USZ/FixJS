function() {
    var x = 0;
    var y = self.config.label_y_offset;
    var fancy_label = self.config.label
      .replace(/b/g, "♭")
      .replace(/\#/g, "♯")
      .replace(/\*/g, "￮");
    self.elems.push(
      r.text(x,y,fancy_label).attr({ "text-anchor": "start", "font-size": self.config.label_font_size })
    );
  }