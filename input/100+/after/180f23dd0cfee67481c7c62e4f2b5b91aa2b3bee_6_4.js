function(err, cb) {
    var self = this,
    opts = {
        url: 'http://localhost:' + self._managerPort + '/worker/error/' + self._serverId +
	    '?token=' + self._managerToken,
        method: 'POST',
        body: err.message
    };
    request(opts, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            if(cb) cb(null);
        } else {
            psm.log.error(err, 'Error trying to notify manager.');
            if(cb) cb(err ? err : new Error('Got non 200 status code (' + res.statusCode + ')'));
        }
    });
}