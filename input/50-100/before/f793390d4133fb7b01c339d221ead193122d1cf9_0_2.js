function(req, callback) {
        // strip subdomain from header host
        var username = req.headers.host.split('.')[0];
        var redisKey = _.template(this.user_key, {username: username});

        this.retrieve(this.user_metadata_db, redisKey, 'id', callback);
    }