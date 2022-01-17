function(where) {
    let win = global.display.focus_window;
    if (win==null) {
        return;
    }
    var pos = win.get_outer_rect();

    let sIndex = this._primary;
    let sl = this._screens.length;

    // left edge is sometimes -1px...
    pos.x = pos.x < 0 ? 0 : pos.x;
    for (let i=0; i<sl; i++) {
      if (i == sl-1) {
        sIndex = i;
        break;
      }
      if (this._screens[i].x <= pos.x && this._screens[(i+1)].x > pos.x) {
        sIndex = i;
        break;
      }
    }

    let s = this._screens[sIndex];
    // check if we are on primary screen and if the main panel is visible
    s = this._recalcuteSizes(s);

    let moveRightX = s.x;
    if (where.indexOf("e") > -1) {
       moveRightX = s.geomX + s.totalWidth - s.width;
    }

    let diff = null,
      sameWidth = this._samePoint(pos.width, s.width);

    let maxH = (pos.height >= s.totalHeight) || this._samePoint(pos.height, s.totalHeight);

    if (where=="n") {
      this._resize(win, s.x, s.y, s.totalWidth * -1, s.height);
    } else if (where == "e") {
      // fixme. wont move left...
      if (sIndex < (sl-1) && sameWidth && maxH && pos.x + s.width >= s.totalWidth) {
        s = this._recalcuteSizes(this._screens[(sIndex+1)]);
        this._resize(win, s.x, s.y, s.width, s.totalHeight * -1);
      } else {
        this._resize(win, moveRightX, s.y, s.width, s.totalHeight * -1); //(s.x + s.width)
      }
    } else if (where == "s") {
      this._resize(win, s.x, s.sy, s.totalWidth * -1, s.height);
    } else if (where == "w") {
      // if we are not on screen[i>0] move window to the left screen
      let newX = pos.x - s.width;
      if (sIndex > 0 && sameWidth && maxH && newX < (s.width + 150)) {
        s = this._screens[(sIndex-1)];
        moveRightX = s.geomX + s.totalWidth - s.width;
        this._resize(win, moveRightX, s.y, s.width, s.totalHeight * -1);
      } else {
        this._resize(win, s.x, s.y, s.width, s.totalHeight * -1);
      }
    }

    if (where == "ne") {
      this._resize(win, moveRightX, s.y, s.width, s.height)
    } else if (where == "se") {
      this._resize(win, moveRightX, s.sy, s.width, s.height)
    } else if (where == "sw") {
      this._resize(win, s.x, s.sy, s.width, s.height)
    } else if (where == "nw") {
      this._resize(win, s.x, s.y, s.width, s.height)
    }

    // calculate the center position and check if the window is already there
    if (where == "c") {

      let w = s.totalWidth * (this._utils.getNumber(this.CENTER_WIDTH, 50) / 100),
        h = s.totalHeight * (this._utils.getNumber(this.CENTER_HEIGHT, 50) / 100),
        x = s.x + (s.totalWidth - w) / 2,
        y = s.y + (s.totalHeight - h) / 2,
        sameHeight = this._samePoint(h, pos.height);

      // do not check window.width. until i find get_size_hint(), or min_width..
      // windows that have a min_width < our width it will not work (evolution for example)
      if (this._samePoint(x, pos.x) && this._samePoint(y, pos.y) && sameHeight) {
        // the window is alread centered -> maximize
        this._resize(win, s.x, s.y, s.totalWidth * -1, s.totalHeight * -1);
      } else {
        // the window is not centered -> resize
        this._resize(win, x, y, w, h);
      }
    }
  }