function loadExtension(extension) {
    // Default to error, we set success as the last step
    extension.state = ExtensionState.ERROR;

    if (ExtensionUtils.isOutOfDate(extension)) {
        let error = new Error('extension is not compatible with current GNOME Shell and/or GJS version');
        error.state = ExtensionState.OUT_OF_DATE;
        throw error;
    }

    let enabled = enabledExtensions.indexOf(extension.uuid) != -1;
    if (enabled) {
        initExtension(extension.uuid);
        if (extension.state == ExtensionState.DISABLED)
            enableExtension(extension.uuid);
    } else {
        extension.state = ExtensionState.INITIALIZED;
    }

    _signals.emit('extension-state-changed', extension);
}