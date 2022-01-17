function load_renderers(plugin_uri, renderer_type, renderer_files) {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + renderer_files.length + " " + renderer_type + ":")
        for (var i = 0, renderer_file; renderer_file = renderer_files[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + renderer_file)
            // load renderer synchronously (Note: synchronous is required for displaying initial topic) ### FIXME
            dm4c.load_script("/" + plugin_uri + "/script/renderers/" + renderer_type + "/" + renderer_file)
        }
    }