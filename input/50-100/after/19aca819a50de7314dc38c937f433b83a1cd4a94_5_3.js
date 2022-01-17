function count_items_to_load(plugins) {
        var count = 0
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            // count plugin file
            if (plugin.has_client_component) {
                count++
            }
            // count renderers
            for (var renderer_type in plugin.renderers) {
                count += plugin.renderers[renderer_type].length
            }
        }
        return count
    }