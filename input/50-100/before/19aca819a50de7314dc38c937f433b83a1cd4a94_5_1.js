function(renderer_uri) {
        var renderer = simple_renderers[renderer_uri]
        // error check
        if (!renderer) {
            throw "PluginManagerError: simple renderer \"" + renderer_uri + "\" is unknown"
        }
        //
        return renderer
    }