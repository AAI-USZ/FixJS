function() {
    if (window.require === require) {
      window.require = _require
    }
  }