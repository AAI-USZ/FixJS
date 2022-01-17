function confirmAllDestroyed(err, keys){
                    var config = Common.config.sync.redis;
                    var key = config.key_prefix + ':' + config.uuid.key;

                    // the only difference should be the uuid key
                    assert.equal(key, _.difference( keys, initialKeys )[0] );
                    // same count minus the uuid key
                    assert.equal( initialCount, keys.length-1 );
                    done();
                }