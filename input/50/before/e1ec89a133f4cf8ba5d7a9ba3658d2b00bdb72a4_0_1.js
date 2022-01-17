function(uuid) {
        try {
            enableExtension(uuid);
        } catch(e) {
            logExtensionError(extension.uuid, e);
        }
    }