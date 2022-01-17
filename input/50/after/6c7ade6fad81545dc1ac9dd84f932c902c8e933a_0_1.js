function( ) {
        var segment = Settings.BIPLUGIN ? 
            "/pentahorepository2/resource" : "/repository2/resource";
        return encodeURI(Saiku.session.username + segment);
    }