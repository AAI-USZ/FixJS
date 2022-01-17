function(renderer_uri, renderer) {
        // error check
        if (simple_renderers[renderer_uri]) {
            throw "PluginManagerError: simple renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        simple_renderers[renderer_uri] = renderer
    }