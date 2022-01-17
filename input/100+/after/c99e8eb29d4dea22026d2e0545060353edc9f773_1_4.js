function initExtension(uuid) {
    let extension = ExtensionUtils.extensions[uuid];
    let dir = extension.dir;

    if (!extension)
        throw new Error("Extension was not properly created. Call loadExtension first");

    let extensionJs = dir.get_child('extension.js');
    if (!extensionJs.query_exists(null))
        throw new Error('Missing extension.js');

    let extensionModule;
    let extensionState = null;

    ExtensionUtils.installImporter(extension);
    extensionModule = extension.imports.extension;

    if (extensionModule.init) {
        extensionState = extensionModule.init(extension);
    }

    if (!extensionState)
        extensionState = extensionModule;
    extension.stateObj = extensionState;

    extension.state = ExtensionState.DISABLED;
    _signals.emit('extension-loaded', uuid);
}