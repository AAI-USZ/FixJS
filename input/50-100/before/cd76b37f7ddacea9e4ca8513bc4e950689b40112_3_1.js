function(err, user) {
            t.ok(!err, 'No error when getting a key');
            t.equal(user.username, 'chilts', 'Username is set on the returned key');
            t.equal(user.password, 'sekrit', 'Password is set on the returned key');
            t.equal(user.inserted, timestamp.toISOString(), 'Inserted is set on the returned key');
            t.end();
        }