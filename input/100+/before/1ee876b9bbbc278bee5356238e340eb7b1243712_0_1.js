function () {
        /* Stuff for window options */
        this._buttonInfo = [ 'ALWAYS_ON_TOP', 'ALWAYS_ON_VISIBLE_WORKSPACE',
            'MOVE', 'RESIZE', 'MINIMIZE', 'MAXIMIZE', 'CLOSE_WINDOW' ];
        if (!Wnck) {
            for (let i = 0; i < WnckOptions.length; ++i) {
                let j = this._buttonInfo.indexOf(WnckOptions[i]);
                if (j >= 0) {
                    this._buttonInfo.splice(j, 1);
                }
            }
            this.wnckWindow = null;
        } else {
        /* try to get this.metaWindow as Wnck window. Compare
         * by window name and app and size/position.
         * If you have two windows with the same title (like two terminals at
         * home directory) exactly on top of each other, then too bad for you.
         */
            Wnck.Screen.get_default().force_update(); // make sure window list is up to date
            let windows = Wnck.Screen.get_default().get_windows();
            log('windows.length: ' + windows.length);
            for (let i = 0; i < windows.length; ++i) {
                if (windows[i].get_name() === this.metaWindow.title &&
                        // cannot compare app name as Wnck "uses suboptimal heuristics":
                        // e.g. Chromium (wnck) vs Chromium Web Browser (this.app)
                        //windows[i].get_application().get_name() === this.app.get_name() &&
                        windows[i].get_pid() === this.metaWindow.get_pid()) {
                    let rect = this.metaWindow.get_outer_rect();
                    // if window is undecorated we must compare client_window_geometry.
                    let [x, y, width, height] = (this.metaWindow.decorated ? 
                            windows[i].get_geometry() :
                            windows[i].get_client_window_geometry());
                    if (rect.x === x && rect.y === y && rect.width === width &&
                            rect.height === height) {
                        this.wnckWindow = windows[i];        
                        break;
                    }
                }
            }
            if (!this.wnckWindow) {
                log("couldn't find the wnck window corresponding to this.metaWindow");
                for (let i = 0; i < WnckOptions.length; ++i) {
                    let j = this._buttonInfo.indexOf(WnckOptions[i]);
                    if (j >= 0) {
                        this._buttonInfo.splice(j, 1);
                    }
                }
            }
        }

        /* Add buttons */
        this.windowOptions = new St.BoxLayout({reactive: true, vertical: false});
        this._windowOptionItems = {};
        this._windowOptionIDs = [];
        for (let i = 0; i < this._buttonInfo.length; ++i) {
            let op = this._buttonInfo[i],
                buttonInfo = WindowOptions[op],
                button = new St.Button({
                    name: op,
                    style_class: 'window-options-button',
                    label: buttonInfo.symbol,
                    reactive: true // <-- necessary?
                });
            button.set_track_hover(true);
            button._hoverLabels = [buttonInfo.label];
            button._parent = this;
            button._toggled = false;
            if (buttonInfo.isToggled) {
                button._hoverLabels.push(WindowOptions[buttonInfo.toggleOff].label);
            }
            button.connect('enter-event', Lang.bind(button, function () {
                this.add_style_pseudo_class('hover');
                this._parent.titleActor.text = this._hoverLabels[+this._toggled];
            }));
            button.connect('leave-event', Lang.bind(button, function () {
                this.remove_style_pseudo_class('hover');
                this._parent.titleActor.text = this._parent.metaWindow.get_title();
            }));
            this._windowOptionIDs.push(
                button.connect('clicked',
                    Lang.bind(this, this._onActivateWindowOption, op)));
            this.windowOptions.add(button);
            this._windowOptionItems[op] = button;
        }
        this._updateWindowOptions();

        this.actor.add(this.windowOptions, {expand: false, x_fill: false, 
            x_align: St.Align.MIDDLE});
    }