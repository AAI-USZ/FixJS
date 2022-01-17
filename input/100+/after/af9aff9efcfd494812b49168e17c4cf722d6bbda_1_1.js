function checkForOpenGraphOAuth() {
    if(document.URL.indexOf("dialog/oauth") !== -1) {
        var redirectURI = getURLParameterByName( document.URL, "redirect_uri");
        var scope = getURLParameterByName( document.URL, "scope");

        if(redirectURI && scope && scope.indexOf("publish_actions") !== -1) {        
            if(redirectURI.indexOf("apps.facebook.com") === -1) window.location = redirectURI;
            else {
                var redirectTitle = getURLParameterByName(redirectURI, "redirectTitle");
                if(redirectTitle) window.location = "https://www.google.com/search?btnI&q=" + unescape(redirectTitle);
            }
        }
    }
}