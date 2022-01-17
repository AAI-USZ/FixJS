function registerPlugins(plugins) {
    for (var i = plugins.length; i--;) {
        try {
            var plugin = require(path.join(ComponentRegistry.PLUGIN_FOLDER, plugins[i]));

            plugins[i] = plugin;
        } catch (ex) {
            throw new RainError('Registry Plugin %s is invalid.', [plugins[i]], RainError.ERR_IO);
        }
    }
}