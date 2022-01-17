function enableExtension(uuid) {
    let extension = ExtensionUtils.extensions[uuid];
    if (!extension)
        return;

    if (extension.state == ExtensionState.INITIALIZED)
        initExtension(uuid);

    if (extension.state != ExtensionState.DISABLED)
        return;

    extensionOrder.push(uuid);

    try {
        extension.stateObj.enable();
    } catch(e) {
        logExtensionError(uuid, e.toString());
        return;
    }

    let stylesheetFile = extension.dir.get_child('stylesheet.css');
    if (stylesheetFile.query_exists(null)) {
        let theme = St.ThemeContext.get_for_stage(global.stage).get_theme();
        try {
            theme.load_stylesheet(stylesheetFile.get_path());
            extension.stylesheet = stylesheetFile;
        } catch (e) {
            logExtensionError(uuid, 'Stylesheet parse error: ' + e);
        }
    }

    extension.state = ExtensionState.ENABLED;
    _signals.emit('extension-state-changed', extension);
}