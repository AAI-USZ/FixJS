function(uri){
        var dt = this;
        var prefix = "uri_"; // TODO allow customisable, move to object?
        if (uri in dt.uri_to_css_class){
            return prefix+dt.uri_to_css_class[uri];
        }

        var this_css_class = dt.next_css_class;
        dt.next_css_class++;

        dt.uri_to_css_class[uri] = this_css_class;
        return prefix+this_css_class;
    }