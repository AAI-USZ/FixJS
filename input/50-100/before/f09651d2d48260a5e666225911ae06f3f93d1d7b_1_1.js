function(callback) {
        this.find().sort({ date_created: 1 }).toArray(function(err, projects) {
            if (err) console.log(err);
            return callback(projects ? projects : null);
        });
    }