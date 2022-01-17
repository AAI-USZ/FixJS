function(model, response) {
        var file = (Settings.BIPLUGIN ? response.xml :  response);
        var filename = (Settings.BIPLUGIN ? model.get('name') : model.get('file')) ;
        for (var key in Settings) {
            if (key.match("^PARAM")=="PARAM") {
                var variable = key.substring("PARAM".length, key.length)
                file = file.replace("${" + variable + "}", Settings[key]);
            }
        }
        var query = new Query({ 
            xml: file,
            formatter: Settings.CELLSET_FORMATTER
        },{
            name: filename
        });
        
        var tab = Saiku.tabs.add(new Workspace({ query: query }));
    }