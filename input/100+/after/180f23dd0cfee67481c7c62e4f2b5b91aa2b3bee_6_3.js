function(cb) {
    var self = this,
    url ='http://localhost:' + self._managerPort + '/worker/ready/' + self._serverId +
	'?token=' + self._managerToken;

    request(url, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            if(cb) cb(null);
        } else {
            psm.log.error(err, 'Error trying to notify manager.');
            if(cb) cb(err ? err : new Error('Got non 200 status code (' + res.statusCode + ')'));
        }
    });
}