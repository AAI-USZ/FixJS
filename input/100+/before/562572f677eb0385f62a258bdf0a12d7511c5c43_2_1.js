function (method, responseParser, resolveUrl, directModel, callback, model) {
        var fileName = resolveUrl(directModel),
            args = [fileName];
        if (model) {
            args.push(model);
        }
        args.push("utf8");
        args.push(function (error, data) {
            if (error) {
                callback({
                    isError: true,
                    message: error.message
                });
                return;
            }
            processData(data || model, responseParser, directModel, callback);
        });
        fs[method + "File"].apply(null, args);
    }