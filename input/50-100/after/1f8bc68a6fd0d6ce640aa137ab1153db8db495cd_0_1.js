function load(url, content, type, line) {
    if (panel_isReady) {
      panel_window.purple.showContent(url, content, type);
      panel_window.purple.setCursorOn(url, line || 1, 1);
    } else {
      buffer = Array.prototype.slice.apply(arguments);
      console.log('buffering load', buffer);
    }
  }