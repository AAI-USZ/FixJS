function(dir, type) {
        let fileEnum;
        let file, info;
        try {
            fileEnum = dir.enumerate_children('standard::*', Gio.FileQueryInfoFlags.NONE, null);
        } catch(e) {
            logError(e, 'Could not enumerate extensions directory');
            return;
        }

        while ((info = fileEnum.next_file(null)) != null) {
            let fileType = info.get_file_type();
            if (fileType != Gio.FileType.DIRECTORY)
                continue;
            let uuid = info.get_name();
            let extensionDir = dir.get_child(uuid);

            let existing = extensions[uuid];
            if (existing) {
                log('Extension %s already installed in %s. %s will not be loaded'.format(uuid, existing.path, extensionDir.get_path()));
                continue;
            }

            let extension;
            try {
                extension = createExtensionObject(uuid, extensionDir, type);
            } catch(e) {
                logError(e, 'Could not load extension %s'.format(uuid));
                continue;
            }
            this.emit('extension-found', extension);
        }
        fileEnum.close(null);
    }