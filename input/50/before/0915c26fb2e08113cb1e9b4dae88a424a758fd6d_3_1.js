function(done){
      app.request()
      .get('/signed')
      .set('Cookie', 'foo=' + val)
      .expect('{"foo":"foobarbaz"}', done);
    }