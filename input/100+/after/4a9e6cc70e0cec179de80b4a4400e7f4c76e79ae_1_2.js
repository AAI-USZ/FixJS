function(url, database, callback, link) {
    var charset, convertType, jsonpCallback, converter, fDone, fError, ajaxArgs;

    if (typeof link !== "string") {
        convertType = Exhibit.getAttribute(link, "converter");
        jsonpCallback = Exhibit.getAttribute(link, "jsonp-callback");
        charset = Exhibit.getAttribute(link, "charset");
    }

    converter = Exhibit.Importer._registry.get(
        Exhibit.Importer.JSONP._registryKey,
        convertType
    );

    if (converter !== null && typeof converter.preprocessURL !== "undefined") {
        url = converter.preprocessURL(url);
    }
    
    fDone = function(s, textStatus, jqxhr) {
        callback(converter.transformJSON(s), textStatus, jqxhr);
    };

    fError = function(jqxhr, textStatus, e) {
        var msg;
        msg = Exhibit._(
            "%import.failedAccess",
            url,
            (typeof jqxhr.status !== "undefined") ? Exhibit._("%import.failedAccessHttpStatus", jqxhr.status) : "");
        $(document).trigger("error.exhibit", [e, msg]);
    };

    ajaxArgs = {
        "url": url,
        "dataType": "jsonp",
        "success": fDone,
        "error": fError
    };

    if (jsonpCallback !== null) {
        ajaxArgs.jsonp = false;
        ajaxArgs.jsonpCallback = jsonpCallback;
    }

    if (charset !== null) {
        ajaxArgs.scriptCharset = charset;
    }

    $.ajax(ajaxArgs);
}