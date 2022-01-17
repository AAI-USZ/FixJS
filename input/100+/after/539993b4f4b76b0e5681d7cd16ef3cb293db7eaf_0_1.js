function(pid, status) {
        GLib.spawn_close_pid(pid);

        if (status != 0)
            errback('ExtractExtensionError');
        else
            callback();
    }