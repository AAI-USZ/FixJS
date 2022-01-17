function() {
        var segment = Settings.BIPLUGIN ? 
            "/pentahorepository2/?type=saiku" : "/repository2/?type=saiku";
        return encodeURI(Saiku.session.username + segment);
    }