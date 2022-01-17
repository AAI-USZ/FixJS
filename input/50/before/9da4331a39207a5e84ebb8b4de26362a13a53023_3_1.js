function setup(options, imports, register) {
    assert(options.settingsPath, "option 'settingsPath' is required");
    SETTINGS_PATH = options.settingsPath;

    imports.ide.register(name, SettingsPlugin, register);
}