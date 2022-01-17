function(value) {
      if (typeof value === 'string')
        value = (value == 'true');

      self.setEnabled(value);
    }