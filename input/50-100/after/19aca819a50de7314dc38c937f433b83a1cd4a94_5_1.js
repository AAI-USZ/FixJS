function(topic_or_association_or_renderer_uri) {
        if (typeof(topic_or_association_or_renderer_uri) == "string") {
            var renderer_uri = topic_or_association_or_renderer_uri
        } else {
            var type = topic_or_association_or_renderer_uri.get_type()
            var renderer_uri = type.get_page_renderer_uri()
        }
        var renderer = page_renderers[renderer_uri]
        // error check
        if (!renderer) {
            throw "PluginManagerError: page renderer \"" + renderer_uri + "\" is unknown"
        }
        //
        return renderer
    }