function(callback) {
        this.find().toArray(function(err, projects) {
            if (err) console.log(err);
            return callback(projects ? projects : null);
        });
    }