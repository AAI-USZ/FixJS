function(name, cb) {
            db.insert('groups', { name: name }, cb);
        }