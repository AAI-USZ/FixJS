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

    // y == screen.sy move it to the bottom to fill the remaining space
    let padding = this._getPadding(win);
    if (y > 100) {
      y += (2 * padding.height);
    }
    // snap, x, y
    win.move(false, x, y - padding.y);
    // snap, width, height, force
    win.resize(true, width, height - padding.height); //- padding.width, height - padding.height);
  }