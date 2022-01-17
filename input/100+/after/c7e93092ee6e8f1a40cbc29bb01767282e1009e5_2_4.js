function (xmlPath, session, extManager, callback) {
        var fileData = fs.readFileSync(xmlPath),
            xml = utils.bufferToString(fileData),
            parser = new xml2js.Parser({trim: true, normalize: true, explicitRoot: false});

        //parse xml file data
        parser.parseString(xml, function (err, result) {
            if (err) {
                logger.error(localize.translate("EXCEPTION_PARSING_XML"));
                fileManager.cleanSource(session);
            } else {
                callback(processResult(result, session, extManager));
            }
        });
    }