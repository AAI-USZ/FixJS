function () {
    var connect = require('connect'),
        fs = require('fs'),
        utils = require('./build/utils'),
        tests = [],
        html = fs.readFileSync(__dirname + "/btest/test.html", "utf-8"),
        pack = require('./build/pack'),
        conf = require('./build/conf'),
        doc,
        modules,
        specs,
        app = connect()
            .use(connect.static(__dirname + "/../lib/"))
            .use(connect.static(__dirname + "/../"))
            .use('/', function (req, res) {
                res.writeHead(200, {
                    "Cache-Control": "max-age=0",
                    "Content-Type": "text/html"
                });
                res.end(doc);
            });

    //HACK: Openlayers causes weird stuff with the browser runner, so lets remove it from the list until we fix it
    conf.thirdpartyIncludes = conf.thirdpartyIncludes.filter(function (filename) {
        return !filename.match(/openlayers\.js/i);
    });

    modules = pack();

    utils.collect(__dirname + "/../test", tests);

    specs = tests.reduce(function (str, file) {
        str += '<script src="' +
            file.replace(/^.*test/, "test") +
            '" type="text/javascript" charset="utf-8"></script>\n';
        return str;
    }, "");

    doc = html.replace(/<!-- SPECS -->/g, specs).replace(/##FILES##/g, modules.js);

    app.listen(3000);

    process.stdout.write("Test Server running on:");
    process.stdout.write("http://127.0.0.1:3000");
}