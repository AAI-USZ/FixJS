function(){
    var str = auth.sign({
        verb: 'PUT'
      , secret: 'test'
      , md5: '09c68b914d66457508f6ad727d860d5b'
      , contentType: 'text/plain'
      , resource: '/learnboost'
      , date: new Date('Mon, May 25 1987 00:00:00 GMT')
    });

    assert.equal('7xIdjyy+W17/k0le5kwBnfrZTiM=', str);
  }