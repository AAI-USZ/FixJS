function(button, event) {
        let params = { shell_version: Config.PACKAGE_VERSION };

        let url = REPOSITORY_URL_DOWNLOAD.format(this._uuid);
        let message = Soup.form_request_new_from_hash('GET', url, params);

        let invocation = this._invocation;
        function errback(code, message) {
            invocation.return_dbus_error('org.gnome.Shell.' + code, message ? message.toString() : '');
        }

        function callback() {
            invocation.return_value(GLib.Variant.new('(s)', 'successful'));
        }

        _httpSession.queue_message(message, Lang.bind(this, function(session, message) {
            gotExtensionZipFile(session, message, this._uuid, callback, errback);
        }));

        this.close(global.get_current_time());
    }