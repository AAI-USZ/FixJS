function(win, x, y, width, height) {

    global.log("resize x:" + x + " y:" + y + " w:" + width + " h:" + height + " s+h "+ (y + height));
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

    let outer = win.get_outer_rect(),
          inner = win.get_input_rect();
    y = y <= Main.panel.actor.height ? y : y - Math.abs(outer.y - inner.y);

    // snap, x, y
    win.move_frame(true, x, y);
    // snap, width, height, force
    win.resize(true, width - this._padding, height - this._padding);
  }