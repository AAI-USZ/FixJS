function(x, y, w, h, wv, hv, color) {
    color = color || "#000";
    var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
        rowHeight = h / hv,
        columnWidth = w / wv;
    for (var i = 1; i < hv; i++) {
        path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
    }
    for (i = 1; i < wv; i++) {
        path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
    }

    self.grid_back = r.rect(self.config.grid_x, self.config.grid_y, grid_width, grid_height).attr("fill", "white");
    self.grid = r.path(path.join(",")).attr({stroke: color, 'stroke-width': self.config.grid_stroke_width})
    self.neck.push(
      self.grid,
      self.grid_back
    );

    // TODO: Start Here
    //       Hacky code to do a cursor and to add notes.
    //       Needs to be hella formalized
    self.grid_back.mousemove(_.bind(function(e) {
      var mouse_grid_x = e.offsetX - self.config.grid_x;
      var mouse_grid_y = e.offsetY - self.config.grid_y;

      var closest_string = Math.round(mouse_grid_x / self.config.string_gap);
      var closest_fret = Math.ceil(mouse_grid_y / self.config.fret_gap);
      //console.log(""+closest_string+","+closest_fret);

      if (closest_string != self.cursor_note_string ||
          closest_fret   != self.cursor_note_fret) {
        self.cursor_note_string = closest_string;
        self.cursor_note_fret = closest_fret;
        if (self.cursor_note) {
          self.cursor_note.remove();
        }
        self.cursor_note = drawNote({
          fret: self.cursor_note_fret,
          string: self.cursor_note_string
        });
        self.cursor_note.click(function() {
          self.cursor_note = null;
        });
      }
    }, self));
  }