function(_config, _element) {
    // Create config dict
    if (!_config) { _config = {}; }
    _.defaults(_config, viz_config_defaults)
    _.defaults(_config, data_config_defaults);
    self.config = _config;

    if (self.config.scale != 1) {
      scaleSize();
    }

    self.width = self.config.num_strings*self.config.string_gap + 20 + 30;
    self.height = self.config.grid_y + self.config.num_frets*self.config.fret_gap + 10;

    if (_.isString(_element)) {
      r = Raphael(document.getElementById(_element), self.width, self.height);
    } else {
      r = Raphael(_element, self.width, self.height);
    }

    self.elems = r.set();
    self.notes = r.set();
    self.annotations = r.set();
    self.elems.push(self.notes, self.annotations);
    render();
  }