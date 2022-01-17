function(assert){
    var client = knox.createClient({
        key: 'foobar'
      , secret: 'baz'
      , bucket: 'misc'
      , endpoint: 's3-eu-west-1.amazonaws.com'
    });

    assert.equal('s3-eu-west-1.amazonaws.com', client.endpoint);
  }