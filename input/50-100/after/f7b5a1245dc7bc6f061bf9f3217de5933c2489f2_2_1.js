function (req, res) {
    if (req.url === "/") {
        res.end('<script type="text/javascript" src="/ui.js"></script>');
    }
    else if (/^\/ui(\.js$|\/)/.test(req.url)) {
        req.params = [ req.url.match(/^\/ui(?:\.js)?(\/.*)?$/)[1] ];
        require("sourcemint-platform-browser/lib/bundler").hoist(__dirname + "/ui", {
            bundleLoader: true
        })(req, res);
    }
}