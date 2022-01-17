function(chunk) {
        if (fileBuffer === null) {
            fileBuffer = new Buffer(fileSize);
        }

        try {
            fileBuffer.write(chunk, fileWritten, 'binary');
            fileWritten += Buffer.byteLength(chunk, 'binary');
            idleDate = new Date();
        } catch (e) {
            var msg = "fileWritten: " + fileWritten + "\n" +
                        "fileSize: " + fileSize + "\n" +
                        "bufferlength: " + fileBuffer.length;
            options.logger.error(msg, e);
            errorFinish(500);
        }
    }