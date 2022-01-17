function(win, x, y, width, height) {

    if (!win.decorated) {
      if (height < 0) {
        height = height * -1;
      }
      if (width < 0) {
        width = width * -1;
      }
    }
    global.log(height + "  " + win.decorated);

    if (height < 0) {
      win.maximize(Meta.MaximizeFlags.VERTICAL);
      height = 400; // dont resize to width, -1
    } else {
      win.unmaximize(Meta.MaximizeFlags.VERTICAL);
    }

    if (width < 0) {
      win.maximize(Meta.MaximizeFlags.HORIZONTAL);
      width = 400;  // dont resize to height, -1
    } else {
      win.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
    }

    let padding = this._getPadding(win);
    // snap, x, y
    if (win.decorated) {
      win.move_frame(true, x, y);
    } else {
      win.move(true, x, y);
    }

    // snap, width, height, force
    win.resize(true, width - this._padding, height - padding.height - padding.y);
  }