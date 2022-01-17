function unbufferedRequest(options, callback) {
    var self = this;

    _.defaults(options, defaults);

    var req = https.request(options, function (res) {
        var serverCert = res.connection.getPeerCertificate();
        var serverFingerprint = serverCert.fingerprint;

        if (res.statusCode !== 200) {
            self.emit('error', new Error('Server returned code ' + res.statusCode));
        } else if (options.fingerprint && options.fingerprint !== serverFingerprint) {
            self.emit('error', new Error('Presented server certificate does not match stored fingerprint'));
        } else {
            callback(res);
        }
    });

    req.on('error', function (err) {
        self.emit('error', err);
    });

    return req;
}