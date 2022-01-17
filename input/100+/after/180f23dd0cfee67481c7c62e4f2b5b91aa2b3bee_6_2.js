function(cb) {
    var self = this,
    url = 'http://localhost:' + self._managerPort + '/worker/settings/' + self._serverId +
	'?token=' + self._managerToken;

    request(url, function(err, res, body) {
        if(!err && res.statusCode == 200) {
            try {
                var data = JSON.parse(body);

                if(data.success && cb) cb(null, data.settings);
                else if(cb) cb(new Error(data.error));
            } catch(e) {
                if(cb) cb(e);
            }
        } else {
            psm.log.error(err, 'Error trying to get settings.');
            if(cb) cb(err ? err : new Error('Got non 200 status code (' + res.statusCode + ')'));
        }
    });
}