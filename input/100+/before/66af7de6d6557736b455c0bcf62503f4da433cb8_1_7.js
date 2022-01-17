function(message, gicon, reaskPassword) {
        let strings = message.split('\n');
        this.parent({ styleClass: 'prompt-dialog' });

        let mainContentBox = new St.BoxLayout({ style_class: 'prompt-dialog-main-layout',
                                                vertical: false });
        this.contentLayout.add(mainContentBox);

        let icon = _createIcon(gicon);
        mainContentBox.add(icon,
                           { x_fill:  true,
                             y_fill:  false,
                             x_align: St.Align.END,
                             y_align: St.Align.START });

        this._messageBox = new St.BoxLayout({ style_class: 'prompt-dialog-message-layout',
                                              vertical: true });
        mainContentBox.add(this._messageBox,
                           { y_align: St.Align.START, expand: true, x_fill: true, y_fill: true });

        let subject = new St.Label({ style_class: 'prompt-dialog-headline' });
        this._messageBox.add(subject,
                             { y_fill:  false,
                               y_align: St.Align.START });
        if (strings[0])
            subject.set_text(strings[0]);

        let description = new St.Label({ style_class: 'prompt-dialog-description' });
        description.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
        description.clutter_text.line_wrap = true;
        this._messageBox.add(description,
                            { y_fill:  true,
                              y_align: St.Align.START });
        if (strings[1])
            description.set_text(strings[1]);

        this._passwordBox = new St.BoxLayout({ vertical: false });
        this._messageBox.add(this._passwordBox);

        this._passwordLabel = new St.Label(({ style_class: 'prompt-dialog-password-label',
                                              text: _("Passphrase") }));
        this._passwordBox.add(this._passwordLabel);

        this._passwordEntry = new St.Entry({ style_class: 'prompt-dialog-password-entry',
                                             text: "",
                                             can_focus: true});
        ShellEntry.addContextMenu(this._passwordEntry, { isPassword: true });
        this._passwordEntry.clutter_text.connect('activate', Lang.bind(this, this._onEntryActivate));
        this._passwordEntry.clutter_text.set_password_char('\u25cf'); // ● U+25CF BLACK CIRCLE
        this._passwordBox.add(this._passwordEntry, {expand: true });
        this.setInitialKeyFocus(this._passwordEntry);

        if (reaskPassword) {
            this._errorMessageLabel = new St.Label({ style_class: 'prompt-dialog-error-label',
                                                     text: _("Sorry, that didn\'t work. Please try again.") });
            this._errorMessageLabel.clutter_text.ellipsize = Pango.EllipsizeMode.NONE;
            this._errorMessageLabel.clutter_text.line_wrap = true;
            this._messageBox.add(this._errorMessageLabel);
        }

        this._rememberChoice = new CheckBox.CheckBox();
        this._rememberChoice.getLabelActor().text = _("Remember Passphrase");
        this._rememberChoice.actor.checked = true;
        this._messageBox.add(this._rememberChoice.actor);

        let buttons = [{ label: _("Cancel"),
                         action: Lang.bind(this, this._onCancelButton),
                         key:    Clutter.Escape
                       },
                       { label: _("Unlock"),
                         action: Lang.bind(this, this._onUnlockButton)
                       }];

        this.setButtons(buttons);
    }