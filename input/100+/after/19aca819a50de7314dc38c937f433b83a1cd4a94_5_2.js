function PluginManager(config) {

    var plugins = {}            // key: plugin URI, value: plugin instance
    var page_renderers = {}     // key: page renderer URI, value: object with "render_page", "render_form", "page_css"
    var simple_renderers = {}   // key: simple renderer URI, value: object with "render_info", "render_form"
    var multi_renderers = {}    // key: multi renderer URI, value: object with "render_info", "render_form"

    var css_stylesheets = []

    var items_to_load
    var items_complete = 0

    // key: hook name (string), value: registered listeners (array of functions)
    var listener_registry = {}

    // ------------------------------------------------------------------------------------------------------ Public API

    this.load_plugins = function() {
        // retrieve list of installed plugins from server
        var plugins = dm4c.restc.get_plugins()
        //
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Plugins installed at server-side: " + plugins.length)
        //
        items_to_load = count_items_to_load(plugins) + config.internal_plugins.length
        //
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Total items to load: " + items_to_load)
        //
        load_internal_plugins(config.internal_plugins)
        //
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            load_plugin(plugin)
        }
    }

    this.add_plugin = function(plugin_uri, plugin_func) {
        // error check
        if (plugins[plugin_uri]) {
            throw "PluginManagerError: plugin URI clash with \"" + plugin_uri + "\""
        }
        //
        var plugin = {}
        plugin_func.call(plugin)
        plugins[plugin_uri] = plugin
        //
        track_load_state("plugin \"" + plugin_uri + "\"");
    }

    this.get_plugin = function(plugin_uri) {
        var plugin = plugins[plugin_uri]
        // error check
        if (!plugin) {
            throw "PluginManagerError: plugin \"" + plugin_uri + "\" is unknown"
        }
        //
        return plugin
    }

    // ---

    this.add_page_renderer = function(renderer_uri, renderer) {
        // error check
        if (page_renderers[renderer_uri]) {
            throw "PluginManagerError: page renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        page_renderers[renderer_uri] = renderer
        //
        track_load_state("page renderer \"" + renderer_uri + "\"");
    }

    this.get_page_renderer = function(topic_or_association_or_renderer_uri) {
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

    // ---

    this.add_simple_renderer = function(renderer_uri, renderer) {
        // error check
        if (simple_renderers[renderer_uri]) {
            throw "PluginManagerError: simple renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        simple_renderers[renderer_uri] = renderer
        //
        track_load_state("simple renderer \"" + renderer_uri + "\"");
    }

    this.get_simple_renderer = function(renderer_uri) {
        var renderer = simple_renderers[renderer_uri]
        // error check
        if (!renderer) {
            throw "PluginManagerError: simple renderer \"" + renderer_uri + "\" is unknown"
        }
        //
        return renderer
    }

    // ---

    this.add_multi_renderer = function(renderer_uri, renderer) {
        // error check
        if (multi_renderers[renderer_uri]) {
            throw "PluginManagerError: multi renderer URI clash with \"" + renderer_uri + "\""
        }
        //
        multi_renderers[renderer_uri] = renderer
        //
        track_load_state("multi renderer \"" + renderer_uri + "\"");
    }

    this.get_multi_renderer = function(renderer_uri) {
        var renderer = multi_renderers[renderer_uri]
        // error check
        if (!renderer) {
            throw "PluginManagerError: multi renderer \"" + renderer_uri + "\" is unknown"
        }
        //
        return renderer
    }

    // ---

    this.register_css_stylesheet = function(css_path) {
        css_stylesheets.push(css_path)
    }

    // === Listener Registry ===

    this.add_listener = function(hook_name, listener) {
        // introduce hook on-demand
        if (!hook_exists(hook_name)) {
            listener_registry[hook_name] = []
        }
        //
        add_listener(hook_name, listener)
    }

    // ---

    /**
     * Triggers the registered listeners for the named hook.
     *
     * @param   hook_name   Name of the hook.
     * @param   <varargs>   Variable number of arguments. Passed to the listeners.
     */
    this.trigger_listeners = function(hook_name) {
        var result = []
        //
        var listeners = listener_registry[hook_name]
        if (listeners) {
            // build arguments
            var args = Array.prototype.slice.call(arguments)    // create real array from arguments object
            args.shift()                                        // drop hook_name argument
            //
            for (var i = 0, listener; listener = listeners[i]; i++) {
                // trigger listener
                var res = listener.apply(undefined, args)       // FIXME: pass plugin reference for "this"?
                // store result
                if (res !== undefined) {    // Note: undefined is not added to the result, but null is
                    result.push(res)
                }
            }
        }
        //
        return result
    }

    // ----------------------------------------------------------------------------------------------- Private Functions

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

    function track_load_state(item) {
        items_complete++
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + item + " complete (" +
            items_complete + "/" + items_to_load + ")")
        if (items_complete == items_to_load) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("PLUGINS COMPLETE!")
            load_stylesheets()
            config.post_load_plugins()
        }
    }

    // ---

    function add_listener(hook_name, listener) {
        listener_registry[hook_name].push(listener)
    }

    function hook_exists(hook_name) {
        return listener_registry[hook_name]
    }

    // ---

    function load_internal_plugins(plugins) {
        for (var i = 0, plugin; plugin = plugins[i]; i++) {
            load_plugin_file("/de.deepamehta.webclient/script/internal_plugins/" + plugin)
        }
    }

    function load_plugin(plugin) {
        // 1) load plugin file
        if (plugin.has_client_component) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri +
                "\" -- has client component")
            var plugin_file = "/" + plugin.plugin_uri + "/script/plugin.js"
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + plugin_file)
            load_plugin_file(plugin_file)
        } else {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... plugin \"" + plugin.plugin_uri + "\"")
        }
        //
        // 2) load renderers
        load_renderers(plugin.plugin_uri, "page_renderers",   plugin.renderers.page_renderers)
        load_renderers(plugin.plugin_uri, "simple_renderers", plugin.renderers.simple_renderers)
        load_renderers(plugin.plugin_uri, "multi_renderers",  plugin.renderers.multi_renderers)
        // ### load_renderers(plugin.plugin_uri, "canvas_renderers", plugin.renderers.canvas_renderers)
    }

    function load_renderers(plugin_uri, renderer_type, renderer_files) {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + renderer_files.length + " " + renderer_type + ":")
        for (var i = 0, renderer_file; renderer_file = renderer_files[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + renderer_file)
            // load renderer synchronously (Note: synchronous is required for displaying initial topic) ### FIXME
            dm4c.load_script("/" + plugin_uri + "/script/renderers/" + renderer_type + "/" + renderer_file)
        }
    }

    function load_plugin_file(plugin_file) {
        dm4c.load_script(plugin_file, function() {})      // load plugin asynchronously
    }

    // ---

    function load_stylesheets() {
        if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("Loading " + css_stylesheets.length + " CSS stylesheets:")
        for (var i = 0, css_stylesheet; css_stylesheet = css_stylesheets[i]; i++) {
            if (dm4c.LOG_PLUGIN_LOADING) dm4c.log("..... " + css_stylesheet)
            $("head").append($("<link>").attr({rel: "stylesheet", href: css_stylesheet, type: "text/css"}))
        }
    }
}