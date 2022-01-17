function() {
        let item;

        item = new IMStatusChooserItem();
        if (Main.sessionMode.allowSettings)
            item.connect('activate', Lang.bind(this, this._onMyAccountActivate));
        this.menu.addMenuItem(item);
        this._statusChooser = item;

        item = new PopupMenu.PopupSwitchMenuItem(_("Notifications"));
        item.connect('toggled', Lang.bind(this, this._updatePresenceStatus));
        this.menu.addMenuItem(item);
        this._notificationsSwitch = item;

        item = new PopupMenu.PopupSeparatorMenuItem();
        this.menu.addMenuItem(item);

        if (Main.sessionMode.allowSettings) {
            item = new PopupMenu.PopupMenuItem(_("System Settings"));
            item.connect('activate', Lang.bind(this, this._onPreferencesActivate));
            this.menu.addMenuItem(item);
        }

        item = new PopupMenu.PopupAlternatingMenuItem(_("Power Off"),
                                                      _("Suspend"));
        this.menu.addMenuItem(item);
        item.connect('activate', Lang.bind(this, this._onSuspendOrPowerOffActivate));
        this._suspendOrPowerOffItem = item;
        this._updateSuspendOrPowerOff();

        item = new PopupMenu.PopupSeparatorMenuItem();
        this.menu.addMenuItem(item);

        item = new PopupMenu.PopupMenuItem(_("Switch User"));
        item.connect('activate', Lang.bind(this, this._onLoginScreenActivate));
        this.menu.addMenuItem(item);
        this._loginScreenItem = item;

        item = new PopupMenu.PopupMenuItem(_("Log Out"));
        item.connect('activate', Lang.bind(this, this._onQuitSessionActivate));
        this.menu.addMenuItem(item);
        this._logoutItem = item;

        item = new PopupMenu.PopupSeparatorMenuItem();
        this.menu.addMenuItem(item);

        item = new PopupMenu.PopupMenuItem(_("Lock"));
        item.connect('activate', Lang.bind(this, this._onLockScreenActivate));
        this.menu.addMenuItem(item);
        this._lockScreenItem = item;
    }