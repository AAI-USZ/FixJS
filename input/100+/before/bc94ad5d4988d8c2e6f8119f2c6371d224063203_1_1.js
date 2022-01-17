function (key, value) {
    var self = this;

    var old_value = self.keys[key];
    if (value === old_value)
      return;
    self.keys[key] = value;

    var invalidate = function (map) {
      if (map)
        for (var id in map)
          map[id].invalidate();
    };

    self._ensureKey(key);
    invalidate(self.key_deps[key]);
    invalidate(self.key_value_deps[key][old_value]);
    invalidate(self.key_value_deps[key][value]);
  }