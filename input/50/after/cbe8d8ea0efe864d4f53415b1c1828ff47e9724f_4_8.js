function(user, password, cb) {
            db.insert('users', {
                username: user,
                password_hash: hash(password)
            }, proxy(cb));
        }