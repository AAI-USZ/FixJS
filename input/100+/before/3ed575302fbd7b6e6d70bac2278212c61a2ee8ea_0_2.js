function(win, x, y, width, height) {

    if (height == -1) {
      win.maximize(Meta.MaximizeFlags.VERTICAL);
      height = 400; // dont resize to width, -1
    } else {
      win.unmaximize(Meta.MaximizeFlags.VERTICAL);
    }

    if (width == -1) {
      win.maximize(Meta.MaximizeFlags.HORIZONTAL);
      width = 400;  // dont resize to height, -1
    } else {
      win.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
    }

    // first move the window
    let padding = this._getPadding(win);
    // snap, x, y
    win.move_frame(true, x - padding.x, y - padding.y);
    // snap, width, height, force
    win.resize(true, width - padding.width, height - padding.height);
  }