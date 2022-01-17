function() {
    /**
     * The base uri
     *
     * @var string
     */
    this.baseUri = "/";

    /**
     * The tree object
     *
     * @var jsDAV_Tree
     */
    this.tree = null;

    /**
     * The list of plugins
     *
     * @var array
     */
    this.plugins = {};

    /**
     * Called when an http request comes in, pass it on to the Handler
     *
     * @param {ServerRequest}  req
     * @param {ServerResponse} resp
     * @return void
     */
    this.exec = function(req, resp) {
        new jsDAV_Handler(this, req, resp);
    };

    /**
     * Sets the base server uri
     *
     * @param  {String} uri
     * @return {void}
     */
    this.setBaseUri = function(uri) {
        // If the baseUri does not end with a slash, we must add it
        if (uri.charAt(uri.length - 1) !== "/")
            uri += "/";

        this.baseUri = uri;
    };

    /**
     * Returns the base responding uri
     *
     * @return {String}
     */
    this.getBaseUri = function() {
        return this.baseUri;
    };

    /**
     * This method attempts to detect the base uri.
     * Only the PATH_INFO variable is considered.
     *
     * If this variable is not set, the root (/) is assumed.
     *
     * @return {String}
     * @throws {Error}
     */
    this.guessBaseUri = function(handler) {
        var pos, pathInfo, uri;

        if (handler && handler.httpRequest) {
            uri      = handler.httpRequest.url;
            pathInfo = Url.parse(uri).pathname;
        }

        // If PATH_INFO is not found, we just return /
        if (pathInfo) {
            // We need to make sure we ignore the QUERY_STRING part
            if ((pos = uri.indexOf("?")) > -1)
                uri = uri.substr(0, pos);

            // PATH_INFO is only set for urls, such as: /example.php/path
            // in that case PATH_INFO contains "/path".
            // Note that REQUEST_URI is percent encoded, while PATH_INFO is
            // not, Therefore they are only comparable if we first decode
            // REQUEST_INFO as well.
            var decodedUri = unescape(uri);

            // A simple sanity check:
            if (decodedUri.substr(decodedUri.length - pathInfo.length) === pathInfo) {
                var baseUri = decodedUri.substr(0, decodedUri.length - pathInfo.length);
                return Util.rtrim(baseUri, "/") + "/";
            }

            throw new Exc.jsDAV_Exception("The REQUEST_URI (" + uri
                + ") did not end with the contents of PATH_INFO (" + pathInfo
                + "). This server might be misconfigured.");
        }

        // The fallback is that we're just going to assume the server root.
        return "/";
    };

    /**
     * Auto-load bundled plugins.
     */
    var self = this;
    Fs.readdirSync(__dirname + "/plugins").forEach(function(filename){
        if (/\.js$/.test(filename)) {
            var name = filename.substr(0, filename.lastIndexOf('.'));
            self.plugins[name] = require("./plugins/" + name);
        }
    });
}