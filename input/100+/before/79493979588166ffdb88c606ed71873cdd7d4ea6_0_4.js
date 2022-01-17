function gotExtensionZipFile(session, message, uuid) {
    if (message.status_code != Soup.KnownStatusCode.OK) {
        ExtensionSystem.logExtensionError(uuid, 'downloading extension: ' + message.status_code);
        return;
    }

    let dir = Gio.File.new_for_path(GLib.build_filenamev([global.userdatadir, 'extensions', uuid]));
    try {
        if (!dir.query_exists(null))
            dir.make_directory_with_parents(null);
    } catch (e) {
        ExtensionSystem.logExtensionError(uuid, 'Could not create extension directory');
        return;
    }

    let [file, stream] = Gio.File.new_tmp('XXXXXX.shell-extension.zip');
    let contents = message.response_body.flatten().as_bytes();
    stream.output_stream.write_bytes(contents, null);
    stream.close(null);
    let [success, pid] = GLib.spawn_async(null,
                                          ['unzip', '-uod', dir.get_path(), '--', file.get_path()],
                                          null,
                                          GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD,
                                          null);

    if (!success) {
        ExtensionSystem.logExtensionError(uuid, 'extract: could not extract');
        return;
    }

    GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, function(pid, status) {
        GLib.spawn_close_pid(pid);

        if (status != 0) {
            ExtensionSystem.logExtensionError(uuid, 'extract: could not extract');
            invocation.return_dbus_error('org.gnome.Shell.ExtractExtensionError', '');
            return;
        }

        // Add extension to 'enabled-extensions' for the user, always...
        let enabledExtensions = global.settings.get_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY);
        if (enabledExtensions.indexOf(uuid) == -1) {
            enabledExtensions.push(uuid);
            global.settings.set_strv(ExtensionSystem.ENABLED_EXTENSIONS_KEY, enabledExtensions);
        }

        let extension = ExtensionUtils.createExtensionObject(uuid, dir, ExtensionUtils.ExtensionType.PER_USER);
        ExtensionSystem.loadExtension(extension);
    });
}