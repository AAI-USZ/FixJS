function onEnabledExtensionsChanged() {
    let newEnabledExtensions = global.settings.get_strv(ENABLED_EXTENSIONS_KEY);

    // Find and enable all the newly enabled extensions: UUIDs found in the
    // new setting, but not in the old one.
    newEnabledExtensions.filter(function(uuid) {
        return enabledExtensions.indexOf(uuid) == -1;
    }).forEach(function(uuid) {
        enableExtension(uuid);
    });

    // Find and disable all the newly disabled extensions: UUIDs found in the
    // old setting, but not in the new one.
    enabledExtensions.filter(function(item) {
        return newEnabledExtensions.indexOf(item) == -1;
    }).forEach(function(uuid) {
        disableExtension(uuid);
    });

    enabledExtensions = newEnabledExtensions;
}