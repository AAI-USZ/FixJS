function() {
        this.actor = new St.Widget({ reactive: true,
                                     x: 0,
                                     y: 0,
                                     width: global.screen_width,
                                     height: global.screen_height,
                                     style_class: 'workspace-switcher-group' });
        Main.uiGroup.add_actor(this.actor);

        this._container = new St.BoxLayout({ style_class: 'workspace-switcher-container' });
        this._list = new Shell.GenericContainer({ style_class: 'workspace-switcher' });
        this._itemSpacing = 0;
        this._childHeight = 0;
        this._childWidth = 0;
        this._list.connect('style-changed', Lang.bind(this, function() {
                                                        this._itemSpacing = this._list.get_theme_node().get_length('spacing');
                                                     }));

        this._list.connect('get-preferred-width', Lang.bind(this, this._getPreferredWidth));
        this._list.connect('get-preferred-height', Lang.bind(this, this._getPreferredHeight));
        this._list.connect('allocate', Lang.bind(this, this._allocate));
        this._container.add(this._list);

        this.actor.add_actor(this._container);

        this._redraw();

        this._position();

        this.actor.hide();

        this._timeoutId = Mainloop.timeout_add(DISPLAY_TIMEOUT, Lang.bind(this, this._onTimeout));
    }