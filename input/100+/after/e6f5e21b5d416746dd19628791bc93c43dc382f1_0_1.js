function() {
        this.parent('preferences-desktop-accessibility', _("Accessibility"));

        let highContrast = this._buildHCItem();
        this.menu.addMenuItem(highContrast);

        let magnifier = this._buildItem(_("Zoom"), APPLICATIONS_SCHEMA,
                                                   'screen-magnifier-enabled');
        this.menu.addMenuItem(magnifier);

        let textZoom = this._buildFontItem();
        this.menu.addMenuItem(textZoom);

        let screenReader = this._buildItem(_("Screen Reader"), APPLICATIONS_SCHEMA,
                                                               'screen-reader-enabled');
        this.menu.addMenuItem(screenReader);

        let screenKeyboard = this._buildItem(_("Screen Keyboard"), APPLICATIONS_SCHEMA,
                                                                   'screen-keyboard-enabled');
        this.menu.addMenuItem(screenKeyboard);

        let visualBell = this._buildItem(_("Visual Alerts"), WM_SCHEMA, KEY_VISUAL_BELL);
        this.menu.addMenuItem(visualBell);

        let stickyKeys = this._buildItem(_("Sticky Keys"), A11Y_SCHEMA, KEY_STICKY_KEYS_ENABLED);
        this.menu.addMenuItem(stickyKeys);

        let slowKeys = this._buildItem(_("Slow Keys"), A11Y_SCHEMA, KEY_SLOW_KEYS_ENABLED);
        this.menu.addMenuItem(slowKeys);

        let bounceKeys = this._buildItem(_("Bounce Keys"), A11Y_SCHEMA, KEY_BOUNCE_KEYS_ENABLED);
        this.menu.addMenuItem(bounceKeys);

        let mouseKeys = this._buildItem(_("Mouse Keys"), A11Y_SCHEMA, KEY_MOUSE_KEYS_ENABLED);
        this.menu.addMenuItem(mouseKeys);

        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());
        this.menu.addSettingsAction(_("Universal Access Settings"), 'gnome-universal-access-panel.desktop');
    }