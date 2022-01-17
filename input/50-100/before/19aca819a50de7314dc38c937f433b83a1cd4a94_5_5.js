function load_multi_renderers() {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + multi_renderer_sources.length + " multi renderers:")
        for (var i = 0, multi_renderer_source; multi_renderer_source = multi_renderer_sources[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + multi_renderer_source)
            // load multi renderer synchronously (Note: synchronous is required for displaying initial topic)
            dm4c.load_script(multi_renderer_source)
        }
    }