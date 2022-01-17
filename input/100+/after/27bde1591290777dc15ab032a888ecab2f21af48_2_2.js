function generateTabletXMLFile(session, config) {
    var files = wrench.readdirSyncRecursive(session.sourceDir),
        xmlObject = {
            id : config.id,
            name : config.name,
            versionNumber : config.version,
            author : config.author,
            asset : [{
                _attr : { entry : 'true', type : 'qnx/elf' },
                _value : 'wwe'
            }],
            initialWindow : {
                systemChrome : 'none',
                transparent : 'true'
            },
            env : {
                _attr : { value : '12', var : 'WEBKIT_NUMBER_OF_BACKINGSTORE_TILES'}
            },
            permission : {
                _attr : { system : 'true'},
                _value : 'run_native'
            }
        };

    if (config["invoke-target"]) {
        xmlObject["invoke-target"] = [];

        config["invoke-target"].forEach(function (invokeTarget) {

            var xmlInvokeTarget = {
                "_attr" : { id : invokeTarget["@"]["id"] },
                "entry-point" : config.name,
                "type" : invokeTarget["type"]
            };

            if (invokeTarget["require-source-permissions"]) {
                xmlInvokeTarget["require-source-permissions"] = {
                    _value : invokeTarget["require-source-permissions"]
                };
            }

            if (invokeTarget.filter) {
                xmlInvokeTarget.filter = [];
                invokeTarget.filter.forEach(function (filter) {
                    var xmlFilter = {
                        "action" : filter.action,
                        "mime-type": filter["mime-type"]
                    };

                    if (filter.property) {
                        xmlFilter.property = [];
                        filter.property.forEach(function (property) {
                            xmlFilter.property.push({
                                "_attr": { var : property["@"]["var"], value : property["@"].value }
                            });
                        });
                    }

                    xmlInvokeTarget.filter.push(xmlFilter);
                });
            }

            xmlObject["invoke-target"].push(xmlInvokeTarget);

        });
    }

    //buildId
    if (config.buildId) {
        xmlObject.buildId = config.buildId;
    }

    if (files) {
        files.forEach(function (file) {
            file = path.resolve(session.sourceDir, file);

            if (file.indexOf("blackberry-tablet.xml") < 0 && !fs.statSync(file).isDirectory()) {
                file = file.replace(/\\/g, "/");
                file = file.split("src/")[1];

                if (path.extname(file) === ".so") {
                    xmlObject.asset.push({
                        _attr : { type : 'qnx/elf' },
                        _value : file
                    });
                } else {
                    xmlObject.asset.push({
                        _value : file
                    });
                }
            }
        });
    }

    //Add description element if specifed
    if (config.description) {
        xmlObject.description = config.description;
    }

    //Add icon element if specified
    if (config.icon) {
        xmlObject.icon = {
            image: config.icon
        };
    }

    //Add permissions
    if (config.permissions) {
        xmlObject.action = config.permissions;
    }

    pkgrUtils.writeFile(session.sourceDir, "blackberry-tablet.xml", data2xml('qnx', xmlObject));
}