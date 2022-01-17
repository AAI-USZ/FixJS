function(pid, status) {
        GLib.spawn_close_pid(pid);

        if (status != 0) {
            errback('ExtractExtensionError');
            return;
        }

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

        callback();
    }