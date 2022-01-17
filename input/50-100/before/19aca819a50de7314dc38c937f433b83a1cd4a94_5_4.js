function load_simple_renderers() {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + simple_renderer_sources.length + " simple renderers:")
        for (var i = 0, simple_renderer_source; simple_renderer_source = simple_renderer_sources[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + simple_renderer_source)
            // load simple renderer synchronously (Note: synchronous is required for displaying initial topic)
            dm4c.load_script(simple_renderer_source)
        }
    }