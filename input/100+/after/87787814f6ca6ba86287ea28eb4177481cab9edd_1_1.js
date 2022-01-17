function (src, baton) {
    baton.take();

    var copy = 'cp -r ' + _c.EXT + "chromium " + _c.DEPLOY + " && " +
               'cp -r ' + _c.ASSETS + "images " + _c.DEPLOY + "chromium/ &&" +
               'cp -r ' + _c.ASSETS + "themes " + _c.DEPLOY + "chromium/" +
               'cp -r ' + _c.ROOT + "plugins " + _c.DEPLOY + "chromium/";

    childProcess.exec(copy, function () {
        var css = _c.ASSETS + "ripple.css",
            cssDeploy = _c.DEPLOY + "chromium/ripple.css",
            manifest = _c.DEPLOY + "chromium/manifest.json",
            updatesSrc = _c.DEPLOY + "chromium/updates.xml",
            updatesDeploy = _c.DEPLOY + "updates.xml",
            js = _c.DEPLOY + "chromium/ripple.js",
            bootstrap = _c.DEPLOY + "chromium/bootstrap.js",
            doc = src.html.replace(/#OVERLAY_VIEWS#/g, src.overlays)
                          .replace(/#PANEL_VIEWS#/g, src.panels)
                          .replace(/#DIALOG_VIEWS#/g, src.dialogs)
                          .replace(_c.SPACES_AND_TABS, " ")
                          .replace(/'/g, _c.ESCAPED_QUOTES);

        fs.writeFileSync(cssDeploy, fs.readFileSync(css, "utf-8") + src.skins);

        fs.writeFileSync(manifest, fs.readFileSync(manifest, "utf-8")
                         .replace(new RegExp('"version": ""', 'g'), '"version": "' + src.info.version + '"'));

        fs.writeFileSync(updatesDeploy, fs.readFileSync(updatesSrc, "utf-8")
                         .replace(new RegExp('version=""', 'g'), 'version="' + src.info.version + '"'));
        fs.unlinkSync(updatesSrc);

        fs.writeFileSync(bootstrap,
                         "window.th_panel = {" + "LAYOUT_HTML: '" + doc + "'};" +
                         fs.readFileSync(bootstrap, "utf-8"));

        fs.writeFileSync(js,
            src.js +
            "require('ripple/bootstrap').bootstrap();"
        );

        baton.pass(src);
    });
}