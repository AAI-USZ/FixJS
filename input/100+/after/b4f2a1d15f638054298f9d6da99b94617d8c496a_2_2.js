function bufferedRequest(options, callback) {
    var buffer = '';
    var req = this.unbufferedRequest(options, function (res) {
        var serverCert = res.connection.getPeerCertificate();
        var serverFingerprint = serverCert.fingerprint;

        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            buffer += chunk;
        });
        res.on('end', function () {
            callback({ buffer: buffer, fingerprint: serverFingerprint });
        });
    });

    return req;
}