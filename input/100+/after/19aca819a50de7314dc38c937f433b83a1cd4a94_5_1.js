function load_plugin(plugin) {
        // 1) load plugin file
        if (plugin.has_client_component) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri +
                "\" -- has client component")
            var plugin_file = "/" + plugin.plugin_uri + "/script/plugin.js"
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + plugin_file)
            load_plugin_file(plugin_file)
        } else {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri + "\"")
        }
        //
        // 2) load renderers
        load_renderers(plugin.plugin_uri, "page_renderers",   plugin.renderers.page_renderers)
        load_renderers(plugin.plugin_uri, "simple_renderers", plugin.renderers.simple_renderers)
        load_renderers(plugin.plugin_uri, "multi_renderers",  plugin.renderers.multi_renderers)
        // ### load_renderers(plugin.plugin_uri, "canvas_renderers", plugin.renderers.canvas_renderers)
    }