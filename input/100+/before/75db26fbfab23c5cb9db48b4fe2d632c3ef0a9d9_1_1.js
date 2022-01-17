function (win, fail, args) {
        var file = args[0],
            text = args[1],
            position = args[2],
            root = fs.root.toURL(),
            sourcepath,
            bb = new BlobBuilder();

        // Format source path
        sourcepath = (file.fullPath ? file.fullPath : '') + file.name;
        sourcepath = cleanPath(sourcepath);

        // Create a blob for the text to be written
        bb.append(text);

        // Get the FileEntry, create if necessary
        fs.root.getFile(sourcepath, {create: true}, function (entry) {
            // Create a FileWriter for this entry
            entry.createWriter(function (writer) {
                writer.onwriteend = function (progressEvt) {
                    if (win) win(progressEvt.total);
                };
                writer.onerror = function (err) {
                    if (fail) fail(err.code);
                };

                if (position && position > 0) {
                    writer.seek(position);
                }
                writer.write(bb.getBlob('text/plain'));
            }, function (err) {
                if (fail) fail(err.code);
            });
        }, function (err) {
            if (fail) fail(err.code);
        });
    }