function (name, data, callback) {
    var req = this.bufferedRequest({ path: '/store/' + name, method: 'PUT' }, callback);
    req.write(data);
    req.end();
}