function(chunk) {
        if (fileBuffer === null) {
            fileBuffer = new Buffer(fileSize);
        }

        try {
            fileBuffer.write(chunk, fileWritten, 'binary');
            fileWritten += Buffer.byteLength(chunk, 'binary');
            idleDate = new Date();
        } catch (e) {
            console.error(e.message);
            console.error(e.stack);
            console.error("fileWritten: " + fileWritten);
            console.error("fileSize: " + fileSize);
            console.error("bufferlength: " + fileBuffer.length);
            errorFinish(500);
        }
    }