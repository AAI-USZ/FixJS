function(realWindow) {
        this.actor = new Clutter.Clone({ source: realWindow.get_texture(),
                                         reactive: true });
        this.actor._delegate = this;
        this.realWindow = realWindow;
        this.metaWindow = realWindow.meta_window;

        this._positionChangedId = this.realWindow.connect('position-changed',
                                                          Lang.bind(this, this._onPositionChanged));
        this._realWindowDestroyedId = this.realWindow.connect('destroy',
                                                              Lang.bind(this, this._disconnectRealWindowSignals));
        this._onPositionChanged();

        this.actor.connect('button-release-event',
                           Lang.bind(this, this._onButtonRelease));

        this.actor.connect('destroy', Lang.bind(this, this._onDestroy));

        this._draggable = DND.makeDraggable(this.actor,
                                            { restoreOnSuccess: true,
                                              dragActorMaxSize: Workspace.WINDOW_DND_SIZE,
                                              dragActorOpacity: Workspace.DRAGGING_WINDOW_OPACITY });
        this._draggable.connect('drag-begin', Lang.bind(this, this._onDragBegin));
        this._draggable.connect('drag-end', Lang.bind(this, this._onDragEnd));
        this.inDrag = false;

        // Create an icon for this window. Even though the window
        // may be showing now, it might be minimized later on.
        this.icon = null;
        let app = this.metaWindow._expoApp; // will be non-null if the window comes from another ws
        if (!app) {
            let tracker = Cinnamon.WindowTracker.get_default();
            app = tracker.get_window_app(this.metaWindow);
            // Cache the app, as the tracker has difficulty in finding the app for windows
            // that come from recently removed workspaces.
            this.metaWindow._expoApp = app;
        }
        if (app) {
            this.icon = app.create_icon_texture(ICON_SIZE);
        }
        if (!this.icon) {
            this.icon = new St.Icon({ icon_name: 'applications-other',
                                 icon_type: St.IconType.FULLCOLOR,
                                 icon_size: ICON_SIZE });
        }
        this.icon.set_opacity(ICON_OPACITY);
        this.icon.width = ICON_SIZE;
        this.icon.height = ICON_SIZE;

        this._doomed = false;
    }