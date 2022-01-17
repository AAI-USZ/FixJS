function(){
    var str = auth.stringToSign({
        verb: 'PUT'
      , md5: '09c68b914d66457508f6ad727d860d5b'
      , contentType: 'text/plain'
      , resource: '/learnboost'
      , date: new Date('Mon, May 25 1987 00:00:00 GMT')
    });
    
    var expected = [
        'PUT'
      , '09c68b914d66457508f6ad727d860d5b'
      , 'text/plain'
      , new Date('Mon, May 25 1987 00:00:00 GMT').toUTCString()
      , '/learnboost'
    ].join('\n');
    
    assert.equal(expected, str);
  }