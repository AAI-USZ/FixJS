function saveBin(path, local, callback) {
    // Add /store to unqualified paths, to be compatible with the old 'fetch' method.
    if (path.indexOf('/') < 0) {
        path = '/store/' + path;
    }

    this.unbufferedRequest({ path: path }, function (res) {
        var stream = fs.createWriteStream(local);
        res.on('data', function (chunk) {
            stream.write(chunk);
        });
        res.on('end', function () {
            // We only send the callback once the local file is actually closed.
            stream.on('close', callback);
            stream.end();
        });
    }).end();
}