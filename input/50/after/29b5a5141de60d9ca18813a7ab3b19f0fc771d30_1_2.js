function(id){ return id && typeof id === 'string' ? new $data.mongoDBDriver.ObjectID.createFromHexString(new Buffer(id, 'base64').toString('ascii')) : id; }