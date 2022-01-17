function(uuid) {
        try {
            disableExtension(uuid);
        } catch(e) {
            logExtensionError(extension.uuid, e);
        }
    }