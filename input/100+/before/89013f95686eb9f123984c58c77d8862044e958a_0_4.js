function(string, fret, tonic) {
    if(!fret || fret == 0) { return; }

    var x = self.config.grid_x + (string * self.config.string_gap);
    var y = self.config.grid_y + (fret * self.config.fret_gap) - (self.config.fret_gap / 2);
    var note_style = {
      fill: "black"
    };
    if (tonic) {
      note_style['fill']         = "white";
      note_style['stroke-width'] = self.config.note_stroke_width;
      note_style['stroke']      = "black";
    }
    self.notes.push(
      r.circle(x,y,self.config.note_radius)
        .attr(note_style)
        .node.setAttribute("class", "chord-note")
    );
  }