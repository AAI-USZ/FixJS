function( ) {
        var segment = Settings.BIPLUGIN ? 
            "/pentahorepository" : "/repository2/resource";
        return encodeURI(Saiku.session.username + segment);
    }