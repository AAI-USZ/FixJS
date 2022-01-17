function(user, password, cb) {
            db.selectOne('users', null, ['id'], 
                'username=? AND password_hash=?', [user, hash(password)], cb);
        }