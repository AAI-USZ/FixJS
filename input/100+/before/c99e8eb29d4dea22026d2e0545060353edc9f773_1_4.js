function initExtension(uuid) {
    let extension = ExtensionUtils.extensions[uuid];
    let dir = extension.dir;

    if (!extension)
        throw new Error("Extension was not properly created. Call loadExtension first");

    let extensionJs = dir.get_child('extension.js');
    if (!extensionJs.query_exists(null)) {
        logExtensionError(uuid, 'Missing extension.js');
        return;
    }

    let extensionModule;
    let extensionState = null;
    try {
        ExtensionUtils.installImporter(extension);
        extensionModule = extension.imports.extension;
    } catch (e) {
        logExtensionError(uuid, '' + e);
        return;
    }

    if (extensionModule.init) {
        try {
            extensionState = extensionModule.init(extension);
        } catch (e) {
            logExtensionError(uuid, 'Failed to evaluate init function:' + e);
            return;
        }
    }

    if (!extensionState)
        extensionState = extensionModule;
    extension.stateObj = extensionState;

    if (!extensionState.enable) {
        logExtensionError(uuid, 'missing \'enable\' function');
        return;
    }
    if (!extensionState.disable) {
        logExtensionError(uuid, 'missing \'disable\' function');
        return;
    }

    extension.state = ExtensionState.DISABLED;

    _signals.emit('extension-loaded', uuid);
}