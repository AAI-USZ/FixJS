function getContent (url, callback) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                return callback(parseContent(xmlhttp.responseXML));
            } else if (xmlhttp.readyState == 4 && xmlhttp.status == 404) {
                return callback('Not Found');
            } else if (xmlhttp.readyState >= 4) {
                return callback('Error!<br />URL: ' + url + '<br />Status: ' + xmlhttp.status);
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);
    }