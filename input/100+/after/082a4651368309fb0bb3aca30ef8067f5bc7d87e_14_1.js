function(plugin_uri, plugin_func) {
        // 1) instantiate
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log(".......... instantiating \"" + plugin_uri + "\"")
        // error check
        if (plugins[plugin_uri]) {
            throw "PluginManagerError: plugin URI clash with \"" + plugin_uri + "\""
        }
        //
        plugins[plugin_uri] = create_plugin()
        // 2) all plugins complete?
        plugins_complete++
        if (plugins_complete == plugin_sources.length) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("PLUGINS COMPLETE!")
            all_plugins_loaded()
        }

        function create_plugin() {
            var plugin = {}
            plugin_func.call(plugin)
            return plugin
        }

        function all_plugins_loaded() {
            load_page_renderers()
            load_field_renderers()
            load_stylesheets()
            //
            config.post_load_plugins()
        }
    }