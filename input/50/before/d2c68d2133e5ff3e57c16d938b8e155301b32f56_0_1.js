function (uuid, callback) {
    path.exists(_dbFile(uuid), callback);
}