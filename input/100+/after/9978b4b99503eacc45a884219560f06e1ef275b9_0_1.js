function() {
    var url, hash, question;
    if (Exhibit.Persistence._urlWithoutQueryAndHash === null) {
        url = document.location.href;
        
        hash = url.indexOf("#");
        question = url.indexOf("?");
        if (question >= 0) {
            url = url.substr(0, question);
        } else if (hash >= 0) {
            url = url.substr(0, hash);
        }
        
        Exhibit.Persistence._urlWithoutQueryAndHash = url;
    }
    return Exhibit.Persistence._urlWithoutQueryAndHash;
}