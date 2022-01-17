function() {
        this.parent({ shellReactive: true, styleClass: 'login-dialog' });
        this.connect('destroy',
                     Lang.bind(this, this._onDestroy));
        this.connect('opened',
                     Lang.bind(this, this._onOpened));

        this._userManager = AccountsService.UserManager.get_default()
        this._greeterClient = new Gdm.Client();

        this._greeter = this._greeterClient.get_greeter_sync(null);

        this._greeter.connect('default-session-name-changed',
                              Lang.bind(this, this._onDefaultSessionChanged));

        this._greeter.connect('session-opened',
                              Lang.bind(this, this._onSessionOpened));
        this._greeter.connect('timed-login-requested',
                              Lang.bind(this, this._onTimedLoginRequested));

        this._settings = new Gio.Settings({ schema: _LOGIN_SCREEN_SCHEMA });

        this._fprintManager = new Fprint.FprintManager();
        this._checkForFingerprintReader();
        this._settings.connect('changed::' + _LOGO_KEY,
                               Lang.bind(this, this._updateLogo));
        this._settings.connect('changed::' + _BANNER_MESSAGE_KEY,
                               Lang.bind(this, this._updateBanner));
        this._settings.connect('changed::' + _BANNER_MESSAGE_TEXT_KEY,
                               Lang.bind(this, this._updateBanner));

        this._logoBox = new St.Bin({ style_class: 'login-dialog-logo-box' });
        this.contentLayout.add(this._logoBox);
        this._updateLogo();

        this._bannerLabel = new St.Label({ style_class: 'login-dialog-banner',
                                           text: '' });
        this.contentLayout.add(this._bannerLabel);
        this._updateBanner();

        this._titleLabel = new St.Label({ style_class: 'login-dialog-title',
                                          text: C_("title", "Sign In") });

        this.contentLayout.add(this._titleLabel,
                              { y_fill: false,
                                y_align: St.Align.START });

        let mainContentBox = new St.BoxLayout({ vertical: false });
        this.contentLayout.add(mainContentBox,
                               { expand: true,
                                 x_fill: true,
                                 y_fill: false });

        this._userList = new UserList();
        mainContentBox.add(this._userList.actor,
                           { expand: true,
                             x_fill: true,
                             y_fill: true });

        this.setInitialKeyFocus(this._userList.actor);

        this._promptBox = new St.BoxLayout({ style_class: 'login-dialog-prompt-layout',
                                             vertical: true });
        mainContentBox.add(this._promptBox,
                           { expand: true,
                             x_fill: true,
                             y_fill: true,
                             x_align: St.Align.START });
        this._promptLabel = new St.Label({ style_class: 'login-dialog-prompt-label' });

        this._mainContentBox = mainContentBox;

        this._promptBox.add(this._promptLabel,
                            { expand: true,
                              x_fill: true,
                              y_fill: true,
                              x_align: St.Align.START });
        this._promptEntry = new St.Entry({ style_class: 'login-dialog-prompt-entry',
                                           can_focus: true });
        this._promptBox.add(this._promptEntry,
                            { expand: true,
                              x_fill: true,
                              y_fill: false,
                              x_align: St.Align.START });
        // Translators: this message is shown below the password entry field
        // to indicate the user can swipe their finger instead
        this._promptFingerprintMessage = new St.Label({ text: _("(or swipe finger)"),
                                                        style_class: 'login-dialog-prompt-fingerprint-message' });
        this._promptFingerprintMessage.hide();
        this._promptBox.add(this._promptFingerprintMessage);

        this._sessionList = new SessionList();
        this._sessionList.connect('session-activated',
                                  Lang.bind(this, function(list, sessionId) {
                                                this._greeter.call_select_session_sync (sessionId, null);
                                            }));

        this._promptBox.add(this._sessionList.actor,
                            { expand: true,
                              x_fill: false,
                              y_fill: true,
                              x_align: St.Align.START });
        this._promptBox.hide();

        // translators: this message is shown below the user list on the
        // login screen. It can be activated to reveal an entry for
        // manually entering the username.
        let notListedLabel = new St.Label({ text: _("Not listed?"),
                                            style_class: 'login-dialog-not-listed-label' });
        this._notListedButton = new St.Button({ style_class: 'login-dialog-not-listed-button',
                                                can_focus: true,
                                                child: notListedLabel,
                                                reactive: true,
                                                x_align: St.Align.START,
                                                x_fill: true });

        this._notListedButton.connect('clicked', Lang.bind(this, this._onNotListedClicked));

        this.contentLayout.add(this._notListedButton,
                               { expand: false,
                                 x_align: St.Align.START,
                                 x_fill: true });

        if (!this._userManager.is_loaded)
            this._userManagerLoadedId = this._userManager.connect('notify::is-loaded',
                                                                  Lang.bind(this, function() {
                                                                      if (this._userManager.is_loaded) {
                                                                          this._loadUserList();
                                                                          this._userManager.disconnect(this._userManagerLoadedId);
                                                                          this._userManagerLoadedId = 0;
                                                                      }
                                                                  }));
        else
            this._loadUserList();

        this._userList.connect('activate',
                               Lang.bind(this, function(userList, item) {
                                   this._onUserListActivated(item);
                               }));

   }