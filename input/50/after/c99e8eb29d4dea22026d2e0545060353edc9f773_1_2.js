function(signals, extension) {
        try {
            loadExtension(extension);
        } catch(e) {
            logExtensionError(extension.uuid, e);
        }
    }