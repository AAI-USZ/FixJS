function (path, local, callback) {
    this.unbufferedRequest({ path: path }, function (res) {
        var stream = fs.createWriteStream(local);
        res.on('data', function (chunk) {
            stream.write(chunk);
        });
        res.on('end', function () {
            stream.end();
            process.nextTick(callback);
        });
    }).end();
}