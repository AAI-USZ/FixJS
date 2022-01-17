function register_plugins() {
        var plugins = dm4c.restc.get_plugins()
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Plugins installed at server-side: " + plugins.length)
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            if (plugin.plugin_file) {
                if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_id +
                    "\" contains client-side parts -- to be loaded")
                register_plugin("/" + plugin.plugin_id + "/script/" + plugin.plugin_file)
            } else {
                if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_id +
                    "\" contains no client-side parts -- nothing to load")
            }
        }
    }