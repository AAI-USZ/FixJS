function(value) {
      if (typeof value === 'string')
        value = (value == 'true');

      self.setPassCodeEnabled(value);
    }