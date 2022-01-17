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

    $.ajax({
        "url": url,
        "dataType": "text",
        "error": fError,
        "success": callback
    });
}