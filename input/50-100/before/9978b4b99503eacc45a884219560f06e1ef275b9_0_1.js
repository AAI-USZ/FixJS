function() {
    var url, question;
    if (Exhibit.Persistence._urlWithoutQuery == null) {
        url = document.location.href;
        
        question = url.indexOf("?");
        if (question >= 0) {
            url = url.substr(0, question);
        }
        
        Exhibit.Persistence._urlWithoutQuery = url;
    }
    return Exhibit.Persistence._urlWithoutQuery;
}