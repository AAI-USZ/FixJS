function setup(options, imports, register) {
    assert(options.settingsPath, "option 'settingsPath' is required");
    SETTINGS_PATH = options.settingsPath;
    fs = imports["sandbox.fs"];

    imports.ide.register(name, SettingsPlugin, register);
}