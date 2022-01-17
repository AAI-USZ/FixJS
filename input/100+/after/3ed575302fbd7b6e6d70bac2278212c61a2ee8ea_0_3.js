function() {
    // read configuration and init the windowTracker
    this._settings = new SettingsWindow.SettingsWindow(_path + "putWindow.json");

    this._windowTracker = Shell.WindowTracker.get_default();

    let display = global.screen.get_display();
    this._windowCreatedListener = display.connect_after('window-created', Lang.bind(this, this._moveConfiguredWhenCreated));

    // get monotor(s) geometry
    this._primary = global.screen.get_primary_monitor();
    let numMonitors = global.screen.get_n_monitors();

    // only tested with 2 screen setup
    for (let i=0; i<numMonitors; i++) {
      let geom = global.screen.get_monitor_geometry(i),
        totalHeight = geom.height;

      this._screens[i] =  {
        y: geom.y, // (i==this._primary) ? geom.y + this._topBarHeight : geom.y,
        x : geom.x,
        geomX: geom.x,
        geomY: geom.y,
        totalWidth: geom.width,
        totalHeight: totalHeight,
        width: geom.width * this._getSideWidth()
      };

      this._screens[i].primary = (i==this._primary)
    }

    // sort by x position. makes it easier to find the correct screen
    this._screens.sort(function(s1, s2) {
        return s1.x - s2.x;
    });

    // move to n, e, s an w
    this._addKeyBinding("move-to-side-n",
      Lang.bind(this, function(){ this._moveFocused("n");})
    );
    this._addKeyBinding("move-to-side-e",
      Lang.bind(this, function(){ this._moveFocused("e");})
    );
    this._addKeyBinding("move-to-side-s",
      Lang.bind(this, function(){ this._moveFocused("s");})
    );
    this._addKeyBinding("move-to-side-w",
      Lang.bind(this, function(){ this._moveFocused("w");})
    );

    // move to  nw, se, sw, nw
    this._addKeyBinding("move-to-corner-ne",
      Lang.bind(this, function(){ this._moveFocused("ne");})
    );
    this._addKeyBinding("move-to-corner-se",
      Lang.bind(this, function(){ this._moveFocused("se");})
    );
    this._addKeyBinding("move-to-corner-sw",
      Lang.bind(this, function(){ this._moveFocused("sw");})
    );
    this._addKeyBinding("move-to-corner-nw",
      Lang.bind(this, function(){ this._moveFocused("nw");})
    );

    // move to center. fix 2 screen setup and resize to 50% 50%
    this._addKeyBinding("move-to-center",
      Lang.bind(this, function(){ this._moveFocused("c");})
    );

    this._addKeyBinding("move-to-workspace-1",
      Lang.bind(this, function(){ this._moveToConfiguredLocation();})
    );
  }