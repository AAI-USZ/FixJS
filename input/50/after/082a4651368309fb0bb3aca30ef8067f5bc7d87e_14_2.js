function(plugin_uri) {
        var plugin = plugins[plugin_uri]
        // error check
        if (!plugin) {
            throw "PluginManagerError: plugin \"" + plugin_uri + "\" not found"
        }
        //
        return plugin
    }