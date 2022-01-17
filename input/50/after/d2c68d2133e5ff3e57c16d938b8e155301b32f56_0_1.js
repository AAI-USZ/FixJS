function (uuid, callback) {
    fs.exists(_dbFile(uuid), callback);
}