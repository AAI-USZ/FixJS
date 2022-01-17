function(done){
      app.request()
      .get('/signed')
      .set('Cookie', 'foo=s:' + val)
      .expect('{"foo":"foobarbaz"}', done);
    }