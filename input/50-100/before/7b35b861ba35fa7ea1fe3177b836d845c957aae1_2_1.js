function xhr(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState !== 4) {
            return;
        }
        if (!req.status || req.status < 200 || req.status > 299) {
            return;
        }
        req.responseText && callback(JSON.parse(req.responseText));
    };
    req.open("GET", url);
    req.send(null);
}