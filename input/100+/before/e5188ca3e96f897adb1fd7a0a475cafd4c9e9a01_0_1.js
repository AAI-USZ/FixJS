function prepareBuild()
{
    shell.mkdir(buildDir);
    shell.mkdir(releaseDir);

    // Copy non JS resources
    copy({
        source: {
            root: '.',
            // TODO: Previously we copied everything that matched this set of
            // extensions: js, xul, properties, css, html, xml, dtd, ong, gif, ico,
            //      manifest, txt, html
            // and then deleted. Now we copy everything with exclusions, but
            // we don't know what extra exclusions were missing
            exclude: [
                /.*\.graphml/, /build\.xml/, /node_modules/, /build\.js/,
                /install\.rdf\.tpl\.xml/, /update\.rdf\.tpl\.xml/
            ]
        },
        dest: buildDir
    });

    var project = copy.createCommonJsProject({
        roots: [
            __dirname + "/content"
        ],
        aliases: {
            "arch": "firebug/bti/inProcess"
        }
    });

    copy({
        source: [
            //copy.getMiniRequire(),
            {
                project: project,
                require: [
                    "firebug/chrome/chrome",
                    "firebug/lib/lib",
                    "firebug/firebug",
                    "firebug/bti/inProcess/browser",
                    "firebug/trace/traceModule",
                    "firebug/chrome/navigationHistory",
                    "firebug/chrome/knownIssues",
                    "firebug/js/sourceFile",
                    "firebug/chrome/shortcuts",
                    "firebug/firefox/start-button/startButtonOverlay",
                    "firebug/firefox/external-editors/externalEditors",
                    "firebug/firefox/firebugMenu",
                    "firebug/chrome/panelActivation",
                    "firebug/console/memoryProfiler",
                    "firebug/chrome/tableRep",
                    "firebug/html/htmlPanel",
                    "firebug/console/commandLinePopup",
                    "firebug/accessible/a11y",
                    "firebug/js/scriptPanel",
                    "firebug/js/callstack",
                    "firebug/console/consoleInjector",
                    "firebug/net/spy",
                    "firebug/js/tabCache",
                    "firebug/chrome/activation",
                    "firebug/css/stylePanel",
                    "firebug/css/computedPanel"
                ],
            },
            __dirname + "/content/firebug/main.js"
        ],
        filter: moduleDefines,
        dest: buildDir + "/content/firebug/main.js"
    });

    // Compress main.js file (all extension modules)
    // xxxHonza: do not use uglify for build, there is missing ';' somewhere
    /*copy({
        source: buildDir + "/content/firebug/main.js",
        filter: copy.filter.uglifyjs,
        dest: buildDir + "/content/firebug/main.js"
    });*/

    /*copy({
        source: {value:project.getDependencyGraphML()},
        dest: "netpanel.graphml"
    });*/

    // Copy install.rdf template into the build dir
    copy({
        source: "install.rdf.tpl.xml",
        dest: buildDir + "/install.rdf"
    })
}