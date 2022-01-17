function() {
        var u = Settings.BIPLUGIN ? 
                encodeURI(Saiku.session.username + "/pentahorepository/" + this.get('name'))  
                    : encodeURI(Saiku.session.username + "/repository2/resource");
        return u;
    }