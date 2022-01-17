function (req) {
            var resp;
            var ctype = req.getResponseHeader('Content-Type').split(';')[0];
            if (ctype === 'application/json' || ctype === 'text/json') {
                try {
                    resp = $.parseJSON(req.responseText)
                }
                catch (e) {
                    return callback(e);
                }
            }
            else {
                var ct = req.getResponseHeader("content-type") || "";
                var xml = ct.indexOf("xml") >= 0;
                resp = xml ? req.responseXML : req.responseText;
            }
            if (req.status === 200 || req.status === 201 || req.status === 202) {
                callback(null, resp);
            }
            else if (resp && (resp.error || resp.reason)) {
                var err = new Error(resp.reason || resp.error);
                err.error = resp.error;
                err.reason = resp.reason;
                err.code = resp.code;
                err.status = req.status;
                callback(err);
            }
            else {
                // TODO: map status code to meaningful error message
                var err2 = new Error(
                    req.statusText || 'Returned status code: ' + req.status
                );
                err2.status = req.status;
                console.log(['status err', req, resp]);
                callback(err2);
            }
        }