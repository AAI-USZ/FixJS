function(source, strings, reaskPassword) {
        this.parent(source, strings[0], null, { customContent: true });

        // set the notification to transient and urgent, so that it
        // expands out
        this.setTransient(true);
        this.setUrgency(MessageTray.Urgency.CRITICAL);

        if (strings[1])
            this.addBody(strings[1]);

        if (reaskPassword) {
            let label = new St.Label({ style_class: 'mount-password-reask',
                                       text: _("Wrong password, please try again") });

            this.addActor(label);
        }

        this._responseEntry = new St.Entry({ style_class: 'mount-password-entry',
                                             can_focus: true });
        this.setActionArea(this._responseEntry);

        this._responseEntry.clutter_text.connect('activate',
                                                 Lang.bind(this, this._onEntryActivated));
        this._responseEntry.clutter_text.set_password_char('\u25cf'); // ● U+25CF BLACK CIRCLE

        this._responseEntry.grab_key_focus();
    }