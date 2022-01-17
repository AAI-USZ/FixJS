function gotExtensionZipFile(session, message, uuid, callback, errback) {
    if (message.status_code != Soup.KnownStatusCode.OK) {
        errback('DownloadExtensionError', message.status_code);
        return;
    }

    let dir = Gio.File.new_for_path(GLib.build_filenamev([global.userdatadir, 'extensions', uuid]));
    try {
        if (!dir.query_exists(null))
            dir.make_directory_with_parents(null);
    } catch (e) {
        errback('CreateExtensionDirectoryError', e);
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
        errback('ExtractExtensionError');
        return;
    }

    GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, function(pid, status) {
        GLib.spawn_close_pid(pid);

        if (status != 0)
            errback('ExtractExtensionError');
        else
            callback();
    });
}