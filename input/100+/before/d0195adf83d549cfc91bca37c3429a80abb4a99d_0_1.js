function (url, callback) {
    var xhr = exports.createXhr();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function (evt) {
        //Do not explicitly handle errors, those should be
        //visible via console output in the browser.
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}