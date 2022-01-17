function(cmd, server, remote, cb) {
            if(typeof(remote) == 'function') {
                cb = remote;
                remote = null;
            }

            var url = 'http://localhost:' + psm.config.api.port +
                '/' + cmd +
                (server ?
                 '/' + server :
                 '' + (remote ? '/' + remote : '')
                ) +
		'?token=' + psm.config.token;

            //TODO: if add command then its a post...
            request(url, function(err, res, body) {
                if(!err && res.statusCode == 200) {
                    var json;
                    try {
                        json = JSON.parse(body);

                        if(!json.success) {
                            console.log(json.error);
                            cb(new Error(json.error), json);
                        } else {
                            cb(null, json);
                        }
                    } catch(e) {
                        cb(e, body);
                    }
                } else {
                    //if no error, then send a non-200 error, also send the
                    //response for debugging if necessary
                    cb((err ?
                        err
                        :
                        new Error('Non 200 response code received.')
                       ), res);
                }
            });
        }