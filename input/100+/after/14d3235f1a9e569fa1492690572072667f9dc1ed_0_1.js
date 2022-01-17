function() {
        this.parent(0.0, _("Keyboard"));

        this._container = new Shell.GenericContainer();
        this._container.connect('get-preferred-width', Lang.bind(this, this._containerGetPreferredWidth));
        this._container.connect('get-preferred-height', Lang.bind(this, this._containerGetPreferredHeight));
        this._container.connect('allocate', Lang.bind(this, this._containerAllocate));
        this.actor.add_actor(this._container);
        this.actor.add_style_class_name('panel-status-button');

        this._labelActors = {};
        this._layoutItems = {};

        this._settings = new Gio.Settings({ schema: DESKTOP_INPUT_SOURCES_SCHEMA });
        this._settings.connect('changed::' + KEY_CURRENT_INPUT_SOURCE, Lang.bind(this, this._currentInputSourceChanged));
        this._settings.connect('changed::' + KEY_INPUT_SOURCES, Lang.bind(this, this._inputSourcesChanged));

        this._currentSourceIndex = this._settings.get_uint(KEY_CURRENT_INPUT_SOURCE);
        this._xkbInfo = new GnomeDesktop.XkbInfo();

        this._ibusManager = new IBusManager(Lang.bind(this, this._inputSourcesChanged));

        this._inputSourcesChanged();

        // re-using "allowSettings" for the keyboard layout is a bit shady,
        // but at least for now it is used as "allow popping up windows
        // from shell menus"; we can always add a separate sessionMode
        // option if need arises.
        if (Main.sessionMode.allowSettings) {
            this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
            this.menu.addAction(_("Show Keyboard Layout"), Lang.bind(this, this._showLayout));
        }
        this.menu.addSettingsAction(_("Region and Language Settings"), 'gnome-region-panel.desktop');
    }