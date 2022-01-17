function(path) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', path, false);
    xmlHttp.send(null);
    if (xmlHttp.status === 200 || xmlHttp.status === 0) {
        var dotIndex = path.lastIndexOf('.');
        if (dotIndex === -1) {
            dotIndex = path.length;
        }
        return new Danmakufu(xmlHttp.responseText, path.substr(0, dotIndex));
    }
    return null;
}