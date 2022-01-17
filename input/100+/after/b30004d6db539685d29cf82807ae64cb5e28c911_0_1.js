function register_plugins() {
        // retrieve list
        var plugins = dm4c.restc.get_plugins()
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Plugins installed at server-side: " + plugins.length)
        // register
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            if (plugin.has_client_component) {
                if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri +
                    "\" -- has client component")
                register_plugin("/" + plugin.plugin_uri + "/script/plugin.js")
            } else {
                if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri + "\"")
            }
        }
    }