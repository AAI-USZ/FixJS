function() {
  'use strict';

  var client = gazel.createClient(),
      SET_KEY = 'set:foo',
      ADDS_COUNT = 2;

  client.on('error', function(err) {
    throw err;
  });

  it('Adding a member should always return OK.', function(done) {
    var val = 'foo:' + Date.now().toString();

    client.sadd(SET_KEY, val, function(res) {
      done(assert.equal(res, 'OK', 'Values do not match.'));
    });
  });

  it('Retrieving all members should return an array.', function(done) {
    client.smembers(SET_KEY, function(members) {
      done(assert.equal(Array.isArray(members), true, 'Members is not an array.'));
    });
  });

  it('Scard should retrieve a count of the members in a set.', function(done) {
    client.scard(SET_KEY, function(cnt) {
      done(assert.equal(cnt, ADDS_COUNT, 'Count is not correct.'));
    });
  });

}