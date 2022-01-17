function (callback) {
    var self = this;

    this.bufferedRequest({ path: '/store' }, function (result) {
        if (result.buffer.length === 0) {
            self.emit('error', new Error('Empty response from server - are you registered?'));
        } else {
            callback(JSON.parse(result.buffer));
        }
    }).end();
}