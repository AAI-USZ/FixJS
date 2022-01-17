function(uuid) {
        try {
            enableExtension(uuid);
        } catch(e) {
            logExtensionError(uuid, e);
        }
    }