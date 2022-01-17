function(plugin_uri, plugin_func) {
        // instantiate
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log(".......... instantiating \"" + plugin_uri + "\"")
        var plugin = {}
        plugin_func.call(plugin)
        plugins[plugin_uri] = plugin
        // all plugins complete?
        plugins_complete++
        if (plugins_complete == plugin_sources.length) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("PLUGINS COMPLETE!")
            all_plugins_loaded()
        }

        function all_plugins_loaded() {
            load_page_renderers()
            load_field_renderers()
            load_stylesheets()
            //
            config.post_load_plugins()
        }
    }