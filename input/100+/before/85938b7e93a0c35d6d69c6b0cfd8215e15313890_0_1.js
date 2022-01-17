function (err, doc) {
        if(err) {
            if(cb) cb(err);
            return;
        }

        if(doc === null) {
            //insert default
            var cfg = new Config({
                token: psm.generateGuid()
            });
            cfg.save(function(err, def) {
                if(err) {
                    if(cb) cb(err);
                    return;
                }

                psm.config = def._doc;

		if(typeof(psm.config.api.port) != 'number')
		    psm.config.api.port = parseInt(psm.config.api.port, 10);

                console.log('AUTH TOKEN:', psm.config.token);
                psm._init(cb);
            });
        } else {
            psm.config = doc._doc;

	    if(typeof(psm.config.api.port) != 'number')
		psm.config.api.port = parseInt(psm.config.api.port, 10);

            console.log('AUTH TOKEN:', psm.config.token);
            psm._init(cb);
        }
    }