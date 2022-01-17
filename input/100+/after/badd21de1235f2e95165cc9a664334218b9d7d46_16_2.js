function bsm_close(origin, name) {
    if (!frames[origin])
      return false;

    if (typeof name == 'undefined') {
      // Close all windows
      Object.keys(frames[origin]).forEach(function closeEach(name) {
        document.body.removeChild(frames[origin][name]);
        frames[origin][name] = null;
      });
      delete frames[origin];
      return true;
    }

    // Close one window
    var frame = frames[origin][name];
    if (!frame)
      return false;

    document.body.removeChild(frame);
    delete frames[origin][name];

    if (!Object.keys(frames[origin]).length)
      delete frames[origin];
    return true;
  }