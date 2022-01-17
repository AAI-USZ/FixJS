function register_internal_plugins(plugins) {
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            register_plugin("/de.deepamehta.webclient/script/internal_plugins/" + plugin)
        }
    }