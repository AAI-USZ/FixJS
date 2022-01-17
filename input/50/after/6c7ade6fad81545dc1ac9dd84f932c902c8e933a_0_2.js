function() {
        var u = Settings.BIPLUGIN ? 
                encodeURI(Saiku.session.username + "/pentahorepository2/resource")  
                    : encodeURI(Saiku.session.username + "/repository2/resource");
        return u;
    }