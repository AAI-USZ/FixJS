function (win, fail, args) {
        var path = args[0],
            encoding = args[1],
            FileReader = topCordova.nativeMethods.FileReader,
            fr = new FileReader();

        // Set up FileReader events
        fr.onerror = function (err) {
            if (fail) fail(err.code);
        };
        fr.onload = function (evt) {
            if (win) win(evt.target.result);
        };

        path = cleanPath(path);

        fs.root.getFile(path, {create: false}, function (entry) {
            entry.file(function (blob) {
                fr.readAsText(blob, encoding);
            }, function (err) {
                if (fail) fail(err.code);
            });
        }, function (err) {
            if (fail) fail(err.code);
        });
    }