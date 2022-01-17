function(url) {
    // HACK: for some unknown reason Safari keeps throwing
    //      TypeError: no default value
    // when this function is called from the RDFa importer. So I put a try catch here.
    var url2, i;
    try {
        if (url.indexOf("://") < 0) {
            url2 = Exhibit.Persistence.getBaseURL(document.location.href);
            if (url.substr(0,1) === "/") {
                url = url2.substr(0, url2.indexOf("/", url2.indexOf("://") + 3)) + url;
            } else {
                url = url2 + url;
            }
        }
        i = url.indexOf("#");
        if (i >= 0) {
            url = url.substr(0, i);
        }
        i = url.lastIndexOf("/");
        if (i < 0) {
            return "";
        } else {
            return url.substr(0, i+1);
        }
    } catch (e) {
        return url;
    }
}