function(name, prefix) {
      if (prefix) {
        name = prefix + name;
      }
      return navigator.mozL10n.get(name);
    }