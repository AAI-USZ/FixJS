function(note) {
    if(!note.fret || note.fret == 0) { return; }

    var x = self.config.grid_x + (note.string * self.config.string_gap);
    var y = self.config.grid_y + (note.fret * self.config.fret_gap) - (self.config.fret_gap / 2);
    var note_style = {
      fill: "90-#eee:5-#fff:95"
    };
    if (note.tonic) {
      note_style['fill']         = "90-#000:5-#555:95";
      note_style['stroke-width'] = self.config.note_stroke_width;
      note_style['stroke']      = "black";
    }

    var class_str = "chord-note";
    if (note.class) { class_str = class_str + " " + note.class; }

    var glyph = r.circle(x,y,self.config.note_radius)
      .attr(note_style)
      .node.setAttribute("class", class_str);

    self.notes.push(glyph);
  }