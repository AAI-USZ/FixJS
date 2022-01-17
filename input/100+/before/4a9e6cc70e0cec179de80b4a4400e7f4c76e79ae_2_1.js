function(url) {
    var url2;
    if (url.indexOf("://") < 0) {
        url2 = Exhibit.Persistence.getBaseURL(document.location.href);
        if (url.substr(0,1) === "/") {
            url = url2.substr(0, url2.indexOf("/", url2.indexOf("://") + 3)) + url;
        } else {
            url = url2 + url;
        }
    }
    return url;
}