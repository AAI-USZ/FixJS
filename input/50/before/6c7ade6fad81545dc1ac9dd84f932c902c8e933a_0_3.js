function() {
        var segment = Settings.BIPLUGIN ? 
            "/pentahorepository" : "/repository2/?type=saiku";
        return encodeURI(Saiku.session.username + segment);
    }