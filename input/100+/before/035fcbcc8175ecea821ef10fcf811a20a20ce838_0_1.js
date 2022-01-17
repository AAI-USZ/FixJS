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
        openlayers,
        app = connect(
            connect.static(__dirname + "/../lib/"),
            connect.static(__dirname + "/../"),
            connect.router(function (app) {
                app.get('/', function (req, res) {
                    res.writeHead(200, {
                        "Cache-Control": "no-cache",
                        "Content-Type": "text/html"
                    });
                    res.end(doc);
                });
            })
        );

    //HACK: Openlayers causes weird stuff with the browser runner, so lets pop it off the list until we fix it
    openlayers = conf.thirdpartyIncludes.pop();
    if (openlayers !== "OpenLayers.js") {
        //HACK: just a safe check to make sure our hack is still valid
        console.log("HACK: we wanted to pop OpenLayers off but it looks like it wasn't the last one anymore");
    }

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