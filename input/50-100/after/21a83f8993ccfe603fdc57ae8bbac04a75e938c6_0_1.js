function(uri){
        // generate a label based on a uri. crude.
        var dt = this;
        var character = "#";
        if (uri.indexOf("#") == -1){
            character = "/";
            if (uri.indexOf("/") == -1){
                character = ":";
            }
        }
        return uri.substr( uri.lastIndexOf(character)+1 );
    }