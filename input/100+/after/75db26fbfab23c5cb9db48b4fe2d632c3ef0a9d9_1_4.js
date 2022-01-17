function (win, fail, args) {
        var file = args[0],
            position = args[1],
            sourcepath;

        // Format source path
        sourcepath = (file.fullPath ? file.fullPath : '') + file.name;
        sourcepath = cleanPath(sourcepath);

        // Get the FileEntry, create if necessary
        fs.root.getFile(sourcepath, {create: false}, function (entry) {
            // Create a FileWriter for this entry
            entry.createWriter(function (writer) {
                writer.onwriteend = function (progressEvt) {
                    if (win) win(progressEvt.target.length);
                };
                writer.onerror = function (err) {
                    if (fail) fail(err.code);
                };

                writer.truncate(position);
            }, function (err) {
                if (fail) fail(err.code);
            });
        }, function (err) {
            if (fail) fail(err.code);
        });
    }