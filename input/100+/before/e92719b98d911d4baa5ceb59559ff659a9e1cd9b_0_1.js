function() {
        this.parent(0.0);

        this.actor.accessible_role = Atk.Role.MENU;

        let box = new St.BoxLayout({ name: 'panelUserMenu' });
        this.actor.add_actor(box);

        this._lockdownSettings = new Gio.Settings({ schema: LOCKDOWN_SCHEMA });

        this._userManager = AccountsService.UserManager.get_default();

        this._user = this._userManager.get_user(GLib.get_user_name());
        this._presence = new GnomeSession.Presence();
        this._session = new GnomeSession.SessionManager();
        this._haveShutdown = true;

        this._accountMgr = Tp.AccountManager.dup();

        this._upClient = new UPowerGlib.Client();
        this._screenSaverProxy = new ScreenSaver.ScreenSaverProxy();
        this.actor.connect('destroy', Lang.bind(this, this._onDestroy));

        this._iconBox = new St.Bin();
        box.add(this._iconBox, { y_align: St.Align.MIDDLE, y_fill: false });

        let textureCache = St.TextureCache.get_default();
        this._offlineIcon = new St.Icon({ icon_name: 'user-offline',
                                          style_class: 'popup-menu-icon' });
        this._availableIcon = new St.Icon({ icon_name: 'user-available',
                                            style_class: 'popup-menu-icon' });
        this._busyIcon = new St.Icon({ icon_name: 'user-busy',
                                       style_class: 'popup-menu-icon' });
        this._invisibleIcon = new St.Icon({ icon_name: 'user-invisible',
                                            style_class: 'popup-menu-icon' });
        this._awayIcon = new St.Icon({ icon_name: 'user-away',
                                       style_class: 'popup-menu-icon' });
        this._idleIcon = new St.Icon({ icon_name: 'user-idle',
                                       style_class: 'popup-menu-icon' });
        this._pendingIcon = new St.Icon({ icon_name: 'user-status-pending',
                                          style_class: 'popup-menu-icon' });

        this._accountMgr.connect('most-available-presence-changed',
                                  Lang.bind(this, this._updatePresenceIcon));
        this._accountMgr.connect('account-enabled',
                                  Lang.bind(this, this._onAccountEnabled));
        this._accountMgr.connect('account-disabled',
                                 Lang.bind(this, this._onAccountDisabled));
        this._accountMgr.connect('account-removed',
                                  Lang.bind(this, this._onAccountDisabled));
        this._accountMgr.prepare_async(null, Lang.bind(this,
            function(mgr) {
                let [presence, s, msg] = mgr.get_most_available_presence();
                this._updatePresenceIcon(mgr, presence, s, msg);
                this._setupAccounts();
            }));

        this._name = new St.Label();
        this.actor.label_actor = this._name;
        box.add(this._name, { y_align: St.Align.MIDDLE, y_fill: false });
        this._userLoadedId = this._user.connect('notify::is-loaded', Lang.bind(this, this._updateUserName));
        this._userChangedId = this._user.connect('changed', Lang.bind(this, this._updateUserName));
        this._updateUserName();

        this._createSubMenu();

        this._updateSwitch(this._presence.status);
        this._presence.connectSignal('StatusChanged', Lang.bind(this, function (proxy, senderName, [status]) {
            this._updateSwitch(status);
        }));

        this._userManager.connect('notify::is-loaded',
                                  Lang.bind(this, this._updateMultiUser));
        this._userManager.connect('notify::has-multiple-users',
                                  Lang.bind(this, this._updateMultiUser));
        this._userManager.connect('user-added',
                                  Lang.bind(this, this._updateMultiUser));
        this._userManager.connect('user-removed',
                                  Lang.bind(this, this._updateMultiUser));
        this._lockdownSettings.connect('changed::' + DISABLE_USER_SWITCH_KEY,
                                       Lang.bind(this, this._updateSwitchUser));
        this._lockdownSettings.connect('changed::' + DISABLE_LOG_OUT_KEY,
                                       Lang.bind(this, this._updateLogout));

        this._lockdownSettings.connect('changed::' + DISABLE_LOCK_SCREEN_KEY,
                                       Lang.bind(this, this._updateLockScreen));
        this._updateSwitchUser();
        this._updateLogout();
        this._updateLockScreen();

        // Whether shutdown is available or not depends on both lockdown
        // settings (disable-log-out) and Polkit policy - the latter doesn't
        // notify, so we update the menu item each time the menu opens or
        // the lockdown setting changes, which should be close enough.
        this.menu.connect('open-state-changed', Lang.bind(this,
            function(menu, open) {
                if (open)
                    this._updateHaveShutdown();
            }));
        this._lockdownSettings.connect('changed::' + DISABLE_LOG_OUT_KEY,
                                       Lang.bind(this, this._updateHaveShutdown));

        this._upClient.connect('notify::can-suspend', Lang.bind(this, this._updateSuspendOrPowerOff));
    }