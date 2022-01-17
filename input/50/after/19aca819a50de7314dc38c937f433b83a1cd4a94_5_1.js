function(renderer_uri, renderer) {
        // error check
        if (page_renderers[renderer_uri]) {
            throw "PluginManagerError: page renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        page_renderers[renderer_uri] = renderer
        //
        track_load_state("page renderer \"" + renderer_uri + "\"");
    }