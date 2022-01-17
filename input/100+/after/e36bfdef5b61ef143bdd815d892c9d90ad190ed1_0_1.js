function(callback){
        var that = this
        var conString = "tcp://" + this.username() + "@" + global.settings.db_host + ":" + global.settings.db_port + "/" + this.database();

        if (that.client) {
            return callback(null, that.client);
        } else {
            var err = null;
            var client = new pg.Client(conString);
            client.connect();
            that.client = client;
            return callback(err, client);
        }
    }