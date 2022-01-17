function(pid, status) {
        GLib.spawn_close_pid(pid);

        // Add extension to 'enabled-extensions' for the user, always...
        let enabledExtensions = global.settings.get_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY);
        if (enabledExtensions.indexOf(uuid) == -1) {
            enabledExtensions.push(uuid);
            global.settings.set_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY, enabledExtensions);
        }

        let extension = ExtensionUtils.createExtensionObject(uuid, dir, ExtensionUtils.ExtensionType.PER_USER);
        ExtensionSystem.loadExtension(extension);
    }