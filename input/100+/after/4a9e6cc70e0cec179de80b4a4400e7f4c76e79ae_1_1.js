function(url, database, callback) {
    var fError, self;

    self = this;

    fError = function(jqxhr, textStatus, e) {
        var msg;
        if (Exhibit.Importer.checkFileURL(url) && jqxhr.status === 404) {
            msg = Exhibit._("%import.missingOrFilesystem", url);
        } else {
            msg = Exhibit._("%import.httpError", url, jqxhr.status);
        }
        $(document).trigger("error.exhibit", [e, msg]);
    };

    fragmentStart = url.indexOf('#');
    if ((fragmentStart >= 0) && (fragmentStart < url.length - 1)) {
        callbackOrig = callback;
        fragmentId = url.substring(fragmentStart);
        url = url.substring(0, fragmentStart);

        callback = function(data, status, jqXHR) {
            var msg, fragment = $(data).find(fragmentId).andSelf().filter(fragmentId);
            if (fragment.length < 1) {
                msg = Exhibit._("%import.missingFragment", url);
                $(document).trigger("error.exhibit", [new Error(), msg]);
            } else {
                callbackOrig(fragment.text(), status, jqXHR);
            }
        };
    }

    $.ajax({
        "url": url,
        "dataType": "text",
        "error": fError,
        "success": callback
    });
}