function() {

        this._signalHandler = new Convenience.globalSignalHandler();

        // Timeout id used to ensure the dash is hiddeen after some menu is shown
        this._dashShowTimeout = 0;

        // authohide on hover effect on/off
        this._autohide = true;
        // initialize animation status object
        this._animStatus = new animationStatus(true);

        // Hide usual Dash
        Main.overview._dash.actor.hide();

        // Create a new dash object
        this.dash = new Dash.Dash(); // this.dash = new MyDash.myDash();

        // Create the main container, turn on track hover, add hoverChange signal
        this.actor = new St.BoxLayout({ name: 'mydash', reactive: true, style_class: 'box'});
        this.actor.connect("notify::hover", Lang.bind(this, this._hoverChanged));

        // I create another actor with name #dash. This serves for applying an opaque background 
        // for those themes like the default one that has a semi-transparent dash.
        // I inherit all dash style of the current theme, then disable all those non interesting.
        // I'm interested only on the shape, thus only on the border radius I think, in order
        // to cover all and only the dash area. It is probably a little ugly workaround, but I 
        // have not found a way to access the current style and simply change the background alpha.
        this._backgroundBox = new St.Bin({ name: 'dash', reactive: false, y_align: St.Align.START});
        this._backgroundBox.set_style('background-color: rgba(1,1,1,'+BACKGROUND_OPACITY+');padding:0;margin:0;border:0;');

        this.actor.set_track_hover(true);
        // Create and apply height constraint to the dash
        this.constrainHeight = new Clutter.BindConstraint({ source: Main.overview._viewSelector._pageArea,
                                                            coordinate: Clutter.BindCoordinate.HEIGHT });
        this.dash.actor.add_constraint(this.constrainHeight);

        this.constrainSize = new Clutter.BindConstraint({ source: this.dash._box,
                                                            coordinate: Clutter.BindCoordinate.SIZE });
        this._backgroundBox.add_constraint(this.constrainSize);

        // Put dock on the primary monitor
        this._monitor = Main.layoutManager.primaryMonitor;

        // this store size and the position where the dash is shown;
        // used by intellihide module to check window overlap.
        this.staticBox = new Clutter.ActorBox({x1:0, y1:0, x2:100, y2:500});

        // Connect global signals
        this._signalHandler.push(
            // Connect events for updating dash vertical position
            [
                Main.overview._viewSelector._pageArea,
                'notify::y',
                Lang.bind(this, this._updateYPosition)
            ],
            [
                Main.overview._viewSelector,
                'notify::y',
                Lang.bind(this, this._updateYPosition)
            ],
            // Allow app icons do be dragged out of the chrome actors when reordering or deleting theme while not on overview mode
            // by changing global stage input mode
            [
                Main.overview,
                'item-drag-begin',
                Lang.bind(this, this._onDragStart)
            ],
            [
                Main.overview,
                'item-drag-end',
                Lang.bind(this, this._onDragEnd)
            ],
            [
                Main.overview,
                'item-drag-cancelled',
                Lang.bind(this, this._onDragEnd)
            ],
            // update wne monitor changes, for instance in multimonitor when monitor are attached
            [
                global.screen,
                'monitors-changed',
                Lang.bind(this, this._resetPosition )
            ],
            // keep the dock above Main.wm._workspaceSwitcherPopup.actor
            [
                global.window_manager,
                'switch-workspace',
                Lang.bind(this, this._onSwitchWorkspace)
            ]
        );

        //Hide the dock whilst setting positions
        //this.actor.hide(); but I need to access its width, so I use opacity
        this.actor.set_opacity(0);

        //Add dash and backgroundBox to the container actor and the last to the Chrome.
        this.actor.add_actor(this._backgroundBox);
        this.actor.add_actor(this.dash.actor);
        Main.layoutManager.addChrome(this.actor, { affectsStruts: 0 });

        // and update position and clip when width changes, that is when icons size and thus dash size changes.
        this.dash.actor.connect('notify::width', Lang.bind(this, this._redisplay));

        // Load optional features
        this._optionalScrollWorkspaceSwitch();

        Mainloop.idle_add(Lang.bind(this, this._initialize));

    }