function enableExtension(uuid) {
    let extension = ExtensionUtils.extensions[uuid];
    if (!extension)
        return;

    if (extension.state == ExtensionState.INITIALIZED)
        initExtension(uuid);

    if (extension.state != ExtensionState.DISABLED)
        return;

    extensionOrder.push(uuid);

    extension.stateObj.enable();

    let stylesheetFile = extension.dir.get_child('stylesheet.css');
    if (stylesheetFile.query_exists(null)) {
        let theme = St.ThemeContext.get_for_stage(global.stage).get_theme();
        theme.load_stylesheet(stylesheetFile.get_path());
        extension.stylesheet = stylesheetFile;
    }

    extension.state = ExtensionState.ENABLED;
    _signals.emit('extension-state-changed', extension);
}