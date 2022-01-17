function load_plugins() {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + plugin_sources.length + " plugins:")
        for (var i = 0, plugin_source; plugin_source = plugin_sources[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + plugin_source)
            dm4c.load_script(plugin_source, function() {})      // load plugin asynchronously
        }
    }