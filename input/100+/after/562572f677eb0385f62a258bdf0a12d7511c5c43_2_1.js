function (responseParser, resolveUrl, directModel, model, callback) {
        var url = resolveUrl(directModel);
        if (isFileProtocol(url)) {
            fsAll("write", responseParser, resolveUrl, directModel, callback,
                  typeof model === "string" ? model : JSON.stringify(model));
        }
        else {
            var modelData = typeof model === "string" ? model : JSON.stringify(model);
            var req = dbAll(resolveUrl, directModel, "PUT", function (data) {
                processData(data, responseParser, directModel, callback);
            }, modelData);
        }
    }