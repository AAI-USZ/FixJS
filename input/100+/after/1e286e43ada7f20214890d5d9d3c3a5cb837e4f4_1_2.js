function(button, event) {
        let params = { shell_version: Config.PACKAGE_VERSION };

        let url = REPOSITORY_URL_DOWNLOAD.format(this._uuid);
        let message = Soup.form_request_new_from_hash('GET', url, params);

        let uuid = this._uuid;
        let dir = Gio.File.new_for_path(GLib.build_filenamev([global.userdatadir, 'extensions', uuid]));
        let invocation = this._invocation;
        function errback(code, message) {
            invocation.return_dbus_error('org.gnome.Shell.' + code, message ? message.toString() : '');
        }

        function callback() {
            // Add extension to 'enabled-extensions' for the user, always...
            let enabledExtensions = global.settings.get_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY);
            if (enabledExtensions.indexOf(uuid) == -1) {
                enabledExtensions.push(uuid);
                global.settings.set_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY, enabledExtensions);
            }

            let extension = ExtensionUtils.createExtensionObject(uuid, dir, ExtensionUtils.ExtensionType.PER_USER);

            try {
                ExtensionSystem.loadExtension(extension);
            } catch(e) {
                uninstallExtension(uuid);
                errback('LoadExtensionError', e);
                return;
            }

            invocation.return_value(GLib.Variant.new('(s)', 'successful'));
        }

        _httpSession.queue_message(message, Lang.bind(this, function(session, message) {
            gotExtensionZipFile(session, message, uuid, dir, callback, errback);
        }));

        this.close(global.get_current_time());
    }