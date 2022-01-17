function(){
    var db = mongoose.createConnection('mongodb://localhost/fake');
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal(undefined, db.pass);
    assert.equal(undefined, db.user);
    assert.equal('fake', db.name);
    assert.equal('localhost', db.host);
    assert.equal(27017, db.port);
    db.close();

    db = mongoose.createConnection('mongodb://localhost:27000/fake');
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(27000, db.port);
    db.close();

    db = mongoose.createConnection('mongodb://aaron:psw@localhost:27000/fake');
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('psw', db.pass);
    assert.equal('aaron', db.user);
    assert.equal('fake', db.name);
    assert.equal('localhost', db.host);
    assert.equal(27000, db.port);
    db.close();

    db = mongoose.createConnection('mongodb://aaron:psw@localhost:27000/fake', { db: { forceServerObjectId: true }});
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    db.close();

    db = mongoose.createConnection('mongodb://aaron:psw@localhost:27000/fake', { server: { auto_reconnect: false }});
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(false, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    db.close();

    db = mongoose.createConnection('127.0.0.1', 'faker', 28000, { server: { auto_reconnect: true }});
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('faker', db.name);
    assert.equal('127.0.0.1', db.host);
    assert.equal(28000, db.port);
    db.close();

    db = mongoose.createConnection('127.0.0.1', 'faker', 28001);
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('faker', db.name);
    assert.equal('127.0.0.1', db.host);
    assert.equal(28001, db.port);
    db.close();

    db = mongoose.createConnection('127.0.0.1', 'faker', { blah: 1 });
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('faker', db.name);
    assert.equal('127.0.0.1', db.host);
    assert.equal(27017, db.port);
    assert.equal(1, db.options.blah);
    db.close();

    db = mongoose.createConnection('127.0.0.1', 'faker');
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('faker', db.name);
    assert.equal('127.0.0.1', db.host);
    assert.equal(27017, db.port);
    db.close();

    // Test connecting using user/pass in hostname
    db = mongoose.createConnection('aaron:psw@localhost', 'fake', 27000);
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('fake', db.name);
    assert.equal('localhost', db.host);
    assert.equal(27000, db.port);
    assert.equal('psw', db.pass);
    assert.equal('aaron', db.user);
    db.close();

    // Test connecting using user/pass options
    db = mongoose.createConnection('localhost', 'fake', 27000, {user: 'aaron', pass: 'psw'});
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('fake', db.name);
    assert.equal('localhost', db.host);
    assert.equal(27000, db.port);
    assert.equal('psw', db.pass);
    assert.equal('aaron', db.user);
    db.close();

    // Test connecting using only user option - which shouldn't work
    db = mongoose.createConnection('localhost', 'fake', 27000, {user: 'no_pass'});
    assert.equal('object', typeof db.options);
    assert.equal('object', typeof db.options.server);
    assert.equal(true, db.options.server.auto_reconnect);
    assert.equal('object', typeof db.options.db);
    assert.equal(false, db.options.db.forceServerObjectId);
    assert.equal('fake', db.name);
    assert.equal('localhost', db.host);
    assert.equal(27000, db.port);
    assert.equal(undefined, db.pass);
    assert.equal(undefined, db.user);
    db.close();
  }