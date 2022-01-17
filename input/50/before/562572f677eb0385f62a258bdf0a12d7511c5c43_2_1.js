function (responseParser, resolveUrl, directModel, callback) {
        dbAll(resolveUrl, directModel, "GET", function (data) {
            processData(data, responseParser, directModel, callback);
        });
    }