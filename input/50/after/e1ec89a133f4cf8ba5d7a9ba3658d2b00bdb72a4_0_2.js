function(uuid) {
        try {
            disableExtension(uuid);
        } catch(e) {
            logExtensionError(uuid, e);
        }
    }