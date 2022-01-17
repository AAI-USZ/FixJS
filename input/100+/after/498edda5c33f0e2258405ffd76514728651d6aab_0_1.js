function getUrlVars() {
        // Function to read URL Get variables.
        // from http://papermashup.com/read-url-get-variables-withjavascript/
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }