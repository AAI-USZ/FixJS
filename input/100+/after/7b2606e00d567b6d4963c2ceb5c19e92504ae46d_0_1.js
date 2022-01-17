function(term, env) {
    var uri = null;
    env = env || {};
    //console.log("*** normalizing URI token:");
    //console.log(term);
    if(term.value == null) {
        //console.log(" - URI has prefix and suffix");
        //console.log(" - prefix:"+term.prefix);
        //console.log(" - suffixx:"+term.suffix);
        var prefix = term.prefix;
        var suffix = term.suffix;
        var resolvedPrefix = env.namespaces[prefix];
        if(resolvedPrefix != null) {            
            uri = resolvedPrefix+suffix;
        } else {
            uri = prefix+":"+suffix;
        }
    } else {
        //console.log(" - URI is not prefixed");
        uri = term.value;
    }

    if(uri===null) {
        return null;
    } else {
        //console.log(" - resolved URI is "+uri);
        if(uri.indexOf(":") == -1) {
            //console.log(" - URI is partial");
            uri = (env.base||"") + uri; // applyBaseUri
        } else {
            //console.log(" - URI is complete");
        }
        //console.log(" -> FINAL URI: "+uri);
    }

    return uri;
}