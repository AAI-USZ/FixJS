function(renderer_uri, renderer) {
        // error check
        if (multi_renderers[renderer_uri]) {
            throw "PluginManagerError: multi renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        multi_renderers[renderer_uri] = renderer
        //
        track_load_state("multi renderer \"" + renderer_uri + "\"");
    }