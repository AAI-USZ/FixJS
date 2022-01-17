function(session, request, echo_on) {
        // Cheap localization trick
        if (request == 'Password:')
            this._passwordLabel.set_text(_("Password:"));
        else
            this._passwordLabel.set_text(request);

        if (echo_on)
            this._passwordEntry.clutter_text.set_password_char('');
        else
            this._passwordEntry.clutter_text.set_password_char('\u25cf'); // ● U+25CF BLACK CIRCLE

        this._passwordBox.show();
        this._passwordEntry.set_text('');
        this._passwordEntry.grab_key_focus();
        this._ensureOpen();
    }