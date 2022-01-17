function Server(options) {
    /**
     * This is a flag that allow or not showing file, line and code
     * of the exception in the returned XML
     *
     * @var bool
     */
    this.debugExceptions = exports.debugMode;
    
    options = options || {};
    this.options = options;
    
    if (typeof options.standalone == "undefined")
        options.standalone = true;
        
    this.plugins = Util.extend({}, exports.DEFAULT_PLUGINS);
    if (options.plugins) {
        if (!Array.isArray(options.plugins))
            options.plugins = Object.keys(options.plugins);
        var allPlugins = Object.keys(this.plugins);
        for (var i = 0, l = allPlugins.length; i < l; ++i) {
            // if the plugin is not in the list options.plugins, remove it from
            // the available plugins altogether so that the handler won't know
            // they exist.
            if (options.plugins.indexOf(allPlugins[i]) == -1)
                delete this.plugins[allPlugins[i]];
        }
    }

    // setup the filesystem tree for this server instance. 
    if (typeof options.tree == "object" && options.tree.hasFeature(jsDAV.__TREE__)) {
        this.tree = options.tree;
    }
    else if (typeof options.node == "object" && options.node.hasFeature(jsDAV.__INODE__)) {
        this.tree = new jsDAV_ObjectTree(options.node, options);
    }
    else if (typeof options.type == "string") {
        if (options.type == "sftp") {
            var jsDAV_Tree_Sftp = require("./tree/sftp").jsDAV_Tree_Sftp;
            this.tree = new jsDAV_Tree_Sftp(options);
        }
        else if (options.type == "ftp") {
            var jsDAV_Tree_Ftp = require("./tree/ftp").jsDAV_Tree_Ftp;
            this.tree = new jsDAV_Tree_Ftp(options);
        }
    }
    else if (typeof options.node == "string" && options.node.indexOf("/") > -1) {
        this.tree = new jsDAV_Tree_Filesystem(options.node, options);
    }
    else {
        if (exports.debugMode) {
            Util.log("Invalid argument passed to constructor. "
                + "Argument must either be an instance of jsDAV_Tree, jsDAV_iNode, "
                + "a valid path to a location on the local filesystem or null", "error");
        }
        var root  = new jsDAV_SimpleDirectory("root");
        this.tree = new jsDAV_ObjectTree(root, options);
    }

    this.tmpDir = (options.tmpDir || exports.DEFAULT_TMPDIR).replace(/\/+$/, "");

    if (options.server && options.mount) { //use an existing server object
        var self = this;
        this.setBaseUri("/" + options.mount.replace(/^\/+/, ""));

        if (options.standalone) {
            var listeners = options.server.listeners("request");
            options.server.removeAllListeners("request");

            options.server.addListener("request", function(req, resp) {
                var path = Url.parse(req.url).pathname;
                if (path.charAt(path.length - 1) != "/")
                    path = path + "/";
                if (path.indexOf(self.baseUri) === 0) {
                    self.exec(req, resp);
                }
                else {
                    for (var i = 0, len = listeners.length; i < len; ++i)
                        listeners[i].call(options.server, req, resp);
                }
            });
        }
    }
    else {
        this.setBaseUri(this.guessBaseUri());

        Http.Server.call(this, this.exec);
    }
}