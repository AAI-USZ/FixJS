function() {
        this._haveFingerprintReader = false;

        if (!this._settings.get_boolean(_FINGERPRINT_AUTHENTICATION_KEY))
            return;

        this._fprintManager.GetDefaultDeviceRemote(Gio.DBusCallFlags.NONE, Lang.bind(this,
            function(device, error) {
                if (!error && device)
                    this._haveFingerprintReader = true;

                if (this._haveFingerprintReader)
                    this._greeterClient.call_start_conversation(_FINGERPRINT_SERVICE_NAME);
            }));
    }