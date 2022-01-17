function (previous, baton) {
        var xmlHttp = new XMLHttpRequest(),
            config = platform.current().config,
            fileName = config ? config.fileName : null,
            results;

        if (!fileName) {
            return;
        }

        try {
            xmlHttp.open("GET", utils.appLocation() + fileName, false);
            xmlHttp.send();
            if (xmlHttp.responseXML) {
                results = _validate(xmlHttp.responseXML);
                _process(results);
                _configValidationResults = results;
            }
            else {
                _process();
                _configValidationResults = null;
                require('ripple/ui/plugins/widgetConfig').initialize();
            }
        }
        catch (e) {
            exception.handle(e);
        }
    }